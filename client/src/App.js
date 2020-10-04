import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListScreen from './components/ListScreen';
import MaintenanceScreen from './components/MaintenanceScreen';
const api = axios.create({ baseURL: 'api' });
const PERIODS = [
  '2019-01',
  '2019-02',
  '2019-03',
  '2019-04',
  '2019-05',
  '2019-06',
  '2019-07',
  '2019-08',
  '2019-09',
  '2019-10',
  '2019-11',
  '2019-12',
  '2020-01',
  '2020-02',
  '2020-03',
  '2020-04',
  '2020-05',
  '2020-06',
  '2020-07',
  '2020-08',
  '2020-09',
  '2020-10',
  '2020-11',
  '2020-12',
  '2021-01',
  '2021-02',
  '2021-03',
  '2021-04',
  '2021-05',
  '2021-06',
  '2021-07',
  '2021-08',
  '2021-09',
  '2021-10',
  '2021-11',
  '2021-12',
]

const LIST_SCREEN = 0;
const MAINTENANCE_SCREEN = 1;
const RESOURCE = "/transaction";
export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[0]);
  const [currentScreen, setCurrentScreem] = useState(LIST_SCREEN);
  const [filteredText, setFilteredText] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get(`/transaction?period=${currentPeriod}`);
      setTransactions(data.transactions);
    };
    fetchTransactions();
  }, [currentPeriod]);

  useEffect(() => {
    let newFilteredTransactions = [...transactions];
    if (filteredText.trim() !== '') {
      newFilteredTransactions = newFilteredTransactions.filter(transaction => {
        return transaction.description.toLowerCase().includes(filteredText);
      });
    }
    setFilteredTransactions(newFilteredTransactions);
  }, [transactions, filteredText]);
  useEffect(() => {
    const newScreen = selectedTransaction !== null ? MAINTENANCE_SCREEN : LIST_SCREEN;
    setCurrentScreem(newScreen);
  }, [selectedTransaction]);

  const handlePeriodChenge = (event) => {
    setCurrentPeriod(event.target.value);
  }
  const handleDeletedTransaction = async (event) => {
    const id = event.target.id;
    await api.delete(`${RESOURCE}/${id}`);

    const newTransactions = transactions.filter(transaction => {
      return transaction._id !== id;
    });
    setTransactions(newTransactions);
  }
  const handleEditTransaction = (event) => {
    const id = event.target.id;
    const newSelectedTransaction = filteredTransactions.find(transaction => {
      return transaction._id === id;
    });
    setSelectedTransaction(newSelectedTransaction);
  }
  const handleFilterChange = (event) => {
    const text = event.target.value.trim();
    setFilteredText(text.toLowerCase());
  }
  return (
    <div className="container">
      <h1 className="center">Desafio Final do Bootcamp Full Stack</h1>
      {
        currentScreen === LIST_SCREEN ?
          <ListScreen transactions={filteredTransactions} periods={PERIODS} currentPeriod={currentPeriod} filteredText={filteredText}
            onDeleteTransaction={handleDeletedTransaction} onEditTransaction={handleEditTransaction} onFilterChange={handleFilterChange}
            onPeriodChange={handlePeriodChenge} />
          : <MaintenanceScreen transaction={selectedTransaction}/>
      }
    </div>
  );
}

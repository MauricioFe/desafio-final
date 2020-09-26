import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
const EXPENSE_COLOR = '#fc5c65';
const EARNING_COLOR = '#0fb9b1';
const RESOURCE = "/transaction";
export default function App() {
  const [transactions, setTransections] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[0]);
  const [currentScreen, setCurrentScreem] = useState(LIST_SCREEN);
  const [filteredText, setFilteredText] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get(`/transaction?period=${currentPeriod}`);
      setTransections(data.transactions);
    };
    fetchTransactions();
  }, [currentPeriod, filteredTransactions, transactions]);

  useEffect(() => {
    let newFilteredTransactions = [...transactions];
    if(filteredText.trim() !== ''){
      newFilteredTransactions = newFilteredTransactions.filter(transaction => {
        return transaction.description.toLowerCase().includes(filteredText);
      });
    }
    setFilteredTransactions(newFilteredTransactions);
  }, [transactions, filteredText]);

  const handlePeriodChenge = (event) => {
    setCurrentPeriod(event.target.value);
  }
  const handleDeletedTransaction = async (event) => {
    const id = event.target.id;
    await api.delete(`${RESOURCE}/${id}`);
  }
  const handleUpdatedTransaction = (event) => {

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
          <>
            <select className="browser-default" value={currentPeriod} onChange={handlePeriodChenge}>{
              PERIODS.map(period => {
                return <option key={period}>{period}</option>
              })
            }</select>
            <label htmlFor="filterTransaction" className="active">Filtro</label>
            <input placeholder="filtro..." id="filterTransaction" onChange={handleFilterChange} type="text" />

            {filteredTransactions.map(transaction => {
              const currentColor = transaction.type == '+' ? EARNING_COLOR : EXPENSE_COLOR;
              return (
                <div key={transaction._id} className="card" style={{
                  marginBttom: '8px', padding: "8px", backgroundColor: currentColor, display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <p style={{ marginRight: '10px' }}>
                    {transaction.yearMonthDay} {' - '}
                    <strong>{transaction.category}</strong> {' '}
                    {transaction.description} - {transaction.value}
                  </p>
                  <div>
                    <button style={{ marginRight: '5px' }} className="waves-effect btn" id={transaction._id} onClick={handleUpdatedTransaction}>Editar</button>
                    <button className="waves-effect btn red darken-4" id={transaction._id} onClick={handleDeletedTransaction}>Excluir</button>
                  </div>
                </div>
              )
            })}
          </>
          : <p>Tela de manutenção</p>
      }
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'api' });


export default function App() {
  const [transactions, setTransections] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get('/transaction?period=2019-07');
      setTransections(data);
    };
    fetchTransactions();
  }, []);
  console.log(transactions);
  return (
    <h1 className="center">Desafio Final do Bootcamp Full Stack</h1>
  );
}

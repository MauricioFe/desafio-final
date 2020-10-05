import React from 'react'
const EXPENSE_COLOR = '#fc5c65';
const EARNING_COLOR = '#0fb9b1';
export default function ListScreen({ transactions, periods, currentPeriod, onDeleteTransaction, onEditTransaction,
    onFilterChange, onPeriodChange, onNewTransaction }) {
    return (
        <>
            <select className="browser-default" value={currentPeriod} onChange={onPeriodChange}>{
                periods.map(period => {
                    return <option key={period}>{period}</option>
                })
            }</select>
            <label htmlFor="filterTransaction" className="active">Filtro</label>
            <input placeholder="filtro..." id="filterTransaction" onChange={onFilterChange} type="text" />
            <div>
                <button style={{
                    marginRight: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }} className="waves-effect btn" onClick={onNewTransaction} ><i className="large material-icons" style={{marginRight:'15px'}}>add</i>Nova Transação</button>
            </div>

            {transactions.map(transaction => {
                const currentColor = transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR;
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
                            <button style={{ marginRight: '5px' }} className="waves-effect btn" id={transaction._id} onClick={onEditTransaction}><i id={transaction._id} className="large material-icons">edit</i></button>
                            <button className="waves-effect btn red darken-4" id={transaction._id} onClick={onDeleteTransaction}><i id={transaction._id} className="large material-icons">delete</i></button>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

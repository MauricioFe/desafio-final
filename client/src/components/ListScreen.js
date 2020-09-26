import React from 'react'

export default function ListScreen() {
    return (
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
    )
}

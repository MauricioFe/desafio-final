import React, { useEffect, useState } from 'react'

export default function MaintenanceScreen({ transaction, onCancel }) {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('-');

    useEffect(() => {
        console.log(transaction);
        if (!transaction) {
            return;
        }
        const { description, value, category, yearMonthDay, type } = transaction;
        setDescription(description);
        setValue(value);
        setCategory(category);
        setDate(yearMonthDay);
        setType(type);
    })

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value.trim();
        setDescription(newDescription);
    };
    const handleValueChange = (event) => {
        const newValue = +event.target.value;
        setValue(newValue);
    };
    const handleCategoryChange = (event) => {
        const newCategory = +event.target.value;
        setValue(newCategory);
    };
    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setValue(newDate);
    };
    const handleTypeChange = (event) => {
        const newType = event.target.value;
        setValue(newType);
    };    
    const handleCancelClick = () => {
        onCancel();
    };



    return (
        <div>
            <div>
                <p>
                    <label>
                        <input name="type-radio" type="radio" checked={type === '-'} onChange={handleTypeChange} value='-' />
                        <span>Despesa</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="type-radio" type="radio" checked={type === '+'} onChange={handleTypeChange} value='+' />
                        <span>Receita</span>
                    </label>
                </p>
            </div>
            <div className="input-field">
                <input value={description} id="description" type="text" onChange={handleDescriptionChange} />
                <label htmlFor="description" className="active">Descrição</label>
            </div>
            <div className="input-field">
                <input value={value} id="value" type="number" onChange={handleValueChange} />
                <label htmlFor="value" className="active">Valor</label>
            </div>
            <div className="input-field">
                <input value={category} id="category" type="text" onChange={handleCategoryChange} />
                <label htmlFor="category" className="active">Categoria</label>
            </div>
            <div className="input-field">
                <input value={date} id="date" type="date" onChange={handleDateChange} />
                <label htmlFor="date" className="active">Data</label>
            </div>
            <button className="waves-effect waves-light btn">Salvar</button>
            <button style={{marginLeft: '25px'}} onClick={handleCancelClick}  className="waves-effect waves-light btn red darken-4">Cancelar</button>
        </div>
    )
}

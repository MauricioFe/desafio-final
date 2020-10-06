import React, { useEffect, useState } from 'react'
const INSERTING = 0;
const EDITING = 1;
function today() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');
    return `${year}-${month}-${day}`
}
export default function MaintenanceScreen({ transaction, onCancel, onSave }) {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(today());
    const [type, setType] = useState('-');
    const [mode, setMode] = useState(INSERTING);

    useEffect(() => {
        if (!transaction) {
            return;
        }
        const { description, value, category, yearMonthDay, type } = transaction;
        setDescription(description);
        setValue(value);
        setCategory(category);
        setDate(yearMonthDay);
        setType(type);
        setMode(EDITING)
    }, [transaction])

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
    };
    const handleValueChange = (event) => {
        const newValue = +event.target.value;
        setValue(newValue);
    };
    const handleCategoryChange = (event) => {
        const newCategory = event.target.value;
        setCategory(newCategory);
    };
    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setDate(newDate);
    };
    const handleTypeChange = (event) => {
        const newType = event.target.value;
        setType(newType);
    };
    const handleCancelClick = () => {
        onCancel();
    };
    const handleSaveClick = () => {
        const newTransaction = {
            _id: !!transaction ? transaction._id : null,
            description,
            value,
            type,
            yearMonthDay: date,
            category
        }
        onSave(newTransaction);
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
            <button className="waves-effect waves-light btn" onClick={handleSaveClick}>Salvar</button>
            <button style={{ marginLeft: '25px' }} onClick={handleCancelClick} className="waves-effect waves-light btn red darken-4">Cancelar</button>
        </div>
    )
}

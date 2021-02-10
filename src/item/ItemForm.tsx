import React, {useState} from 'react';
import {ItemType} from "./types";

type ItemFormType = {
    initialData: ItemType,
    onSubmit: (changedItem: ItemType) => void
};

const ItemForm = ({initialData, onSubmit}: ItemFormType) => {
    const [data, setData] = useState<ItemType>(initialData);

    // @ts-ignore
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data);
        onSubmit(data);
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, name: event.target.value});
    }

    const handleIsDoneChange = (option: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setData({...data, isDone: option});
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input value={data.name} onChange={handleNameChange}/>
            </div>
            <div>
                {['not_set', 'no', 'yes'].map((option) => (
                    <span key={option}>
                        <input type="radio" id={`isDone${option}`} onChange={handleIsDoneChange(option)} checked={data.isDone === option}/>
                        <label htmlFor={`isDone${option}`}>{option}</label>
                    </span>
                ))}
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default ItemForm;

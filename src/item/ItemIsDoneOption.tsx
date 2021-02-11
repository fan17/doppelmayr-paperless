import React from 'react';
import {ItemType} from "./types";

type ItemIsDoneOptionType = {
    item: ItemType,
    value: 'not_set'|'no'|'yes',
    onClick: (newValue: 'not_set'|'no'|'yes') => void
};

const ItemIsDoneOption = ({item, value, onClick}: ItemIsDoneOptionType) => {
    const handleChange = (event: React.ChangeEvent) => {
        console.log(value);
        onClick(value);
    }
    return (
        <span key="not_set">
            <input
                type="radio"
                id={`item_${item._id}_option_${value}`}
                onChange={handleChange}
                checked={value === item.isDone}
            />
                <label htmlFor={`item_${item._id}_option_${value}`}>{value}</label>
            </span>
    );
}

export default ItemIsDoneOption;

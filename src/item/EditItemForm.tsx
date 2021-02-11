import React from 'react';
import {ItemType} from "./types";
import ItemForm from "./ItemForm";

type EditItemFormType = {
    initialData: ItemType,
    onSubmit: (changedItem: ItemType) => void
};

const EditItemForm = ({initialData, onSubmit}: EditItemFormType) => (
    <>
        <h2>Edit</h2>
        <ItemForm initialData={initialData} onSubmit={onSubmit}/>
    </>
);

export default EditItemForm;

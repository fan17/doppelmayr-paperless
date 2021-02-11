import React from 'react';
import {ItemType} from "./types";
import ItemForm from "./ItemForm";
import {emptyItem} from "./constants";

type CreateItemFormType = {
    onSubmit: (changedItem: ItemType) => void
};

const CreateItemForm = ({onSubmit}: CreateItemFormType) => (
    <>
        <h2>Create</h2>
        <ItemForm initialData={emptyItem} onSubmit={onSubmit}/>
    </>
);

export default CreateItemForm;

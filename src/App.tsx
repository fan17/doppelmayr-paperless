import React, {useState} from 'react';
import Button from "./components/button/Button";
import Table from "./components/table";
import ItemForm from "./item/ItemForm";
import {ItemType} from "./item/types";
import {emptyItem} from "./item/constants";
import api from './item/api';

function App() {
    const [items, setItems] = useState<ItemType[]>([]);
    const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
    const [editedItem, setEditedItem] = useState<ItemType>(emptyItem);

    const handleLoad = async () => {
        console.log('load data');
        const newItems: ItemType[] = await api.getAll()
        setItems(newItems);
    }

    const handleDelete = (itemId: string) => async () => {
        console.log(`Delete ${itemId}`);
        await api.remove(itemId);
        await handleLoad();
    }

    const handleSave = async (item: ItemType) => {
        console.log('save');
        setFormIsVisible(false);
        if (item._id) {
            await api.update(item);
        } else {
            await api.create(item);
        }
        await handleLoad();
    }

    const openForm = (item: ItemType) => () => {
        setEditedItem(item);
        setFormIsVisible(true);
    }

    return (
        <div>
            <Button onClick={handleLoad}>Load data</Button>
            <Button onClick={openForm(emptyItem)}>Add item</Button>
            {formIsVisible && <ItemForm onSubmit={handleSave} initialData={editedItem}/>}
            <Table.Table>
                <Table.Head>
                    <Table.Row>
                        <Table.Cell>ID</Table.Cell>
                        <Table.Cell>Name</Table.Cell>
                        <Table.Cell>IsDone</Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {items.map(item => (
                        <Table.Row key={item._id}>
                            <Table.Cell>{item._id}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.isDone}</Table.Cell>
                            <Table.Cell>
                                <>
                                    <Button onClick={openForm(item)}>Edit</Button>
                                    <Button onClick={handleDelete(item._id)}>Delete</Button>
                                </>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Table>
        </div>
    );
}

export default App;

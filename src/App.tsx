import React, {useState} from 'react';
import Button from "./components/button/Button";
import Table from "./components/table";
import {ItemType} from "./item/types";
import api from './item/api';
import CreateItemForm from "./item/CreateItemForm";
import EditItemForm from "./item/EditItemForm";

function App() {
    const [items, setItems] = useState<ItemType[]>([]);
    const [createFormIsVisible, setCreateFormIsVisible] = useState<boolean>(false);
    const [editedItem, setEditedItem] = useState<ItemType|null>(null);

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

    const handleUpdate = async (item: ItemType) => {
        setEditedItem(null);
        await api.update(item);
        await handleLoad();
    }

    const handleCreate =  async (item: ItemType) => {
        setCreateFormIsVisible(false);
        await api.create(item);
        await handleLoad();
    }

    const openEditForm = (item: ItemType) => () => {
        setCreateFormIsVisible(false);
        setEditedItem(null);
        setEditedItem(item);
    }

    const openNewForm = () => {
        setEditedItem(null);
        setCreateFormIsVisible(true);
    }

    return (
        <div>
            <Button onClick={handleLoad}>Load data</Button>
            <Button onClick={openNewForm}>Add item</Button>
            {createFormIsVisible && <CreateItemForm onSubmit={handleCreate}/>}
            {editedItem && <EditItemForm initialData={editedItem} onSubmit={handleUpdate}/>}
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
                                    <Button onClick={openEditForm(item)}>Edit</Button>
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

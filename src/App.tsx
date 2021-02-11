import React, {useState} from 'react';
import Button from "./components/button/Button";
import Table from "./components/table";
import {ItemType} from "./item/types";
import {update, getAll} from './item/api';
import ItemIsDoneOption from "./item/ItemIsDoneOption";

type Items = {
    [id: string]: ItemType,
}

function App() {
    const [items, setItems] = useState<Items>({});

    const handleLoad = async () => {
        console.log('load data');
        const newItems: ItemType[] = await getAll();
        setItems(
            newItems.reduce((result: Items, current: ItemType) => {
                return {...result, [current._id]: current};
            }, {})
        );
    }

    const handleChangeIsDone = (item: ItemType) => async (isDone: 'not_set' | 'no' | 'yes') => {
        // update state
        setItems({...items, [item._id]: {...item, isDone}});

        // update db
        await update({...item, isDone});
    }

    console.log(items);

    return (
        <div>
            <Button onClick={handleLoad}>Load data</Button>
            <Table.Table>
                <Table.Head>
                    <Table.Row>
                        <Table.Cell>Name</Table.Cell>
                        <Table.Cell>IsDone</Table.Cell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {Object.values(items).map(item => (
                        <Table.Row key={item._id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>
                                <>
                                    <ItemIsDoneOption item={item} value="not_set" key="not_set" onClick={handleChangeIsDone(item)}/>
                                    <ItemIsDoneOption item={item} value="yes" key="yes" onClick={handleChangeIsDone(item)}/>
                                    <ItemIsDoneOption item={item} value="no" key="no" onClick={handleChangeIsDone(item)}/>
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

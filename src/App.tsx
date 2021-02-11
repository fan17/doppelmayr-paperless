import React, {useState} from 'react';
import Button from "./components/button/Button";
import Table from "./components/table";
import {ItemType} from "./item/types";
import {update, getAll} from './item/api';
import ItemIsDoneOption from "./item/ItemIsDoneOption";

type AppType = {
    isOnline: boolean,
}

type Items = {
    [id: string]: ItemType,
}

type Action = () => void;

const App = ({isOnline}: AppType)  => {
    const [items, setItems] = useState<Items>({});
    const [actions, setActions] = useState<Action[]>([]);

    const addAction = (action: Action) => {
        setActions([...actions, action]);
    }

    const sync = async () => {
        actions.map(async (action) => {
            await action();
        });
        setActions([]);
    }

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
        setItems({...items, [item._id]: {...item, isDone}});

        const action = update({...item, isDone});
        if (isOnline) {
            await action();
        } else {
            addAction(action)
        }
    }

    return (
        <div>
            <h1>Manual sync</h1>
            <h1>{isOnline ? 'You are online' : 'You are offline'}</h1>
            <div>
                To sync {actions.length}
                {actions.length && isOnline ? <Button onClick={sync}>Sync</Button> : null}
            </div>
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
                                    <ItemIsDoneOption item={item} value="not_set" key="not_set"
                                                      onClick={handleChangeIsDone(item)}/>
                                    <ItemIsDoneOption item={item} value="yes" key="yes"
                                                      onClick={handleChangeIsDone(item)}/>
                                    <ItemIsDoneOption item={item} value="no" key="no"
                                                      onClick={handleChangeIsDone(item)}/>
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

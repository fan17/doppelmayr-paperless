import React, {useState, useEffect} from 'react';
import Button from "./components/button/Button";
import Table from "./components/table";
import {ItemType} from "./item/types";
import {update, getAll} from './item/api';
import ItemIsDoneOption from "./item/ItemIsDoneOption";
import * as localforage from "localforage";

type AppType = {
    isOnline: boolean,
}

type Items = {
    [id: string]: ItemType,
}

type Action = () => void;


const itemsStore = localforage.createInstance({
    name: 'paperless',
    storeName: "items"
});

const actionsStore = localforage.createInstance({
    name: 'paperless',
    storeName: "actions"
});

const App = ({isOnline}: AppType)  => {
    const [items, setItems] = useState<Items>({});
    const [actions, setActions] = useState<Action[]>([]);

    const addAction = (action: Action) => {
        setActions([...actions, action]);
    }

    const sync = async () => {
        await Promise.all(actions.map(async (action) => {
            await action();
        }));
        setActions([]);
        await handleLoad();
    }

    const handleLoad = async () => {
        const newItems: ItemType[] = await getAll();
        const itemsById = newItems.reduce((result: Items, current: ItemType) => {
            return {...result, [current._id]: current};
        }, {});
        setItems(itemsById);
        await Promise.all(newItems.map(async newItem => await itemsStore.setItem(newItem._id, newItem)));
    }

    const handleChangeIsDone = (item: ItemType) => async (isDone: 'not_set' | 'no' | 'yes') => {
        const itemAfterChange = {...item, isDone};
        setItems({...items, [item._id]: itemAfterChange});

        const action = update(itemAfterChange);
        if (isOnline) {
            await action();
        } else {
            addAction(action)
        }
    }

    const initItemsFromDB = async () => {
        let itemsFromDB: Items = {};
        // @ts-ignore
        const ids = await itemsStore.keys();

        // @ts-ignore
        await Promise.all(ids.map(async (id) => {
            // @ts-ignore
            itemsFromDB[id] = await itemsStore.getItem(id);
        }));

        setItems(itemsFromDB);
    }


    useEffect(() => {
        initItemsFromDB().then(() => {});
    }, []);

    const initActionsFromDB  = async () => {
        let actionsFromDB: {} = {};
        // @ts-ignore
        const ids = await actionsStore.keys();

        // @ts-ignore
        await Promise.all(ids.map(async (id) => {
            // @ts-ignore
            const actionString: string = await actionsStore.getItem(id);
            // @ts-ignore
            actionsFromDB[id] = eval(actionString);
        }));

        setActions(Object.values(actionsFromDB));
    }

    useEffect(() => {
        initActionsFromDB().then(() => {});
    }, []);

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

import React, {useEffect, useState} from 'react';
import Table from "../components/table";
import ItemIsDoneOption from "./ItemIsDoneOption";
import {ItemType} from "./types";
import {update} from "./api";

type ItemCollectionType = {
    [id: string]: ItemType,
}

type ItemsType = {
    isOnline: boolean,
    actionsStore: Object,
    itemsStore: Object,
}

const Items = ({isOnline, itemsStore, actionsStore}: ItemsType) => {
    const [items, setItems] = useState<ItemCollectionType>({});
    const initFromDB = async () => {
        let itemsFromDB: ItemCollectionType = {};
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
        initFromDB().then(() => {});
    }, [initFromDB]);

    const handleChangeIsDone = (item: ItemType) => async (isDone: 'not_set' | 'no' | 'yes') => {
        const itemAfterChange = {...item, isDone};
        setItems({...items, [item._id]: itemAfterChange});
        const action = update(itemAfterChange);
        if (isOnline) {
            await action();
        } else {
            // @ts-ignore
            actionsStore.setItem(Date.now(), action.toString());
        }

        // @ts-ignore
        await itemsStore.setItem(item._id, itemAfterChange);
    }

    return (
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
    );
}

export default Items;

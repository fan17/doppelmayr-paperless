import React from 'react';
import Button from "../components/button/Button";
import {ItemType} from "./types";
import {getAll} from "./api";

type LoadDataType = {
    isOnline: boolean,
    actionsStore: Object,
    itemsStore: Object,
}

const LoadData = ({isOnline, itemsStore, actionsStore}: LoadDataType) => {
    const handleLoad = async () => {
        const newItems: ItemType[] = await getAll();
        // @ts-ignore
        await Promise.all(newItems.map(async newItem => await itemsStore.setItem(newItem._id, newItem)));
        window.location.reload();
    }

    return (
        <Button onClick={handleLoad}>Load data from live</Button>
    );
}

export default LoadData;

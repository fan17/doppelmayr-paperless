import React from 'react';
import LoadData from "./item/LoadData";
import Items from "./item/Items";
import localforage from "localforage";

const itemsStore = localforage.createInstance({
    name: 'paperless',
    storeName: "items"
});

const actionsStore = localforage.createInstance({
    name: 'paperless',
    storeName: "actions"
});

type AppType = {
    isOnline: boolean,
}

const App = ({isOnline}: AppType) => {
    return (
        <div>
            <h1>Background sync</h1>
            <h1>{isOnline ? 'You are online' : 'You are offline'}</h1>
            <LoadData isOnline={isOnline} itemsStore={itemsStore} actionsStore={actionsStore} />
            <Items isOnline={isOnline} itemsStore={itemsStore} actionsStore={actionsStore}/>
        </div>
    );
}

export default App;

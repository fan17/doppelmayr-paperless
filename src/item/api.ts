import axios from "axios";
import {ItemType} from "./types";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const API_PATH = 'https://crudcrud.com/api/ff42a19645be41c1996397875be200c9/items';

export const getAll = async () => {
    const response = await fetch(API_PATH);
    return await response.json();
}

export const update = (item: ItemType) => async () => {
    return await axios.put(`${API_PATH}/${item._id}`, {name: item.name, isDone: item.isDone});
}

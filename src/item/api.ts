import axios from "axios";
import {ItemType} from "./types";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const API_PATH = 'https://crudcrud.com/api/ff42a19645be41c1996397875be200c9/items';

const getAll = async () => {
    const response = await fetch(API_PATH);
    return await response.json();
}

const create = async (item: ItemType) => {
    return await axios.post(API_PATH, {name: item.name, isDone: item.isDone});
}

const update = async (item: ItemType) => {
    return await axios.put(`${API_PATH}/${item._id}`, {name: item.name, isDone: item.isDone});
}

const remove = async (itemId: string) => {
    return await axios.delete(`${API_PATH}/${itemId}`);
}

export default {
    getAll,
    create,
    update,
    remove
}
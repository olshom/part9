import axios from 'axios';
import type {Entry, NewEntry} from "./types.ts";


const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
    return axios.get<Entry[]>(baseUrl).then(res=>res.data)
}


export const createEntry = (obj: NewEntry) => {
    return axios.post<Entry>(baseUrl, obj)
        .then(res=>res.data)
}
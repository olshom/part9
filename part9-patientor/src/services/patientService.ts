import patients from '../../data/patients';
import {NewPatient, Patient, NonSensitivePatient, type Entry, EntryWithoutId} from "../types";
import { v1 as uuid } from 'uuid';


const getNonSensitivePatient = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) =>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const id: string = uuid();
    const newPatient = {
        id: id,
        entries:[],
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const getThePatient =(id:string): Patient => {
    return <Patient>patients.find(p => p.id === id);
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
        const id: string = uuid();
        const newEntry = {
            id: id,
            ...entry
        };
        patients.find(p=>p.id===patientId)?.entries.push(newEntry);
        return newEntry;
};

export default {
    getNonSensitivePatient,
    addPatient,
    getThePatient,
    addEntry
};
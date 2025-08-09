import { z } from 'zod';
import {NewPatientSchema, NewBaseEntrySchema} from "./utils";

export interface Diagnosis {
    code:string;
    name:string;
    latin?:string;
}
/*
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}*/

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}


interface SickLeave {
    startDate: string,
    endDate: string
}

interface Discharge {
    date: string,
    criteria: string
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Patient extends NewPatient {
        id: string;
        entries: Entry[]
}

export interface BaseEntry extends NewBaseEntry {
        id: string;
}
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string,
    sickLeave?: SickLeave
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type NonSensitivePatient = Omit<Patient, 'ssn'| 'entries'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;
export type NewBaseEntry = z.infer<typeof NewBaseEntrySchema>;
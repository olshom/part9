import {NewPatient,NewBaseEntry, Gender} from "./types";
import * as z from "zod";

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});

export const NewBaseEntrySchema = z.object({
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional()
});

/*export const HospitalEntry = NewBaseEntry.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export const OccupationalHealthcareEntry = NewBaseEntry.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

export const HealthCheckEntry = NewBaseEntry.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

export const NewEntry = z.discriminatedUnion("type", [
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
]);*/

export const toNewBaseEntry = (object: unknown): NewBaseEntry => {
    return NewBaseEntrySchema.parse(object);
};

const toNewPatient = (object: unknown): NewPatient => {
    return NewPatientSchema.parse(object);
};

export default toNewPatient;
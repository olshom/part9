import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import {NewPatientSchema, NewBaseEntrySchema} from '../utils';
import * as z from "zod";
import {Entry, EntryWithoutId, NewPatient, Patient} from "../types";

const router = express.Router();

router.get('/', (_req, res) =>{
    res.send(patientService.getNonSensitivePatient());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewBaseEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

/*const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};*/

router.get('/:id', (req, res) =>{
    const id = req.params.id;
    res.send(patientService.getThePatient(id));
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
        const addedPatient = patientService.addPatient(req.body);
        res.json(addedPatient);
});

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, EntryWithoutId>, res: Response<Entry>) => {
    console.log("Hello");
    const patientId = req.params.id;
    const addedEntry = patientService.addEntry(patientId, req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;
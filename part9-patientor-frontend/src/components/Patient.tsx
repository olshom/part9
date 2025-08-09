import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import patientService from "../services/patients.ts";
import {type Patient, HealthCheckRating, Discharge, Entry, EntryFormValues, Diagnosis} from "../types.ts";
import HealthRatingBar from "./HealthRatingBar.tsx";
import {
    Box,
    Table,
    Button,
    TableHead,
    Typography,
    TableCell,
    TableRow,
    TableBody,
} from '@mui/material';
import axios from "axios";
import AddEntryModal from "./AddEntryModal";


const HealthCheckEntry = ({healthCheckRating}: {healthCheckRating: HealthCheckRating }): JSX.Element => {
    return (
        <HealthRatingBar showText={false} rating={healthCheckRating} />
    );
};

const HospitalEntry = ({discharge}: {discharge: Discharge }): JSX.Element => {
    return (
        <><p>{discharge.date}</p><p>{discharge.criteria}</p></>
    );
};

const OccupationalHealthcare = ({employerName}: {employerName: string }): JSX.Element => {
    return (
        <p>{employerName}</p>
    );
};

const PatientComponent = ({diagnosisList}: { diagnosisList: Diagnosis[] })  => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const id = useParams().id as string;

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
      setModalOpen(false);
  };

  useEffect(() => {
    const fetchPatient = async() => {
      const patient = await patientService.getOnePatient(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  if (patient === null) {
    return "loading";
  }

  const assertNever = (entry: never): never => {
      throw new Error(
          `Unhandled discriminated union member ${JSON.stringify(entry)}`
      );
  };

  const EntryDetails  = (entry: Entry) => {
      switch (entry.type) {
          case "HealthCheck":
              return <HealthCheckEntry healthCheckRating={entry.healthCheckRating} />;
          case "Hospital":
              return <HospitalEntry discharge={entry.discharge} />;
          case "OccupationalHealthcare":
                return <OccupationalHealthcare employerName={entry.employerName} />;
          default:
              return assertNever(entry);
      }
  };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        openModal();
    };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      setPatient({...patient, entries: patient.entries.concat(entry)});
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
  <>
      <Box>
        <Typography align="left" variant="h5" fontWeight="bold">
            {patient.name}
        </Typography>
      </Box>
      <Box>
      <Typography>Gender: {patient.gender}</Typography>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>Date of birth: {patient.dateOfBirth}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
          <TableHead>
              <TableRow>
                <TableCell>
                    <Typography align="left" variant="h6">
                Entries:
                    </Typography>
                </TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
          {patient.entries.map(entry =>
              <TableRow key={entry.id}>
                  <TableCell>
                      <Typography>Date: {entry.date}</Typography>
                      <Typography>{entry.description}</Typography>
                      {entry.diagnosisCodes && entry.diagnosisCodes?.length > 0 && entry.diagnosisCodes?.map(code => {
                          const diagnosisByCode= diagnosisList.find(diagnosis => diagnosis.code === code);
                          return <Typography key={code}>{code} {diagnosisByCode?.name}</Typography>;
                      })}
                      {EntryDetails(entry)}
                      <Typography>diagnose by {entry.specialist}</Typography>
                      </TableCell>
                </TableRow>)}
          </TableBody>
      </Table>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnosisList={diagnosisList}
      />
      <form onSubmit={handleSubmit}>
          <Button variant="contained" type="submit">
            Add New Entry
        </Button>
      </form>
  </>
  );
};

export default PatientComponent;
import {Button, Grid, Select, TextField, SelectChangeEvent, MenuItem, InputLabel} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {Diagnosis, EntryFormValues, HealthCheckRating} from "../../types.ts";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues) => void;
    diagnosisList: Diagnosis[]
}

interface HealthCheckRatingOption {
    value: HealthCheckRating;
    label: number;
}

const healthCheckRatingOption: HealthCheckRatingOption[] = Object.values(HealthCheckRating).filter(x => typeof x === 'number').map(v => ({
    value: v, label: Number(v)
}));

const AddEntryForm = ({onCancel, onSubmit, diagnosisList}: Props) => {
    const [type, setType] = useState<"Hospital" | "OccupationalHealthcare" | "HealthCheck">("Hospital");
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [date, setDate] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [employerName, setEmployerName] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');


    const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        const value = event.target.value;
        const healthCheckRating = Object.values(HealthCheckRating).filter(x => typeof x === 'number').find(r => r === Number(value));
        if (healthCheckRating) {
            setHealthCheckRating(healthCheckRating);
        }
    };

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        const entryBaseObject = {
            description,
            date,
            specialist,
            diagnosisCodes,
        };
        let entryObject;
        switch (type) {
            case "HealthCheck":
                entryObject = {
                    ...entryBaseObject,
                    type,
                    healthCheckRating
                };
                break;
            case "Hospital":
                entryObject = {
                    ...entryBaseObject,
                    type: type,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria
                    }
                };
                break;
            case "OccupationalHealthcare":
                entryObject = {
                    ...entryBaseObject,
                    type: type,
                    employerName: employerName,
                    sickLeave: {
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate
                    }
                };
                break;
        }

        onSubmit(entryObject);
    };

    const handleDiagnosisCodes = (event: SelectChangeEvent) => {
        const {
            target: {value},
        } = event;
        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value,
        );
    };

    const renderSpecificFields = () => {
        switch (type) {
            case "OccupationalHealthcare":
                return (
                    <>
                        <TextField
                            label="Employer name"
                            fullWidth
                            value={employerName}
                            onChange={({target}) => setEmployerName(target.value)}
                        />
                        <p>Start date sick leave</p>
                        <TextField
                            fullWidth
                            type="date"
                            value={sickLeaveStartDate}
                            onChange={({target}) => setSickLeaveStartDate(target.value)}
                        /><p>End date sick leave</p>
                        <TextField
                            fullWidth
                            type="date"
                            value={sickLeaveEndDate}
                            onChange={({target}) => setSickLeaveEndDate(target.value)}
                        />
                    </>
                );
            case "Hospital":
                return (
                    <><p>Discharge</p>
                        <TextField
                            placeholder="YYYY-MM-DD"
                            fullWidth
                            type="date"
                            value={dischargeDate}
                            onChange={({target}) => setDischargeDate(target.value)}
                        />
                        <TextField
                            label="Discharge Criteria"
                            fullWidth
                            value={dischargeCriteria}
                            onChange={({target}) => setDischargeCriteria(target.value)}
                        />
                    </>
                );
            case "HealthCheck":
                return (
                    <Select
                        label="health check rating"
                        value={healthCheckRating.toString()}
                        onChange={onHealthCheckRatingChange}
                    >
                        {healthCheckRatingOption.map(option =>
                            <MenuItem key={option.label} value={option.value}>
                                {option.label}
                            </MenuItem>
                        )}
                    </Select>
                );
        }
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <Select
                    label="Entry Type"
                    value={type}
                    onChange={(event) => setType(event.target.value as typeof type)}
                >
                    <MenuItem value="Hospital">
                        Hospital
                    </MenuItem>
                    <MenuItem value="OccupationalHealthcare">
                        OccupationalHealthcare
                    </MenuItem>
                    <MenuItem value="HealthCheck">
                        HealthCheck
                    </MenuItem>
                </Select>
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({target}) => setDescription(target.value)}
                />
                <TextField
                    label="Spesialist"
                    fullWidth
                    value={specialist}
                    onChange={({target}) => setSpecialist(target.value)}
                />
                <TextField
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    type="date"
                    value={date}
                    onChange={({target}) => setDate(target.value)}
                />
                <InputLabel>Diagnoses codes</InputLabel>
                <Select
                    multiple
                    // @ts-ignore
                    value={diagnosisCodes}
                    onChange={handleDiagnosisCodes}
                >
                    {diagnosisList.map((d) => {
                        return <MenuItem key={d.code} value={d.code}>
                            {d.code}
                        </MenuItem>;
                    })}
                </Select>
                {renderSpecificFields()}

                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{float: "left"}}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: "right",
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddEntryForm;


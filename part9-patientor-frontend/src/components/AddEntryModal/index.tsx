import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import {Diagnosis, EntryFormValues} from "../../types.ts";
import AddEntryForm from "./AddEntryForm.tsx";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  diagnosisList: Diagnosis[]
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnosisList }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnosisList={diagnosisList}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
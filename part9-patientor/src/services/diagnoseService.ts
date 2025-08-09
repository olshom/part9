import diagnosis from '../../data/diagnoses';
import { Diagnosis} from "../types";

const getDiagnosis = ():Diagnosis[] => {
    return diagnosis;
};

export default {
    getDiagnosis
};
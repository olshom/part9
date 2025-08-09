import axios from "axios";

import { apiBaseUrl } from "../constants.ts";
import {Diagnosis} from "../types.ts";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnosis`
  );

  return data;
};

export default {
    getAll
};
import http from '../services/httpService';
import { hospitalApi } from '../config.json';

const addDiagnosisEndPoint = hospitalApi + "/hospital/diagnoses";

export const addDiagnosisDetails = (payload, token) => {
  return http.post(addDiagnosisEndPoint, payload, {
      headers: {
          Authorization: `Token ${token}`,
      },
  });
};
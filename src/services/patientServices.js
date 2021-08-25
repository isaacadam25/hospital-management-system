import http from "../services/httpService";
import { hospitalApi } from "../config.json";

const addPatientEndPoint = hospitalApi + "/hospital/patients/";
const getPatientTypeEndPoint = hospitalApi + "/hospital/patient-type";

export const registerPatient = (payload, token) => {
  return http.post(addPatientEndPoint, payload, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const getAllPatient = (token) => {
  return http.get(addPatientEndPoint, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const getTodayRegisteredPatients = (token) => {
  return http.get(`${hospitalApi}/hospital/patients/today`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const getPatientType = (token) => {
  return http.get(getPatientTypeEndPoint, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const getSinglePatientDetails = (id, token) => {
  return http.get(`${hospitalApi}/hospital/patients/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const updateSinglePatientDetails = (id, payload, token) => {
  return http.put(`${hospitalApi}/hospital/patients/${id}`, payload, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

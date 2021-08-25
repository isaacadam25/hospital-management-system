import http from "../services/httpService";
import { hospitalApi } from "../config.json";

const addPrescriptionEndPoint = hospitalApi + "/hospital/prescriptions/create";
const getPrescriptionEndPoint = hospitalApi + "/hospital/prescriptions/pending";

export const addPrescription = (payload, token) => {
  return http.post(addPrescriptionEndPoint, payload, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

export const getPrescriptions = (token) => {
  return http.get(getPrescriptionEndPoint, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

export const getSinglePrescription = (id, token) => {
  return http.get(`${hospitalApi}/hospital/prescriptions/${id}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

export const acceptPrescription = (id, token) => {
  return http.patch(
    `${hospitalApi}/hospital/prescriptions/accept/${id}`,
    null,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );
};

import http from "../services/httpService";
import { hospitalApi } from "../config.json";

const getMedicineEndPoint = hospitalApi + "/pharmacy/batches";

export const getAllMedicine = (token) => {
  return http.get(getMedicineEndPoint, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

export const getSingleBatch = (id, token) => {
  return http.get(`${hospitalApi}/pharmacy/batches/${id}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

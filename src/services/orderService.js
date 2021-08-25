import http from "../services/httpService";
import { apiUrl, hospitalApi } from "../config.json";

const newOrderEndPoint = "/order";
const addBatchEndPoint = hospitalApi + "/pharmacy/batches/create";

export const createOrder = (destination ,token) => {
    const payload = {
        destination: destination
    }
    return http.post(newOrderEndPoint, payload, {
        headers: {
            Authorization: `token ${token}`
        }
    });
};

export const getAllIncomingOrders = (refNo, token) => {
  return http.get(`${apiUrl}/hospital/pharmacy/incoming/${refNo}`, {
      headers: {
          Authorization: `token ${token}`
      }
  });
};

export const getTransactionById = (id, token) => {
  return http.get(`${apiUrl}/transactions/details/${id}`, {
      headers: {
          Authorization: `token ${token}`
      }
  });
};

export const acceptSingleOrder = (id, payload, token) => {
  return http.patch(`${apiUrl}/transactions/accept/${id}`, payload,{
      headers: {
          Authorization: `token ${token}`
      }
  }) ;
};

export const addHospitalBatch = (payload, token) => {
  return http.patch(addBatchEndPoint, payload, {
      headers: {
          Authorization: `token ${token}`
      }
  });
};

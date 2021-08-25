import http from '../services/httpService';
import { hospitalApi } from '../config.json';

const addAppointmentEndPoint = hospitalApi + "/hospital/appointments/";
const getPendingAppointmentEndPoint = hospitalApi + "/hospital/appointments/pending";

export const addAppointment = (payload, token) => {
  return http.post(addAppointmentEndPoint, payload,{
      headers: {
          Authorization: `Token ${token}`,
      },
  });
};

export const getPendingAppointment = (token) => {
  return http.get(getPendingAppointmentEndPoint, {
      headers: {
          Authorization: `Token ${token}`,
      },
  });
};
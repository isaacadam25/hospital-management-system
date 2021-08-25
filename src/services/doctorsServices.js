import http from '../services/httpService';
import { hospitalApi } from '../config.json';

const getAllDoctorsEndPoint = hospitalApi + "/userlist/doctors/";

export const getDoctors = (token) => {
  return http.get(getAllDoctorsEndPoint, {
      headers: {
          Authorization: `Token ${token}`,
      },
  });
};
import http from '../services/httpService';
import { apiUrl } from '../config.json';

const getAllHospitalEndPoint = apiUrl + "hub/destinations/";

export const getAllHospitals = (token) => {
    return http.get(getAllHospitalEndPoint, {
        headers: {
            Authorization: `token ${token}`
        }
    });
};
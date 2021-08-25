import http from "../services/httpService";
import { apiUrl } from "../config.json";

const loginEndPoint = apiUrl + "/login/";
const getProfileEndPoint = apiUrl + "/userprofile/";

export const login = (username, password) => {
  const data = { username: username, password: password };
  return http.post(loginEndPoint, data);
};

export const getProfile = (token) => {
  return http.get(getProfileEndPoint, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

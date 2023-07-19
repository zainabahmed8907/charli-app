import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
axiosInstance.interceptors.request.use(
  (request) => {
    const token = process.env.REACT_APP_USER_TOKEN;
    request.headers.Accept = "application/json";
    request.headers["Content-Type"] = "application/json";
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axiosInstance.interceptors.response.use(
  (request) => {
    request.headers["Content-Type"] = "application/json";
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

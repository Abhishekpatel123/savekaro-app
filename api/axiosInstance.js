import axios from "axios";
import { baseURL } from "../config/config";
const axiosInstance = () => {
  const user = localStorage.getItem("user");
  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  instance.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        alert("You are not authorized");
      }
      return response;
    },
    (error) => {
      if (error.response.data.status === 401) {
        alert("You are not authorized");
      }
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    }
  );
  return instance;
};

export default axiosInstance;

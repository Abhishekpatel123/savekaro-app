import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BACKEND_URL } from "../config";
const axiosInstance = axios.create({ baseURL: BACKEND_URL });

// const axiosInstance = async () => {
//   const accessToken = await AsyncStorage.getItem("accessToken");
//   const instance = axios.create({
//     baseURL: BACKEND_URL,
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   // - Response handling
//   instance.interceptors.response.use(
//     (response) => response,
//     (error) => error
//   );

//   // - Request handling
//   // Do something if you want

//   return instance;
// };

export default axiosInstance;

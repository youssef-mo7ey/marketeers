import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      config.headers["Authorization"] = `Bearer ${user}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response if necessary (e.g., handle response data)
    return response;
  },
  (error) => {
    console.log(error)
    if (error.response) {
      toast.error(
        `Error: ${error.response.data.message || "Something went wrong"}`
      );
    } else {
      toast.error("Network Error: Unable to connect to the server");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

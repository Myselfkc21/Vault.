import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://ec2-3-108-238-140.ap-south-1.compute.amazonaws.com:3000",
  //baseURL: "http://ec2-43-204-236-237.ap-south-1.compute.amazonaws.com:3000",
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

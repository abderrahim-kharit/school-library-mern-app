import axios from "axios";

const JWT = localStorage.getItem("token") || "";
const axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: `Bearer ${JWT}`,
  },
});

export default axiosAdmin;

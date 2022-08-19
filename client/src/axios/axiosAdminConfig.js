import axios from "axios";

const JWT = localStorage.getItem("token") || "";
const axiosAdmin = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${JWT}`,
  },
});

export default axiosAdmin;

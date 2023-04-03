import axios from "axios";

const API_BASE_URL = import.meta.env.APP_API_BASE_URL as string;
const API = axios.create({
  baseURL: API_BASE_URL || "http://localhost/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;

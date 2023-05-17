import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "./constants";

export const api = {
  init: ():AxiosInstance => {
    return axios.create({
      baseURL: API_BASE_URL || "http://localhost/api",
      headers: { "Content-Type": "application/json" },
    });
  },
};

export const generateFakeId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const machineId = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
  const processId = Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
  const counter = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');

  return timestamp + machineId + processId + counter;
}

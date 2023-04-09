import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "./constants";

export const api = {
  init: ():AxiosInstance => {
    return axios.create({
      baseURL: API_BASE_URL || "http://localhost/api",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

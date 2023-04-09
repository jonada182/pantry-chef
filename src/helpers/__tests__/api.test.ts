import axios from "axios";
import { api } from "../api";
import { API_BASE_URL } from "../constants";

jest.mock("axios");
jest.mock("../constants", () => ({
  API_BASE_URL: "http://localhost/api",
}));

test("API instance should create an axios instance with the correct baseURL and headers", async () => {
  const expectedBaseURL = API_BASE_URL;
  const expectedHeaders = {
    "Content-Type": "application/json",
  };
  const expectedResponse = { data: "success" };
  const mockAxios = axios as jest.Mocked<typeof axios>;
  mockAxios.create.mockImplementation(() => axios );
  mockAxios.get.mockResolvedValue(expectedResponse);

  const mockAPI = api.init();
  const response = await mockAPI.get("");
  const axiosCreateSpy = jest.spyOn(mockAxios, "create");

  expect(axiosCreateSpy).toHaveBeenCalledWith({
    baseURL: expectedBaseURL,
    headers: expectedHeaders,
  });
  expect(response).toBe(expectedResponse);
});

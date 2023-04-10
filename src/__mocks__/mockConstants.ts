import { API_BASE_URL } from "../helpers/constants";
jest.mock("../constants", () =>({
  API_BASE_URL: "http://localhost/api",
}));

export { API_BASE_URL };

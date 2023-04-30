import { useGetGroceries } from "../useGetGroceries";
import axios from "axios";
import { waitFor, renderHook } from "@testing-library/react";
import { GroceryCategory } from "../../types";

jest.mock("../../helpers/constants", () =>({ API_BASE_URL: "http://localhost/api" }));

jest.mock("axios");

describe("useGetGroceries", () => {

  it("should call groceries API and return a response", async () => {
    const responseData: GroceryCategory[] = [
      {
        _id: "6436f9baa2f58757c04bb456",
        items: [
          {
            _id: "64370a60a7763c952a6ef16c",
            categoryId: "6436f9baa2f58757c04bb456",
            name: "Apples",
            slug: "apples",
          },
        ],
        name: "Produce",
        slug: "produce",
      },
    ];
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.post.mockResolvedValueOnce(responseData);

    const { result } = renderHook(() => useGetGroceries());

    waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.data).toBe(responseData);
    });
  });

  it("should call groceries API and return an error", async () => {
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.post.mockImplementation(() => {
      throw Error("new error");
    });

    const { result } = renderHook(() => useGetGroceries());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.data).toBeNull();
  });

});

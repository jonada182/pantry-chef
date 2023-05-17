import { renderHook, act, waitFor } from "@testing-library/react";
import { useUserGroceries } from "../useUserGroceries";
import axios from "axios";

jest.mock("../../helpers/constants", () =>({ API_BASE_URL: "http://localhost/api", APP_USER_ID: "test-user" }));

jest.mock("axios");

describe("useUserGroceries hook", () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should add, delete, and retrieve user groceries", async () => {
    const responseData = [{ grocery_item_id: "test-item-id-1" }];
    const expectedResponse = [{ groceryItemId: "test-item-id-1" }];
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.get.mockResolvedValueOnce({ data: responseData });
    mockAxios.post.mockResolvedValueOnce({ data: {message: "saved"} });
    mockAxios.delete.mockResolvedValueOnce({ data: {message: "deleted"} });

    const { result } = renderHook(() => useUserGroceries());

    expect(mockAxios.get).toBeCalledWith(`/user/test-user/groceries`);
    expect(mockAxios.get).toBeCalledTimes(1);

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.userGroceries).toStrictEqual(expectedResponse);
    });

    // Test adding an item
    const testItem = { groceryItemId: "test-item-id-2" };
    await act(async () => {
      await result.current.addUserGrocery(testItem);
    });

    expect(mockAxios.post).toBeCalledWith(`/user/test-user/groceries/${ testItem.groceryItemId }`);
    expect(mockAxios.post).toBeCalledTimes(1);

    expect(result.current.loading).toBe(false);

    await waitFor(() => {
      expect(result.current.error).toBeNull();
      // Verify that the item was added
      expect(result.current.userGroceries).toHaveLength(2);
      expect(result.current.userGroceries).toStrictEqual([...expectedResponse, testItem]);
    });

    // Test deleting the item
    await act(async () => {
      await result.current.deleteUserGrocery(testItem.groceryItemId);
    });

    expect(mockAxios.delete).toBeCalledWith(`/user/test-user/groceries/${ testItem.groceryItemId }`);
    expect(mockAxios.delete).toBeCalledTimes(1);

    expect(result.current.loading).toBe(false);

    await waitFor(() => {
      expect(result.current.error).toBeNull();
      // Verify that the item was deleted
      expect(result.current.userGroceries).toHaveLength(1);
      expect(result.current.userGroceries).toStrictEqual(expectedResponse);
    });
  });
});

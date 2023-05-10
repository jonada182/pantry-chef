import { renderHook, act } from "@testing-library/react";
import { useMyGroceries } from "../useMyGroceries";
import axios from "axios";
import mockLocalStorage from "../../../__mocks__/localStorage";

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

jest.mock("../../helpers/constants", () =>({ API_BASE_URL: "http://localhost/api" }));

jest.mock("axios");

describe("useMyGroceries hook", () => {

  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  test("should add, delete, and retrieve selected items", async () => {
    const responseData = [{ groceryItemId: "test-item-id-1" }];
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.get.mockResolvedValueOnce({ data: responseData });

    const { result } = renderHook(() => useMyGroceries());

    // Test adding an item
    const testItem = { groceryItemId: "test-item-id-1" };
    await act(async () => {
      await result.current.addSelectedItem(testItem);
    });

    // Verify that the item was added
    expect(result.current.selectedItems).toHaveLength(1);
    expect(result.current.selectedItems[0]).toEqual(testItem);

    // Test deleting the item
    await act(async () => {
      await result.current.deleteSelectedItem(testItem.groceryItemId);
    });

    // Verify that the item was deleted
    expect(result.current.selectedItems).toHaveLength(0);
  });
});

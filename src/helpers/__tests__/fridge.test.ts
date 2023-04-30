import { getMyGroceries, storeMyGroceries } from "../fridge";
import mockLocalStorage from "../../__mocks__/localStorage";

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("Grocery functions", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("getMyGroceries should return an empty array when no items are stored", () => {
    const result = getMyGroceries();
    expect(result).toEqual([]);
  });

  test("storeMyGroceries should store items in localStorage", () => {
    const items = ["apple", "banana", "carrot"];
    storeMyGroceries(items);
    const storedItemsJson = localStorage.getItem("groceryInventoryItemIds");
    expect(storedItemsJson).toEqual(JSON.stringify(items));
  });

  test("getMyGroceries should return stored items", () => {
    const items = ["apple", "banana", "carrot"];
    localStorage.setItem("groceryInventoryItemIds", JSON.stringify(items));
    const result = getMyGroceries();
    expect(result).toEqual(items);
  });

  test("storeMyGroceries followed by getMyGroceries should return the same items", () => {
    const items = ["apple", "banana", "carrot"];
    storeMyGroceries(items);
    const result = getMyGroceries();
    expect(result).toEqual(items);
  });
});

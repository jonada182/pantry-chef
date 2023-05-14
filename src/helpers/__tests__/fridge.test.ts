import { getMyGroceries, storeMyGroceries } from "../fridge";
import mockLocalStorage from "../../../__mocks__/localStorage";

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
    const items = [{ groceryItemId: "id" }];
    storeMyGroceries(items);
    const storedItemsJson = localStorage.getItem("myGroceryItems");
    expect(storedItemsJson).toEqual(JSON.stringify(items));
  });

  test("getMyGroceries should return stored items", () => {
    const items = [{ groceryItemId: "id" }];
    localStorage.setItem("myGroceryItems", JSON.stringify(items));
    const result = getMyGroceries();
    expect(result).toEqual(items);
  });

  test("storeMyGroceries followed by getMyGroceries should return the same items", () => {
    const items = [{ groceryItemId: "id" }];
    storeMyGroceries(items);
    const result = getMyGroceries();
    expect(result).toEqual(items);
  });
});

import { compareGroceryItems, getItemsByCategorySlug, getMyGroceriesByCategory } from "../groceries";
import { GroceryCategory, GroceryItem } from "../../types";

// Mock data
const groceryItems: GroceryItem[] = [
  { _id: "1", categoryId: "1", slug: "apple", name: "Apple" },
  { _id: "2", categoryId: "1", slug: "banana", name: "Banana" },
  { _id: "3", categoryId: "2",  slug: "carrot", name: "Carrot" },
];

const groceryCategories: GroceryCategory[] = [
  {
    _id: "1",
    slug: "fruits",
    name: "Fruits",
    items: [groceryItems[0], groceryItems[1]],
  },
  {
    _id: "2",
    slug: "vegetables",
    name: "Vegetables",
    items: [groceryItems[2]],
  },
];

describe("Grocery functions", () => {
  test("compareGroceryItems should correctly compare two items", () => {
    expect(compareGroceryItems(groceryItems[0], groceryItems[1])).toBeLessThan(0);
    expect(compareGroceryItems(groceryItems[1], groceryItems[0])).toBeGreaterThan(0);
    expect(compareGroceryItems(groceryItems[1], groceryItems[1])).toEqual(0);
  });

  test("getItemsByCategorySlug should return items from specified categories", () => {
    const result = getItemsByCategorySlug(groceryCategories, ["fruits"], []);
    expect(result).toEqual(groceryCategories[0].items);
  });

  test("getItemsByCategorySlug should return only selected items from specified categories", () => {
    const result = getItemsByCategorySlug(groceryCategories, ["fruits"], ["1"]);
    expect(result).toEqual([groceryItems[0]]);
  });

  test("getItemsByCategorySlug should return an empty array when no categories match", () => {
    const result = getItemsByCategorySlug(groceryCategories, ["nonexistent"], []);
    expect(result).toEqual([]);
  });

  test("getMyGroceriesByCategory should return null when no selected items", () => {
    const result = getMyGroceriesByCategory(groceryCategories, []);
    expect(result).toBeNull();
  });

  test("getMyGroceriesByCategory should return items grouped by category slug", () => {
    const result = getMyGroceriesByCategory(groceryCategories, ["1", "2", "3"]);
    expect(result).toEqual({
      fruits: [groceryItems[0], groceryItems[1]],
      vegetables: [groceryItems[2]],
    });
  });
});

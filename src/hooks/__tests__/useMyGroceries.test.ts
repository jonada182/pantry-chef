import { renderHook, act } from "@testing-library/react";
import { DB } from "../../db";
import { useMyGroceries } from "../useMyGroceries";
import sqlite3 from "sqlite3";

// Helper function to create an in-memory test database
function createTestDB(): DB {
  const dbInstance = new sqlite3.Database(":memory:");
  return new DB(dbInstance);
}

// Create a test database
const db = createTestDB();

describe("useMyGroceries hook", () => {
  test("should add, delete, and retrieve selected items", async () => {
    // Render the hook, passing the test DB instance
    const { result } = renderHook(() => useMyGroceries(db));

    // Test adding an item
    const testItem = { groceryItemId: "test-item-id" };
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

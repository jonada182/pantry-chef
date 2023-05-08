import sqlite3 from "sqlite3";
import { DB } from "./";
import { Recipe, SelectedItem } from "../types";

// Helper function to create an in-memory test database
function createTestDB(): DB {
  const dbInstance = new sqlite3.Database(":memory:");
  return new DB(dbInstance);
}

describe("DB class", () => {

  // Test addRecipe and getAllRecipes methods
  test("addRecipe and getAllRecipes should add and retrieve recipes correctly", async () => {
    const db = createTestDB();
    const testRecipe: Recipe = {
      title: "Test Recipe",
      ingredients: ["item 1", "item 2"],
      instructions: ["Step 1"],
      imageUrl: "https://example.com/image.jpg",
    };

    // Add a recipe to the database
    await db.addRecipe(testRecipe);

    // Get all recipes and verify that the added recipe is present
    const recipes = await db.getAllRecipes();
    const addedRecipe = recipes.find((recipe) => recipe.title === testRecipe.title);
    expect(addedRecipe).toBeDefined();
  });

  // Test addSelectedItem and getAllSelectedItems methods
  test("addSelectedItem and getAllSelectedItems should add and retrieve selected items correctly", async () => {
    const db = createTestDB();
    const testItem: SelectedItem = { groceryItemId: "test-item-id" };

    // Add a selected item to the database
    await db.addSelectedItem(testItem);

    // Get all selected items and verify that the added item is present
    const selectedItems = await db.getAllSelectedItems();
    const addedItem = selectedItems.find((item) => item.groceryItemId === testItem.groceryItemId);
    expect(addedItem).toBeDefined();
  });


  // Test deleteRecipe method
  test("deleteRecipe should remove the specified recipe from the database", async () => {
    const db = createTestDB();
    const testRecipe: Recipe = {
      title: "Test Recipe",
      ingredients: ["item 1", "item 2"],
      instructions: ["Step 1"],
      imageUrl: "https://example.com/image.jpg",
    };

    // Add a recipe to the database
    await db.addRecipe(testRecipe);

    // Get all recipes to find the added recipe's id
    const recipes = await db.getAllRecipes();
    const addedRecipe = recipes.find((recipe) => recipe.title === testRecipe.title);
    expect(addedRecipe).toBeDefined();

    // Delete the added recipe
    if (addedRecipe) {
      await db.deleteRecipe(addedRecipe.id);
    }

    // Verify that the recipe has been deleted
    const updatedRecipes = await db.getAllRecipes();
    const deletedRecipe = updatedRecipes.find((recipe) => recipe.title === testRecipe.title);
    expect(deletedRecipe).toBeUndefined();
  });

  // Test deleteSelectedItem method
  test("deleteSelectedItem should remove the specified selected item from the database", async () => {
    const db = createTestDB();
    const testItem: SelectedItem = { groceryItemId: "test-item-id" };

    // Add a selected item to the database
    await db.addSelectedItem(testItem);

    // Get all selected items to verify the added item
    const selectedItems = await db.getAllSelectedItems();
    const addedItem = selectedItems.find((item) => item.groceryItemId === testItem.groceryItemId);
    expect(addedItem).toBeDefined();

    // Delete the added selected item
    if (addedItem) {
      await db.deleteSelectedItem(addedItem.groceryItemId);
    }

    // Verify that the selected item has been deleted
    const updatedSelectedItems = await db.getAllSelectedItems();
    const deletedItem = updatedSelectedItems.find((item) => item.groceryItemId === testItem.groceryItemId);
    expect(deletedItem).toBeUndefined();
  });
});

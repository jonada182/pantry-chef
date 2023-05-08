import sqlite3 from "sqlite3";
import { MyRecipe, Recipe, SelectedItem } from "../types";

const DB_FILE = "chatbot.sqlite";

interface RecipeRow {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  image_url: string;
}

interface SelectedItemRow {
  grocery_item_id: string;
}

export class DB {

  private db: sqlite3.Database;

  /**
 * Constructs a new DB instance. If a dbInstance is provided, it will be used as the database.
 * Otherwise, a new SQLite database will be created using the default DB_FILE.
 * @param {sqlite3.Database} [dbInstance] - Optional SQLite database instance to use.
 */
  constructor(dbInstance?: sqlite3.Database) {
    this.db = dbInstance || new sqlite3.Database(DB_FILE);
    // this.dropTables();
    this.initializeTables();
  }

  /**
 * Closes the connection for the SQLite database.
 */
  public close() {
    this.db.close();
  }

  /**
 * Initializes the tables for the SQLite database.
 * This method creates 'recipes' and 'selected_items' tables if they don't exist.
 */
  private initializeTables() {
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS recipes (
          id INTEGER PRIMARY KEY,
          title TEXT,
          ingredients TEXT,
          instructions TEXT,
          image_url TEXT
        )
      `);

      this.db.run(`
        CREATE TABLE IF NOT EXISTS selected_items (
          id INTEGER PRIMARY KEY,
          grocery_item_id TEXT
        )
      `);
    });
  }

  /**
   * Drops all the database tables
   */
  private dropTables() {
    this.db.serialize(() => {
      this.db.run(`DROP TABLE IF EXISTS recipes`);
      this.db.run(`DROP TABLE IF EXISTS selected_items`);
    });
  }

  /**
 * Adds a new recipe to the 'recipes' table.
 * @param {MyRecipe} recipe - The recipe to be added.
 * @returns {Promise<void>} - A promise that resolves when the recipe is added.
 */
  public async addRecipe(recipe: Recipe): Promise<void> {
    const { title, ingredients, instructions, imageUrl } = recipe;
    const stmt = this.db.prepare(`
      INSERT INTO recipes (title, ingredients, instructions, image_url)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run([title, JSON.stringify(ingredients), JSON.stringify(instructions), imageUrl], function (err) {
      if (err) {
        throw err;
      }
      stmt.finalize();
    });
  }

  /**
 * Deletes a recipe with the given id from the 'recipes' table.
 * @param {number} id - The id of the recipe to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the recipe is deleted.
 */
  public async deleteRecipe(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.run("DELETE FROM recipes WHERE id = ?", id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
 * Retrieves all recipes from the 'recipes' table.
 * @returns {Promise<MyRecipe[]>} - A promise that resolves to an array of recipes.
 */
  public async getAllRecipes(): Promise<MyRecipe[]> {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM recipes", (err, rows: RecipeRow[]) => {
        if (err) reject(err);
        resolve(
          rows.map(({ id, title, ingredients, instructions, image_url }) => ({
            id,
            title,
            ingredients: JSON.parse(ingredients),
            instructions: JSON.parse(instructions),
            imageUrl: image_url,
          })),
        );
      });
    });
  }

  /**
 * Adds a new selected item to the 'selected_items' table.
 * @param {SelectedItem} item - The selected item to be added.
 * @returns {Promise<void>} - A promise that resolves when the selected item is added.
 */
  public async addSelectedItem(item: SelectedItem): Promise<void> {
    const { groceryItemId } = item;
    const stmt = this.db.prepare(`
      INSERT INTO selected_items (grocery_item_id)
      VALUES (?)
    `);
    stmt.run(groceryItemId, function (err) {
      if (err) {
        throw err;
      }
      stmt.finalize();
    });
  }

  /**
 * Deletes a selected item with the given groceryItemId from the 'selected_items' table.
 * @param {string} groceryItemId - The groceryItemId of the selected item to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the selected item is deleted.
 */
  public async deleteSelectedItem(groceryItemId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.run("DELETE FROM selected_items WHERE grocery_item_id = ?", groceryItemId, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
 * Retrieves all selected items from the 'selected_items' table.
 * @returns {Promise<SelectedItem[]>} - A promise that resolves to an array of selected items.
 */
  public async getAllSelectedItems(): Promise<SelectedItem[]> {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM selected_items", (err, rows: SelectedItemRow[]) => {
        if (err) reject(err);
        resolve(rows.map(row => ({ groceryItemId: row.grocery_item_id })));
      });
    });
  }
}

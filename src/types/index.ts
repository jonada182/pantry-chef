export * from "./groceries";

export interface Ingredient {
  _id: string;
  name: string;
  slug: string;
}
// TODO: Change to UserRecipe
export interface Recipe {
  title?: string;
  ingredients?: string[];
  instructions?: string[];
  imageUrl?: string | null;
}

export interface MyRecipe extends Recipe {
  id: number;
}
// TODO: Change to UserGroceryItem
export interface SelectedItem {
  groceryItemId: string;
}

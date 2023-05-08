export * from "./groceries";

export interface Ingredient {
  _id: string;
  name: string;
  slug: string;
}

export interface Recipe {
  title?: string;
  ingredients?: string[];
  instructions?: string[];
  imageUrl?: string | null;
}

export interface MyRecipe extends Recipe {
  id: number;
}

export interface SelectedItem {
  groceryItemId: string;
}

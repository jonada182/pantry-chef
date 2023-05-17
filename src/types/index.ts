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

export interface UserRecipe extends Recipe {
  _id: string;
}

export interface UserGrocery {
  groceryItemId: string;
}

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
  image_url?: string | null;
}

export interface Ingredient {
  _id: string;
  name: string;
  slug: string;
}

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  imageUrl?: string | null;
}

export interface UserRecipe extends Recipe {
  _id: string;
}

export type RecipeDifficulty = "Simple" | "Moderate" | "Complex";

export const getRecipeDifficulty = (numIngredients: number, numInstructions: number): RecipeDifficulty => {
  if (numIngredients <= 4 && numInstructions <= 8) {
    return "Simple";
  } else if (numIngredients <= 10 && numInstructions <= 10) {
    return "Moderate";
  } else {
    return "Complex";
  }
};

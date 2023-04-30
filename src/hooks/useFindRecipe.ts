import { useState } from "react";
import { api } from "../helpers";
import { testRecipe } from "./testData";
import { MOCK_API } from "../helpers/constants";
import { Recipe } from "../types";

type FindRecipeResponse = {
  loading: boolean;
  recipe: Recipe | null;
  error: Error | null;
  sendIngredients: (ingredients: string[]) => void;
  resetState: () => void;
};

export const useFindRecipe = (): FindRecipeResponse => {

  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const resetState = () => {
    setLoading(false);
    setError(null);
    setRecipe(null);
  };

  const mapResponse = (data: any): Recipe => {
    return {
      title: data?.message?.title,
      ingredients: data?.message?.ingredients,
      instructions: data?.message?.instructions,
      image_url: data?.image_url,
    };
  };

  const mockResponseRecipe = (mockRecipe: any) => {
    setLoading(true);
    setTimeout(() => {
      setRecipe(mapResponse(mockRecipe));
      setLoading(false);
    }, 2000);
  };

  const sendIngredients = async (ingredients: string[]) => {

    const message = `Recipe with: ${ingredients.join(",")}`;
    resetState();

    if (!ingredients || ingredients.length == 0)
      return setError(Error("You need at least one ingredient"));

    if (MOCK_API == "true")
      return mockResponseRecipe(testRecipe);

    setLoading(true);

    try {
      const API = api.init();
      const response = await API.post("chat", { message: message, is_recipe: true });
      setRecipe(mapResponse(response?.data));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }

  };

  return {
    loading: loading,
    recipe: recipe,
    error: error,
    sendIngredients: sendIngredients,
    resetState: resetState,
  };

};

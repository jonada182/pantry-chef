import { useState, useEffect } from "react";
import { Recipe, UserRecipe } from "../types";
import { api, generateFakeId } from "../helpers";
import { APP_USER_ID, MOCK_API } from "../helpers/constants";
import { testUserRecipes } from "./testData";

export function useUserRecipes() {
  const [userRecipes, setUserRecipes] = useState<UserRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const mockResponseRecipe = (mockData: any) => {
    setLoading(true);
    setTimeout(() => {
      setUserRecipes(mapResponseArray(mockData));
      setLoading(false);
    });
  };

  type UserRecipeAPIResponse = {
    _id: string;
    title: string;
    ingredients: string;
    instructions: string;
    image_url: string | null;
  };

  const mapResponseArray = (data: any): UserRecipe[] => {
    return data.map((recipe: UserRecipeAPIResponse) => (mapResponse(recipe)));
  };

  const mapResponse = (recipe: UserRecipeAPIResponse): UserRecipe => {
    if (!recipe?.ingredients)
      throw new Error("No ingredients from this recipe");

    if (!recipe?.instructions)
      throw new Error("No instructions from this recipe");

    return {
      _id: recipe?._id,
      title: recipe?.title,
      ingredients: JSON.parse(recipe?.ingredients),
      instructions: JSON.parse(recipe?.instructions),
      imageUrl: recipe?.image_url,
    };
  };

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (MOCK_API == "true")
        return mockResponseRecipe(testUserRecipes);

      setLoading(true);
      try {
        const API = api.init();
        const response = await API.get(`/user/${ APP_USER_ID }/recipes`);
        setUserRecipes(mapResponseArray(response?.data));
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, []);

  const addUserRecipe = async (newRecipe: Recipe) => {
    if (userRecipes.some(recipe => recipe.title === newRecipe.title))
      return;
    try {
      if (MOCK_API == "true") {
        let fakeRecipe = {
          _id: generateFakeId(),
          title: newRecipe.title,
          ingredients: newRecipe.ingredients,
          instructions: newRecipe.instructions,
          image_url: newRecipe.imageUrl,
        };
        return setUserRecipes([...userRecipes, fakeRecipe]);
      }

      const payload = {
        title: newRecipe.title,
        ingredients: JSON.stringify(newRecipe.ingredients),
        instructions: JSON.stringify(newRecipe.instructions),
        image_url: newRecipe.imageUrl,
      };

      const API = api.init();
      const response = await API.post(`/user/${ APP_USER_ID }/recipes`, payload);
      if (response?.data) {
        try {
          setUserRecipes([...userRecipes, mapResponse(response?.data)]);
        } catch (error) {
          setError(new Error(`Error when parsing response data: ${error}`));
        }
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserRecipe = async (userRecipeId: string) => {
    try {
      if (MOCK_API == "true")
        return setUserRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== userRecipeId));

      const API = api.init();
      const response = await API.delete(`/user/${ APP_USER_ID }/recipes/${ userRecipeId }`);
      if (response)
        setUserRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== userRecipeId));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { userRecipes, addUserRecipe, deleteUserRecipe, loading, error };
}

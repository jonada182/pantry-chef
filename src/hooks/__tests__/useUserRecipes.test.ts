import { renderHook, act, waitFor } from "@testing-library/react";
import { useUserRecipes } from "../useUserRecipes";
import axios from "axios";
import { generateFakeId } from "../../helpers";

jest.mock("../../helpers/constants", () =>({ API_BASE_URL: "http://localhost/api" }));
jest.mock("axios");

describe("useUserRecipes hook", () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should add, delete, and retrieve user recipes", async () => {
    const newRecipeId = generateFakeId();
    const expectedResponse = [{
      _id: "1",
      title: "Chicken and Onion Stir-Fry",
      ingredients: [
        "1 lb chicken breast, sliced into thin strips",
        "2 medium onions, sliced",
        "2 tbsp vegetable oil",
        "2 tbsp soy sauce",
        "1 tbsp cornstarch",
        "1 tsp garlic powder",
        "1/2 tsp black pepper",
      ],
      instructions: [
        "In a small bowl, mix together soy sauce, cornstarch, garlic powder and black pepper. Set aside.",
        "Heat the vegetable oil in a large skillet over medium-high heat. Add the chicken and cook until no longer pink, about 5 minutes.",
        "Add the sliced onions to the skillet and cook until they are softened and slightly caramelized, about 5-7 minutes.",
        "Stir in the soy sauce mixture and continue to cook for an additional 2-3 minutes, or until the sauce has thickened and evenly coated the chicken and onions.",
        "Serve hot and enjoy!",
      ],
      imageUrl: "",
    }];

    const responseData = [{
      _id: expectedResponse[0]._id,
      title: expectedResponse[0].title,
      ingredients: JSON.stringify(expectedResponse[0].ingredients),
      instructions: JSON.stringify(expectedResponse[0].instructions),
      image_url: expectedResponse[0].imageUrl,
    }];

    // new recipe data
    const newRecipe = {
      title: "new recipe",
      ingredients: ["item1", "item2"],
      instructions: ["item1", "item2"],
      imageUrl: "",
    };

    const newRecipePayload = {
      title: newRecipe.title,
      ingredients: JSON.stringify(newRecipe.ingredients),
      instructions: JSON.stringify(newRecipe.instructions),
      image_url: newRecipe.imageUrl,
    };

    const newRecipeResponse = {
      ...newRecipePayload,
      _id: newRecipeId,
    };

    const expectedNewRecipe = {
      ...newRecipe,
      _id: newRecipeId,
    };

    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.get.mockResolvedValueOnce({ data: responseData });
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { message: "saved", data: newRecipeResponse } });
    });
    mockAxios.delete.mockResolvedValueOnce({ data: { message: "deleted" } });

    const { result } = renderHook(() => useUserRecipes({ userId: "test-user" }));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(mockAxios.get).toBeCalledWith(`/user/test-user/recipes`);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.userRecipes).toStrictEqual(expectedResponse);
    });

    await act(async () => {
      await result.current.addUserRecipe(newRecipe);
    });

    expect(mockAxios.post).toBeCalledWith(`/user/test-user/recipes`, newRecipePayload);
    expect(mockAxios.post).toBeCalledTimes(1);

    expect(result.current.loading).toBe(false);

    await waitFor(() => {
      expect(result.current.error).toBeNull();
      // Verify that the item was added
      expect(result.current.userRecipes).toHaveLength(2);
      expect(result.current.userRecipes).toStrictEqual([...expectedResponse, expectedNewRecipe]);
    });

    // Test deleting the item
    await act(async () => {
      await result.current.deleteUserRecipe(newRecipeId);
    });

    expect(mockAxios.delete).toBeCalledWith(`/user/test-user/recipes/${ newRecipeId }`);
    expect(mockAxios.delete).toBeCalledTimes(1);

    expect(result.current.loading).toBe(false);

    await waitFor(() => {
      expect(result.current.error).toBeNull();
      // Verify that the item was deleted
      expect(result.current.userRecipes).toHaveLength(1);
      expect(result.current.userRecipes).toStrictEqual(expectedResponse);
    });
  });
});

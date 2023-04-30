import { useFindRecipe } from "../useFindRecipe";
import axios from "axios";
import { waitFor, renderHook, act } from "@testing-library/react";
import { testRecipe } from "../testData";
import { Recipe } from "../../types";

jest.mock("../../helpers/constants", () =>({ API_BASE_URL: "http://localhost/api" }));

jest.mock("axios");

describe("useFindRecipe", () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const ingredients = ["chicken", "rice"];
  const postRequestMessage = `Recipe with: ${ingredients.join(",")}`;

  it("should send ingredients and return a recipe", async () => {
    const responseData = testRecipe;
    const expectedRecipe: Recipe = {
      title: testRecipe.message.title,
      ingredients: testRecipe.message.ingredients,
      instructions: testRecipe.message.instructions,
      image_url: testRecipe.image_url,
    };
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.post.mockResolvedValueOnce({ data: responseData });

    const { result } = renderHook(() => useFindRecipe());

    act(() => {
      result.current.sendIngredients(ingredients);
    });

    expect(mockAxios.post).toBeCalledWith("chat", { message: postRequestMessage, is_recipe: true });
    expect(mockAxios.post).toBeCalledTimes(1);

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.recipe).toStrictEqual(expectedRecipe);
    });
  });

  it("should send ingredients and return an error", async () => {
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.post.mockImplementation(() => {
      throw Error("new error");
    });

    const { result } = renderHook(() => useFindRecipe());

    act(() => {
      result.current.sendIngredients(ingredients);
    });

    expect(mockAxios.post).toBeCalledWith("chat", { message: postRequestMessage, is_recipe: true });
    expect(mockAxios.post).toBeCalledTimes(1);

    expect(result.current.loading).toBe(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.recipe).toBeNull();
  });

});

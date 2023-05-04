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

  it("should send ingredients and throw an error if invalid response", async () => {
    const responseData = {
      title: "Invalid recipe",
      ingredients: [{ ingredient1: "test" }, { ingredient2: "test" }],
      instructions: [{ instruction1: "test" }],
      image_url: "some image"
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
      expect(result.current.error).toStrictEqual(Error("response data cannot be mapped to Recipe"));
      expect(result.current.recipe).toBeNull();
    });
  });

  it("should send ingredients and return an error", async () => {
    const responseError = Error("new error");
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.post.mockImplementation(() => {
      throw responseError;
    });

    const { result } = renderHook(() => useFindRecipe());

    act(() => {
      result.current.sendIngredients(ingredients);
    });

    expect(mockAxios.post).toBeCalledWith("chat", { message: postRequestMessage, is_recipe: true });
    expect(mockAxios.post).toBeCalledTimes(1);

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(responseError);
    expect(result.current.recipe).toBeNull();
  });

});

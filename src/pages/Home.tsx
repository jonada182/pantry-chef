import React, { useEffect, useState } from "react";
import { Button, Card, GroceryItems, Page, RecipeCard, Toast } from "../components";
import { useGetGroceries, useFindRecipe, useUserGroceries } from "../hooks";
import { getGroupedGroceriesByCategory } from "../helpers";
import { GroceryItem, Ingredient, GroupedGroceries } from "../types";
import { useUserRecipes } from "../hooks/useUserRecipes";

const Home = () => {
  const {
    data: groceriesData,
    loading: groceriesLoading,
    error: groceriesError,
  } = useGetGroceries();
  const {
    userGroceries,
    loading: userGroceriesLoading,
    error: userGroceriesError,
  } = useUserGroceries();
  const {
    error: recipeError,
    loading: recipeLoading,
    recipe,
    sendIngredients,
    resetState: resetRecipeState,
  } = useFindRecipe();
  const { addUserRecipe, loading: userRecipesLoading, error: userRecipesError } = useUserRecipes();
  const error = groceriesError || userGroceriesError || recipeError || userRecipesError;
  const loading = groceriesLoading || userGroceriesLoading || recipeLoading || userRecipesLoading;

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [groupedGroceries, setGroupedGroceries] = useState<GroupedGroceries | null>(null);
  const [recipeIsSaved, setRecipeIsSaved] = useState<boolean>(false);

  useEffect(() => {
    setGroupedGroceries(getGroupedGroceriesByCategory(groceriesData, userGroceries));
  }, [groceriesData]);

  const addIngredient = (item: GroceryItem) => {
    const ingredient: Ingredient = {
      _id: item._id,
      name: item.name,
      slug: item.slug,
    };

    setIngredients(prev => {
      if (!prev.some(i => i._id === ingredient._id)) {
        return [...prev, ingredient];
      }
      return prev.filter(i => i._id !== ingredient._id);
    });

    let thisGroupedGroceries = groupedGroceries;
    for (const key in thisGroupedGroceries) {
      thisGroupedGroceries[key].map(i => {
        if (i._id == item._id)
          i.isSelected = i.isSelected === true ? false : true;
        return i;
      });
    }

    setGroupedGroceries(thisGroupedGroceries);
  };

  const findRecipe = () => {
    sendIngredients(ingredients.flatMap(ingredient => ingredient.slug));
  };

  const saveRecipe = () => {
    if (recipe) {
      addUserRecipe(recipe);
      resetRecipeState();
      setRecipeIsSaved(true);
      setTimeout(() => setRecipeIsSaved(false), 5000);
    }
  };

  return (
    <Page
      title="Welcome"
      description="Find recipes, create grocery lists, and more in one place."
      isLoading={loading}
      error={error}
    >
      { !recipe && (
        <>
          <Card title="Meats" description="Choose one meat from your groceries to start.">
            <GroceryItems groceryItems={groupedGroceries?.meat} handleOnClick={addIngredient}/>
          </Card>
          <Card title="Produce" description="Next, pick some of your produce items.">
            <GroceryItems groceryItems={groupedGroceries?.produce} handleOnClick={addIngredient}/>
          </Card>
          <Card title="Additional Ingredients" description="Select any other ingredients you may want.">
            <GroceryItems groceryItems={groupedGroceries?.additional} handleOnClick={addIngredient}/>
          </Card>
          { recipeIsSaved && (
            <Toast className="mb-4" type="success" message="This recipe was saved successfully!"/>
          )}
          { ingredients.length > 1 && <Button isCentered={true} handleOnClick={() => findRecipe()} text="Find me a recipe"/> }
        </>
      )}
      { recipe && (
        <RecipeCard recipe={recipe} handleOnReset={resetRecipeState} handleOnSave={() => saveRecipe()}/>
      )}
    </Page>
  );
};

export { Home };

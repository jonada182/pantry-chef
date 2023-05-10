import React, { useEffect, useState } from "react";
import { Button, Card, GroceryItems, Page, RecipeCard } from "../components";
import { useGetGroceries, useFindRecipe, useMyGroceries } from "../hooks";
import { getMyGroceriesByCategory } from "../helpers";
import { GroceryItem, Ingredient, MyGroceries } from "../types";

const Home = () => {
  const {
    data: groceriesData,
    loading: groceriesLoading,
    error: groceriesError,
  } = useGetGroceries();
  const {
    selectedItems,
    loading: myGroceriesLoading,
    error: myGroceriesError,
  } = useMyGroceries();
  const {
    error: recipeError,
    loading: recipeLoading,
    recipe,
    sendIngredients,
    resetState: resetRecipeState,
  } = useFindRecipe();
  const error = groceriesError || myGroceriesError || recipeError;
  const loading = groceriesLoading || myGroceriesLoading || recipeLoading;

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [myGroceryItems, setMyGroceryItems] = useState<MyGroceries | null>(null);

  useEffect(() => {
    setMyGroceryItems(getMyGroceriesByCategory(groceriesData, selectedItems));
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

    const myGroceries = myGroceryItems;
    for (const key in myGroceries) {
      myGroceries[key].map(i => {
        if (i._id == item._id)
          i.isSelected = i.isSelected === true ? false : true;
        return i;
      });
    }

    setMyGroceryItems(myGroceries);
  };

  const findRecipe = () => {
    sendIngredients(ingredients.flatMap(ingredient => ingredient.slug));
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
            <GroceryItems groceryItems={myGroceryItems?.meat} handleOnClick={addIngredient}/>
          </Card>
          <Card title="Produce" description="Next, pick some of your produce items.">
            <GroceryItems groceryItems={myGroceryItems?.produce} handleOnClick={addIngredient}/>
          </Card>
          <Card title="Additional Ingredients" description="Select any other ingredients you may want.">
            <GroceryItems groceryItems={myGroceryItems?.additional} handleOnClick={addIngredient}/>
          </Card>
          { ingredients.length > 0 && <Button isCentered={true} handleOnClick={() => findRecipe()} text="Find me a recipe"/> }
        </>
      )}
      { recipe && (
        <RecipeCard recipe={recipe} handleOnClick={resetRecipeState}/>
      )}
    </Page>
  );
};

export { Home };

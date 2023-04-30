import React, { useEffect, useState } from "react";
import { Button, Card, GroceryItems, Page } from "../components";
import { useGetGroceries, useFindRecipe } from "../hooks";
import { getMyGroceries, getMyGroceriesByCategory } from "../helpers";
import { GroceryItem, Ingredient, MyGroceries } from "../types";

const Home = () => {
  const selectedItemIds = getMyGroceries();
  const {
    data: groceriesData,
    loading: groceriesLoading,
    error: groceriesError,
  } = useGetGroceries();
  const {
    error: recipeError,
    loading: recipeLoading,
    recipe,
    sendIngredients,
    resetState: resetRecipeState,
  } = useFindRecipe();
  const error = groceriesError || recipeError;
  const loading = groceriesLoading || recipeLoading;

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [myGroceryItems, setMyGroceryItems] = useState<MyGroceries | null>(null);

  useEffect(() => {
    setMyGroceryItems(getMyGroceriesByCategory(groceriesData, selectedItemIds));
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
          <Card title="Additional Ingredients">
            <GroceryItems groceryItems={myGroceryItems?.additional} handleOnClick={addIngredient}/>
          </Card>
          { ingredients.length > 0 && <Button isCentered={true} handleOnClick={() => findRecipe()} text="Find me a recipe"/> }
        </>
      )}
      { recipe && (
        // TODO: Create a recipe component
        <Card title="Here is your tasty recipe">
          <div className="w-full h-64 relative">
            <img src={recipe?.image_url} alt={recipe?.title} className="absolute inset-0 object-cover object-center w-full h-full" />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white">{recipe?.title}</h1>
              </div>
            </div>
          </div>
          <h3 className="font-bold text-lg">Ingredients</h3>
          <ul>{recipe?.ingredients?.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
          <h3 className="font-bold text-lg">Instructions</h3>
          {recipe?.instructions?.map(instruction => <p>{instruction}</p>)}
          <Button isCentered={true} handleOnClick={() => resetRecipeState()} text="Edit my ingredients"/>
        </Card>
      )}
    </Page>
  );
};

export { Home };

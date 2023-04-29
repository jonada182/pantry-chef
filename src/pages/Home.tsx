import React, { useEffect, useState } from "react";
import { Button, Card, GroceryItems, Page } from "../components";
import { useGetGroceries, useSendMessage } from "../hooks";
import { getMyGroceries, getMyGroceriesByCategory } from "../helpers";
import { GroceryItem, Ingredient, MyGroceries } from "../types";

const Home = () => {
  const selectedItemIds = getMyGroceries();
  const {
    data: groceriesData,
    loading: groceriesLoading,
    error: groceriesError,
  } = useGetGroceries();
  const { error: messageError, loading: messageLoading, responseMessage, sendMessage } = useSendMessage();
  const error = groceriesError || messageError;
  const loading = groceriesLoading || messageLoading;

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [myGroceryItems, setMyGroceryItems] = useState<MyGroceries | null>(null);

  useEffect(() => {
    setMyGroceryItems(getMyGroceriesByCategory(groceriesData, selectedItemIds));
  }, [groceriesData]);

  const addIngredient = (event: React.MouseEvent<HTMLDivElement>, item: GroceryItem) => {
    event.stopPropagation();
    const ingredient: Ingredient = {
      name: item.name,
      slug: item.slug,
    };

    setIngredients(prev => {
      if (!prev.some(i => i.slug === ingredient.slug)) {
        return [...prev, ingredient];
      }
      return prev;
    });

    setMyGroceryItems(myGroceries => {
      for (const key in myGroceries) {
        myGroceries[key].map(i => {
          if (i._id == item._id)
            i.isSelected = !i.isSelected;
          return true;
        });
      }
      return myGroceries;
    });
  };

  const findRecipe = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    sendMessage(`Find me a recipe using: ${ ingredients.flatMap(ingredient => ingredient.slug).join(",")}`);
  };

  return (
    <Page
      title="Welcome"
      description="Find recipes, create grocery lists, and more in one place."
      isLoading={loading}
      error={error}
    >
      { !responseMessage && (
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
          <Button isCentered={true} handleOnClick={(e) => findRecipe(e)} text="Find me a recipe"/>
        </>
      )}
      { responseMessage && <Card title="Your recipe" description={responseMessage} isHTML={true}/>}
    </Page>
  );
};

export { Home };

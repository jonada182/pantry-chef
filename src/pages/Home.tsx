import React, { useEffect, useState } from "react";
import { Button, Card, GroceryItems, Page } from "../components";
import { useGetGroceries, useSendMessage } from "../hooks";
import { getMyGroceries } from "../helpers";
import { getItemsByCategorySlug } from "../helpers";
import { GroceryItem, Ingredient } from "../types";

const Home = () => {
  const { data: groceries, loading: groceriesLoading, error: groceriesError } = useGetGroceries();
  const { error: messageError, isLoading: messageLoading, responseMessage, sendMessage } = useSendMessage();
  const error = groceriesError || messageError;
  const loading = groceriesLoading || messageLoading;

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const selectedItemIds = getMyGroceries();

  const [myMeats, setMyMeats] = useState<GroceryItem[]>([]);
  const [myProduce, setMyProduce] = useState<GroceryItem[]>([]);
  const [myAdditionalItems, setMyAdditionalItems] = useState<GroceryItem[]>([]);

  useEffect(() => {
    setMyMeats(getItemsByCategorySlug(groceries, ["meat"], selectedItemIds));
    setMyProduce(getItemsByCategorySlug(groceries, ["produce"], selectedItemIds));
    setMyAdditionalItems(getItemsByCategorySlug(groceries, ["pantry", "bakery"], selectedItemIds));
  }, [groceries]);

  const changeItemStatus = (items: GroceryItem[], item: GroceryItem) => {
    return items.map(i => {
      if (i._id == item._id) {
        return {
          ...i, isSelected: !i.isSelected,
        };
      }
      return i;
    });
  };

  const addIngredient = (event: React.MouseEvent<HTMLDivElement>, item: GroceryItem, category = "") => {
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

    switch (category) {
      case "meats":
        setMyMeats(changeItemStatus(myMeats, item));
        break;
      case "produce":
        setMyProduce(changeItemStatus(myProduce, item));
        break;

      default:
        setMyAdditionalItems(changeItemStatus(myAdditionalItems, item));
        break;
    }
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
            <GroceryItems groceryItems={myMeats} handleOnClick={(e, item) => addIngredient(e, item, "meats")}/>
          </Card>
          <Card title="Produce" description="Next, pick some of your produce items.">
            <GroceryItems groceryItems={myProduce} handleOnClick={(e, item) => addIngredient(e, item, "produce")}/>
          </Card>
          <Card title="Additional Ingredients">
            <GroceryItems groceryItems={myAdditionalItems} handleOnClick={(e, item) => addIngredient(e, item)}/>
          </Card>
          <Button isCentered={true} handleOnClick={(e) => findRecipe(e)} text="Find me a recipe"/>
        </>
      )}
      { responseMessage && <Card title="Your recipe" description={responseMessage} isHTML={true}/>}
    </Page>
  );
};

export { Home };

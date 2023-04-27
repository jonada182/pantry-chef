import React from "react";
import { Button, Card, GroceryItems, Page } from "../components";
import { useGetGroceries } from "../hooks";
import { getMyGroceries } from "../helpers";
import { getItemsByCategorySlug } from "../helpers";

const Home = () => {
  const [groceries, loading, error] = useGetGroceries();
  const selectedItemIds = getMyGroceries();

  const myMeats = getItemsByCategorySlug(groceries, ["meat"], selectedItemIds);
  const myProduce = getItemsByCategorySlug(groceries, ["produce"], selectedItemIds);
  const myAdditionalItems = getItemsByCategorySlug(groceries, ["pantry", "bakery"], selectedItemIds);

  return (
    <Page
      title="Welcome"
      description="Find recipes, create grocery lists, and more in one place."
      isLoading={loading}
      error={error}
    >
      <Card>
        <GroceryItems groceryItems={myMeats}/>
      </Card>
      <Card>
        <GroceryItems groceryItems={myProduce}/>
      </Card>
      <Card>
        <GroceryItems groceryItems={myAdditionalItems}/>
      </Card>
      <Button isLoading={true} isCentered={true} handleOnClick={() => console.log("Find recipe")} text="Find me a recipe"/>
    </Page>
  );
};

export { Home };

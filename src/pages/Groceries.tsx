import React from "react";
import { Page, GroceryList, PageHeading } from "../components";

const Groceries = () => {
  return (
    <Page>
      <PageHeading
        title="Groceries"
        description="Select the food items you have in your fridge to help you plan your next meal"
      />
      <GroceryList/>
    </Page>
  );
};

export { Groceries };

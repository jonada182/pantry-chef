import React from "react";
import { FlexCol, GroceryList, PageHeading } from "../components";

const Groceries = () => {
  return (
    <FlexCol>
      <PageHeading
        title="Groceries"
        description="Select the food items you have in your fridge to help you plan your next meal"
      />
      <GroceryList/>
    </FlexCol>
  );
};

export { Groceries };

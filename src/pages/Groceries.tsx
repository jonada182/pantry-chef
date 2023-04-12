import React from "react";
import { FlexCol, PageHeading } from "../components";

const Groceries = () => {
  return (
    <FlexCol>
      <PageHeading
        title="Groceries"
        description="Select the food items you have in your fridge to help you plan your next meal"
      />
    </FlexCol>
  );
};

export { Groceries };

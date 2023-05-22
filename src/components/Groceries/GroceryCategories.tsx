import React from "react";
import { GroceryCategory } from "../../types";
import { GroceryCategoryCard } from ".";

type Props = {
  groceries: GroceryCategory[] | null;
  handleOnClick: (category: GroceryCategory) => void;
};

export const GroceryCategories = ({ groceries, handleOnClick }: Props) => {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2">
      {groceries &&
        groceries.map((category: GroceryCategory) => (
          <GroceryCategoryCard key={category._id} category={category} handleOnClick={() => handleOnClick(category)} />
        ))}
    </div>
  );
};

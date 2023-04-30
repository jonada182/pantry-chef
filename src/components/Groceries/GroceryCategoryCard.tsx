import React from "react";
import { FlexCol } from "../FlexCol";
import { GroceryCategory } from "../../types";
import { GroceryCategoryIcon } from ".";

type Props = {
  category: GroceryCategory;
  handleOnClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const GroceryCategoryCard = ({ category, handleOnClick }: Props) => {
  return (
    <div onClick={(e) => handleOnClick(e)}>
      <FlexCol
        className="p-4 bg-gray-200 rounded cursor-pointer hover:bg-gray-100"
      >
        <FlexCol gap={2} className="items-center justify-center">
          <GroceryCategoryIcon categorySlug={category.slug}/>
          <h2 className="font-bold text-lg">{category.name}</h2>
        </FlexCol>
      </FlexCol>
    </div>
  );
};

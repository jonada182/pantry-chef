import React from "react";
import { FlexCol } from "../FlexCol";
import { GroceryCategory } from "../../types";

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
          <div className="w-12 h-12">
            <img src={`/src/assets/img/categories/${ category.slug }.png`} alt="icon" className="w-full h-full object-contain"/>
          </div>
          <h2 className="font-bold text-lg">{category.name}</h2>
        </FlexCol>
      </FlexCol>
    </div>
  );
};

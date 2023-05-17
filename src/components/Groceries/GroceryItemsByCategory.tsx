import React from "react";
import { Chip } from "..";
import { compareGroceryItems } from "../../helpers";
import { GroceryCategory, GroceryItem, UserGrocery } from "../../types";

type Props = {
  selectedCategory?: GroceryCategory | null;
  userGroceries?: UserGrocery[];
  handleOnClick: (item: UserGrocery, action: "add" | "remove") => void;
};

export const GroceryItemsByCategory = ({ selectedCategory, userGroceries, handleOnClick }: Props) => {
  return (
    <div className="my-2 max-h-96 overflow-y-auto">
      {selectedCategory?.items?.sort(compareGroceryItems).map((item: GroceryItem) => {
        // Not very performance efficient. May need some refactoring
        const isUserGrocery: boolean = userGroceries?.some(sItem => sItem.groceryItemId === item._id) ? true : false;
        const action = isUserGrocery ? "remove" : "add";
        return <Chip
          key={item._id}
          name={item.name}
          isSelected={isUserGrocery}
          handleOnClick={() => handleOnClick({ groceryItemId: item._id }, action)}
        />;
      })}
    </div>
  );
};

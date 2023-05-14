import React from "react";
import { Chip } from "..";
import { compareGroceryItems } from "../../helpers";
import { GroceryCategory, GroceryItem, SelectedItem } from "../../types";

type Props = {
  selectedCategory?: GroceryCategory | null;
  selectedItems?: SelectedItem[];
  handleOnClick: (item: SelectedItem, action: "add" | "remove") => void;
};

export const GroceryItemsByCategory = ({ selectedCategory, selectedItems, handleOnClick }: Props) => {
  return (
    <div className="my-2 max-h-96 overflow-y-auto">
      {selectedCategory?.items?.sort(compareGroceryItems).map((item: GroceryItem) => {
        // Not very performance efficient. May need some refactoring
        const isSelectedItem: boolean = selectedItems?.some(sItem => sItem.groceryItemId === item._id) ? true : false;
        const action = isSelectedItem ? "remove" : "add";
        return <Chip
          key={item._id}
          name={item.name}
          isSelected={isSelectedItem}
          handleOnClick={() => handleOnClick({ groceryItemId: item._id }, action)}
        />;
      })}
    </div>
  );
};

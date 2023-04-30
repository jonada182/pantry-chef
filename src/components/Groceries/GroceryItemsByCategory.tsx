import React from "react";
import { Chip } from "..";
import { compareGroceryItems } from "../../helpers";
import { GroceryCategory, GroceryItem } from "../../types";

type Props = {
  selectedCategory?: GroceryCategory | null;
  selectedItemIds?: string[];
  handleOnClick: (id: string, action: "add" | "remove") => void;
};

export const GroceryItemsByCategory = ({ selectedCategory, selectedItemIds, handleOnClick }: Props) => {
  return (
    <div className="my-2 max-h-96 overflow-y-auto">
      {selectedCategory?.items?.sort(compareGroceryItems).map((item: GroceryItem) => {
        // Not very performance efficient. May need some refactoring
        const isSelectedItem: boolean = selectedItemIds && selectedItemIds.indexOf(item._id) < 0 ? false : true;
        const action = isSelectedItem ? "remove" : "add";
        return <Chip
          key={item._id}
          name={item.name}
          isSelected={isSelectedItem}
          handleOnClick={() => handleOnClick(item._id, action)}
        />;
      })}
    </div>
  );
};

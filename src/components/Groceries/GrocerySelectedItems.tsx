import React from "react";
import { GroceryCategory, GroceryItem, SelectedItem } from "../../types";
import { Chip, FlexCol, FlexRow } from "..";
import { compareGroceryItems } from "../../helpers";

type Props = {
  groceries: GroceryCategory[] | null;
  selectedItems: SelectedItem[];
  handleOnClick: (item: SelectedItem, action: "add" | "remove") => void;
};

export const GrocerySelectedItems = ({ groceries, selectedItems, handleOnClick }: Props) => {

  if (!groceries || groceries?.length == 0)
    return <div className="text-sm text-primary-text">No groceries available</div>;

  const renderSelectedItems = () => {
    const allItems = groceries?.flatMap((category: GroceryCategory) => category.items);
    const filteredItems = allItems?.filter((item: GroceryItem) => (
      selectedItems.some((sItem: SelectedItem) => sItem.groceryItemId === item._id)
    ));
    return filteredItems?.sort(compareGroceryItems).map((item) => (
      <Chip key={item._id} name={item.name} handleOnClick={() => handleOnClick({ groceryItemId: item._id }, "remove")} />
    ));
  };

  if (selectedItems && selectedItems.length > 0) {
    return (
      <FlexCol className="w-full my-4">
        <h3 className="">Your selected Items</h3>
        <FlexRow className="my-2 items-center content-center flex-wrap">
          {renderSelectedItems()}
        </FlexRow>
      </FlexCol>
    );
  }

  return <></>;
};

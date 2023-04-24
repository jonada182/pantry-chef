import React from "react";
import { GroceryCategory, GroceryItem } from "../../types";
import { Chip, FlexCol, FlexRow } from "..";
import { compareGroceryItems } from "../../helpers";

type Props = {
  groceries: GroceryCategory[] | null;
  selectedItemIds: string[];
  handleOnClick: (event: React.MouseEvent<HTMLDivElement>, id: string, action: "add" | "remove") => void;
};

export const GrocerySelectedItems = ({ groceries, selectedItemIds, handleOnClick }: Props) => {

  const renderSelectedItems = () => {
    const allItems = groceries?.flatMap((category: GroceryCategory) => category.items);
    const selectedItems = allItems?.filter((item: GroceryItem) => ( selectedItemIds.indexOf(item._id) >= 0));
    return selectedItems?.sort(compareGroceryItems).map((item) => (
      <Chip key={item._id} name={item.name} handleOnClick={(e) => handleOnClick(e, item._id, "remove")} />
    ));
  };

  if (selectedItemIds.length > 0)
    return (
      <FlexCol className="w-full my-4">
        <h3 className="">Your selected Items</h3>
        <FlexRow className="my-2 items-center content-center flex-wrap">
          {renderSelectedItems()}
        </FlexRow>
      </FlexCol>
    );
  return <></>;
};

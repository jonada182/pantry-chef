import React from "react";
import { GroceryItem } from "../../types";
import { Chip, FlexCol, FlexRow } from "..";
import { compareGroceryItems } from "../../helpers";

type Props = {
  groceryItems: GroceryItem[] | null;
  handleOnClick?: (event: React.MouseEvent<HTMLDivElement>, item: GroceryItem) => void;
};

export const GroceryItems = ({ groceryItems, handleOnClick }: Props) => {

  const renderSelectedItems = () => {
    return groceryItems?.sort(compareGroceryItems).map((item) => (
      <Chip key={item._id} name={item.name} handleOnClick={(e) => handleOnClick && handleOnClick(e, item)} />
    ));
  };

  return (
    <FlexCol className="w-full my-4">
      <h3 className="">Your selected Items</h3>
      <FlexRow className="my-2 items-center content-center flex-wrap">
        {renderSelectedItems()}
      </FlexRow>
    </FlexCol>
  );
};

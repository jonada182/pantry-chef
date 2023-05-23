import React from "react";
import { GroceryCategory, GroceryItem, UserGrocery } from "../../types";
import { Chip, FlexCol, FlexRow, Toast } from "..";
import { compareGroceryItems } from "../../helpers";

type Props = {
  groceries: GroceryCategory[] | null;
  userGroceries: UserGrocery[];
  handleOnClick: (item: UserGrocery, action: "add" | "remove") => void;
};

export const GrocerySelectedItems = ({ groceries, userGroceries, handleOnClick }: Props) => {

  if (!groceries || groceries?.length == 0)
    return <Toast type="neutral" message="No groceries available." />;

  const renderUserGroceries = () => {
    const allItems = groceries?.flatMap((category: GroceryCategory) => category.items);
    const filteredItems = allItems?.filter((item: GroceryItem) => (
      userGroceries.some((sItem: UserGrocery) => sItem.groceryItemId === item._id)
    ));
    return filteredItems?.sort(compareGroceryItems).map((item) => (
      <Chip key={item._id} name={item.name} handleOnClick={() => handleOnClick({ groceryItemId: item._id }, "remove")} />
    ));
  };

  if (userGroceries && userGroceries.length > 0) {
    return (
      <FlexCol className="w-full">
        <h3 className="">Your selected Items</h3>
        <FlexRow className="my-2 items-center content-center flex-wrap">
          {renderUserGroceries()}
        </FlexRow>
      </FlexCol>
    );
  }

  return <></>;
};

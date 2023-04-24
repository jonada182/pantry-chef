import { GroceryItem } from "../types";

export const compareGroceryItems = (a: GroceryItem, b:GroceryItem) => {
  if (a.slug < b.slug)
    return -1;
  if (a.slug > b.slug)
    return 1;
  return 0;
};

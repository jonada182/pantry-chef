// This set of functions store and retrieve an array of ids (string) in localStorage
// This should eventually become a custom hook that uses local/remote database

import { SelectedItem } from "../types";

export const getMyGroceries = (): SelectedItem[] => {
  const storedSelectedItemsJson = localStorage.getItem("myGroceryItems");
  const storedSelectedItems: SelectedItem[] = storedSelectedItemsJson ? JSON.parse(storedSelectedItemsJson) : [];
  return storedSelectedItems;
};

export const storeMyGroceries = (items: SelectedItem[]) => {
  if (items && items.length > 0)
    localStorage.setItem("myGroceryItems", JSON.stringify(items));
};

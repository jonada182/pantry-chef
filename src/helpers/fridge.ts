// This set of functions store and retrieve an array of ids (string) in localStorage
// This should eventually become a custom hook that uses local/remote database

import { UserGrocery } from "../types";

export const getMyGroceries = (): UserGrocery[] => {
  const storedUserGroceriesJson = localStorage.getItem("myGroceryItems");
  const storedUserGroceries: UserGrocery[] = storedUserGroceriesJson ? JSON.parse(storedUserGroceriesJson) : [];
  return storedUserGroceries;
};

export const storeMyGroceries = (items: UserGrocery[]) => {
  if (items && items.length > 0)
    localStorage.setItem("myGroceryItems", JSON.stringify(items));
};

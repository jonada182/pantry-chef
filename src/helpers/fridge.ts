// This set of functions store and retrieve an array of ids (string) in localStorage
// This should eventually become a custom hook that uses local/remote database

export const getMyGroceries = (): string[] => {
  const storedSelectedItemsJson = localStorage.getItem("groceryInventoryItemIds");
  const storedSelectedItems: string[] = storedSelectedItemsJson ? JSON.parse(storedSelectedItemsJson) : [];
  return storedSelectedItems;
};

export const storeMyGroceries = (items: string[]) => {
  localStorage.setItem("groceryInventoryItemIds", JSON.stringify(items));
};

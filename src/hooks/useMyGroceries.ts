import { useState, useEffect } from "react";
import { SelectedItem } from "../types";
import { getMyGroceries, storeMyGroceries } from "../helpers";

export function useMyGroceries() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSelectedItems = async () => {
      try {
        const items = getMyGroceries();
        setSelectedItems(items);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedItems();
  }, []);

  useEffect(() => {
    storeMyGroceries(selectedItems);
  }, [selectedItems]);

  const addSelectedItem = async (newItem: SelectedItem) => {
    if (selectedItems.some(item => item.groceryItemId === newItem.groceryItemId))
      return;
    try {
      // await db.addSelectedItem(item);
      setSelectedItems([...selectedItems, newItem]);
    } catch (err: any) {
      setError(err);
    }
  };

  const deleteSelectedItem = async (groceryItemId: string) => {
    try {
      // await db.deleteSelectedItem(groceryItemId);
      setSelectedItems((prevItems) => prevItems.filter((item) => item.groceryItemId !== groceryItemId));
    } catch (err: any) {
      setError(err);
    }
  };

  return { selectedItems, addSelectedItem, deleteSelectedItem, loading, error };
}

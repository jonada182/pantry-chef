import { useState, useEffect } from "react";
import { DB } from "../db";
import { SelectedItem } from "../types";

export function useMyGroceries(db: DB) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSelectedItems = async () => {
      try {
        const items = await db.getAllSelectedItems();
        setSelectedItems(items);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedItems();
  }, []);

  const addSelectedItem = async (item: SelectedItem) => {
    try {
      await db.addSelectedItem(item);
      setSelectedItems((prevItems) => [...prevItems, item]);
    } catch (err: any) {
      setError(err);
    }
  };

  const deleteSelectedItem = async (groceryItemId: string) => {
    try {
      await db.deleteSelectedItem(groceryItemId);
      setSelectedItems((prevItems) => prevItems.filter((item) => item.groceryItemId !== groceryItemId));
    } catch (err: any) {
      setError(err);
    }
  };

  return { selectedItems, addSelectedItem, deleteSelectedItem, loading, error };
}

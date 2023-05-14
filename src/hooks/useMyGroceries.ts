import { useState, useEffect } from "react";
import { SelectedItem } from "../types";
import { api } from "../helpers";
import { APP_USER_ID } from "../helpers/constants";

export function useMyGroceries() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);



  const mapResponse = (data: any): SelectedItem[] => {
    return data.map((item: any) => ({ groceryItemId: item.grocery_item_id }));
  };

  useEffect(() => {
    const fetchSelectedItems = async () => {
      setLoading(true);
      try {
        const API = api.init();
        const response = await API.get(`/user/${ APP_USER_ID }/groceries`);
        setSelectedItems(mapResponse(response?.data));
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedItems();
  }, []);

  const addSelectedItem = async (newItem: SelectedItem) => {
    if (selectedItems.some(item => item.groceryItemId === newItem.groceryItemId))
      return;
    try {
      const API = api.init();
      const response = await API.post(`/user/${ APP_USER_ID }/groceries/${ newItem.groceryItemId }`);
      if (response)
        setSelectedItems([...selectedItems, newItem]);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSelectedItem = async (groceryItemId: string) => {
    try {
      const API = api.init();
      const response = await API.delete(`/user/${ APP_USER_ID }/groceries/${ groceryItemId }`);
      if (response)
        setSelectedItems((prevItems) => prevItems.filter((item) => item.groceryItemId !== groceryItemId));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { selectedItems, addSelectedItem, deleteSelectedItem, loading, error };
}

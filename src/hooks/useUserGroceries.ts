import { useState, useEffect } from "react";
import { UserGrocery } from "../types";
import { api } from "../helpers";
import { APP_USER_ID, MOCK_API } from "../helpers/constants";
import { testUserGroceries } from "./testData";

export function useUserGroceries() {
  const [userGroceries, setUserGroceries] = useState<UserGrocery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const mockResponseRecipe = (mockData: any) => {
    setLoading(true);
    setTimeout(() => {
      setUserGroceries(mapResponse(mockData));
      setLoading(false);
    });
  };

  const mapResponse = (data: any): UserGrocery[] => {
    return data.map((item: any) => ({ groceryItemId: item.grocery_item_id }));
  };

  useEffect(() => {
    const fetchUserGroceries = async () => {
      if (MOCK_API == "true")
        return mockResponseRecipe(testUserGroceries);

      setLoading(true);
      try {
        const API = api.init();
        const response = await API.get(`/user/${ APP_USER_ID }/groceries`);
        setUserGroceries(mapResponse(response?.data));
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGroceries();
  }, []);

  const addUserGrocery = async (newItem: UserGrocery) => {
    if (userGroceries.some(item => item.groceryItemId === newItem.groceryItemId))
      return;
    try {
      if (MOCK_API == "true")
        return setUserGroceries([...userGroceries, newItem]);

      const API = api.init();
      const response = await API.post(`/user/${ APP_USER_ID }/groceries/${ newItem.groceryItemId }`);
      if (response)
        setUserGroceries([...userGroceries, newItem]);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserGrocery = async (groceryItemId: string) => {
    try {
      if (MOCK_API == "true")
        return setUserGroceries((prevItems) => prevItems.filter((item) => item.groceryItemId !== groceryItemId));

      const API = api.init();
      const response = await API.delete(`/user/${ APP_USER_ID }/groceries/${ groceryItemId }`);
      if (response)
        setUserGroceries((prevItems) => prevItems.filter((item) => item.groceryItemId !== groceryItemId));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { userGroceries, addUserGrocery, deleteUserGrocery, loading, error };
}

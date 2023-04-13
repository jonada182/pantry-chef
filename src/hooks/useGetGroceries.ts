import { useState, useEffect } from "react";
import { GroceryCategory } from "../types";
import { api } from "../helpers";

export const useGetGroceries = (): [GroceryCategory[] | null, boolean, Error | null] => {
  const [data, setData] = useState<GroceryCategory[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const API = api.init();
  const getGroceries = async () => {
    try {
      const response = await API.get<GroceryCategory[]>("groceries").catch((res) => {
        throw new Error(`An error occurred: ${res.message}`);
      });
      setData(response?.data);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGroceries();
  }, []);

  return [data, loading, error];
};

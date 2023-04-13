import React from "react";
import { useGetGroceries } from "../hooks/useGetGroceries";
import { GroceryCategory, GroceryItem } from "../types";

const GroceryList = () => {
  const [groceries, loading, error] = useGetGroceries();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex mx-2">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groceries &&
          groceries.map((category: GroceryCategory) => (
            <div className="p-4 bg-gray-100 border-gray-400 border-x border-y border-solid rounded" key={category._id}>
              <h2 className="font-bold text-xl">{category.name}</h2>
              <ul className="space-y-2">
                {category?.items?.map((item: GroceryItem) => (
                  <li
                    key={item._id}
                    className="inline-block bg-gray-600 text-white text-xs px-3 py-1 rounded-full mr-1"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export { GroceryList };

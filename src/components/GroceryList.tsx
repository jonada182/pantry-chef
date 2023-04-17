import React from "react";
import { useGetGroceries } from "../hooks/useGetGroceries";
import { GroceryCategory, GroceryItem } from "../types";
import { Button } from "./Button";

const GroceryList = () => {
  const [groceries, loading, error] = useGetGroceries();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex mx-2">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {groceries &&
          groceries.map((category: GroceryCategory) => (
            <div className="p-4 bg-gray-200 rounded flex flex-col cursor-pointer hover:bg-gray-100" key={category._id}>
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16">
                  <img src={`/src/assets/img/categories/${ category.slug }.png`} alt="icon" className="w-full h-full object-contain"/>
                </div>
                <h2 className="font-bold text-lg my-2">{category.name}</h2>
                <Button isSmall={true} text="View Products" handleOnClick={() => console.log("clicked")} />
              </div>
              <ul className="space-y-2 hidden">
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

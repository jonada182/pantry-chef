import React, { useState } from "react";
import { useGetGroceries } from "../hooks/useGetGroceries";
import { GroceryCategory, GroceryItem } from "../types";
import { Modal } from ".";

const GroceryList = () => {
  const [groceries, loading, error] = useGetGroceries();

  const [selectedCategory, setSelectedCategory] = useState<GroceryCategory | null>(null);
  const [selectedItems, setSelectedItems] = useState<GroceryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (category: GroceryCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addItem = (item: GroceryItem) => {
    setSelectedItems((prevItems) => {
      if (!prevItems.includes(item)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeItem = (item: GroceryItem) => {
    setSelectedItems((prevItems) => prevItems.filter((selectedItem) => selectedItem != item));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col mx-2">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {groceries &&
          groceries.map((category: GroceryCategory) => (
            <div
              className="p-4 bg-gray-200 rounded flex flex-col cursor-pointer hover:bg-gray-100"
              key={category._id}
              onClick={() => openModal(category)}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16">
                  <img src={`/src/assets/img/categories/${ category.slug }.png`} alt="icon" className="w-full h-full object-contain"/>
                </div>
                <h2 className="font-bold text-lg my-2">{category.name}</h2>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full my-2 flex flex-col bg-gray-200">
        <h3>Selected Items</h3>
        <div>
          <ul className="space-y-2">
            {selectedItems?.map((item: GroceryItem) => (
              <li
                key={item._id}
                className="inline-block bg-gray-600 text-white text-xs px-3 py-1 rounded-full mr-1"
                onClick={() => removeItem(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal show={isModalOpen} onClose={closeModal} title={selectedCategory?.name}>
        <p className="text-gray-700">
          This is a reusable modal with dynamic content using React, TypeScript, and Tailwind CSS.
        </p>
        <ul className="space-y-2">
          {selectedCategory?.items?.map((item: GroceryItem) => (
            <li
              key={item._id}
              className="inline-block bg-gray-600 text-white text-xs px-3 py-1 rounded-full mr-1"
              onClick={() => addItem(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export { GroceryList };

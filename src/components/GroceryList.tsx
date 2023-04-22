import React, { useState } from "react";
import { useGetGroceries } from "../hooks/useGetGroceries";
import { GroceryCategory, GroceryItem } from "../types";
import { Chip, Modal } from ".";

export const GroceryList = () => {
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

  const addItem = (event: React.MouseEvent, item: GroceryItem) => {
    setSelectedItems((prevItems) => {
      if (!prevItems.includes(item)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeItem = (event: React.MouseEvent, item: GroceryItem) => {
    event.stopPropagation();
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
      { selectedItems.length > 0 && (
        <div className="w-full my-2 flex flex-col bg-gray-200 p-4">
          <h3 className="text-lg">Your selected Items</h3>
          <div className="space-y-2">
            {selectedItems?.map((item: GroceryItem) => (
              <Chip key={item._id} name={item.name} handleOnClick={(e) => removeItem(e, item)} />
            ))}
          </div>
        </div>
      )}
      <Modal show={isModalOpen} onClose={closeModal} title={selectedCategory?.name}>
        <p className="text-gray-700 mb-4">
          Please select all of the products that you currently own
        </p>
        <div className="my-2 max-h-96 overflow-y-auto">
          {selectedCategory?.items?.map((item: GroceryItem) => (
            <Chip key={item._id} name={item.name} handleOnClick={(e) => addItem(e, item)} />
          ))}
        </div>
      </Modal>
    </div>
  );
};

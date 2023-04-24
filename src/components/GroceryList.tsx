import React, { useEffect, useState } from "react";
import { useGetGroceries } from "../hooks/useGetGroceries";
import { GroceryCategory, GroceryItem } from "../types";
import { Chip, FlexCol, GroceryCategoryCard, Modal } from ".";
import { GrocerySelectedItems } from "./Groceries/GrocerySelectedItems";
import { compareGroceryItems } from "../helpers";

export const GroceryList = () => {
  const [groceries, loading, error] = useGetGroceries();

  const [selectedCategory, setSelectedCategory] = useState<GroceryCategory | null>(null);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(() => {
    // Retrieve selectedItems from localStorage
    const storedSelectedItemsJson = localStorage.getItem("groceryInventoryItemIds");
    const storedSelectedItems: string[] = storedSelectedItemsJson ? JSON.parse(storedSelectedItemsJson) : [];
    return storedSelectedItems;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Save selectedItems to localStorage
    localStorage.setItem("groceryInventoryItemIds", JSON.stringify(selectedItemIds));
  }, [selectedItemIds]);


  const openModal = (category: GroceryCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChipClick = (event: React.MouseEvent, itemId: string, action: "add" | "remove") => {
    event.stopPropagation();

    if (action === "add") {
      setSelectedItemIds((prevItems) => {
        if (!prevItems.includes(itemId)) {
          return [...prevItems, itemId];
        }
        return prevItems;
      });
    }

    if (action === "remove") {
      setSelectedItemIds((prevItems) => prevItems.filter((selectedItemId) => selectedItemId != itemId));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <FlexCol>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {groceries &&
          groceries.map((category: GroceryCategory) => (
            <GroceryCategoryCard key={category._id} category={category} handleOnClick={() => openModal(category)} />
          ))}
      </div>
      <GrocerySelectedItems
        groceries={groceries}
        selectedItemIds={selectedItemIds}
        handleOnClick={handleChipClick}
      />
      <Modal
        show={isModalOpen}
        onClose={closeModal}
        title={selectedCategory?.name}
        description="Please select the items you have at home from the list below to update your inventory.">
        <div className="my-2 max-h-96 overflow-y-auto">
          {selectedCategory?.items?.sort(compareGroceryItems).map((item: GroceryItem) => {
            // Not very performance efficient. May need some refactoring
            const isSelectedItem: boolean = selectedItemIds.indexOf(item._id) < 0 ? false : true;
            const action = isSelectedItem ? "remove" : "add";
            return <Chip key={item._id} name={item.name} isSelected={isSelectedItem} handleOnClick={(e) => handleChipClick(e, item._id, action)} />;
          })}
        </div>
      </Modal>
    </FlexCol>
  );
};

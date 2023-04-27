import React, { useEffect, useState } from "react";
import { useGetGroceries } from "../hooks/useGetGroceries";
import { GroceryCategory } from "../types";
import { Page,
  FlexCol,
  GroceryCategories,
  GrocerySelectedItems,
  Modal,
  GroceryItemsByCategory } from "../components";
import { getMyGroceries, storeMyGroceries } from "../helpers";

const Groceries = () => {
  const [groceries, loading, error] = useGetGroceries();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GroceryCategory | null>(null);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(getMyGroceries);

  useEffect(() => {
    storeMyGroceries(selectedItemIds);
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

  return (
    <Page
      title="Groceries"
      description="Select the food items you have in your fridge to help you plan your next meal"
      isLoading={loading}
      error={error}
    >
      <FlexCol>
        <GroceryCategories groceries={groceries} handleOnClick={openModal} />
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
            <GroceryItemsByCategory
              selectedCategory={selectedCategory}
              selectedItemIds={selectedItemIds}
              handleOnClick={handleChipClick}
            />
        </Modal>
      </FlexCol>
    </Page>
  );
};

export { Groceries };

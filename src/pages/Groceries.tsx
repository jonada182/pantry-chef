import React, { useState } from "react";
import { useGetGroceries } from "../hooks/useGetGroceries";
import { GroceryCategory, SelectedItem } from "../types";
import { Page,
  FlexCol,
  GroceryCategories,
  GrocerySelectedItems,
  Modal,
  GroceryItemsByCategory } from "../components";
import { useMyGroceries } from "../hooks/useMyGroceries";

const Groceries = () => {
  const { data: allGroceries, loading: groceriesLoading, error: groceriesError } = useGetGroceries();
  const {
    selectedItems,
    addSelectedItem,
    deleteSelectedItem,
    loading: myGroceriesLoading,
    error: myGroceriesError,
  } = useMyGroceries();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GroceryCategory | null>(null);
  const loading = groceriesLoading || myGroceriesLoading;
  const error = groceriesError || myGroceriesError;

  const openModal = (category: GroceryCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChipClick = (item: SelectedItem, action: "add" | "remove") => {
    if (action === "add") {
      addSelectedItem(item);
    }

    if (action === "remove") {
      deleteSelectedItem(item.groceryItemId);
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
        <GroceryCategories groceries={allGroceries} handleOnClick={openModal} />
        <GrocerySelectedItems
          groceries={allGroceries}
          selectedItems={selectedItems}
          handleOnClick={handleChipClick}
        />
        <Modal
          show={isModalOpen}
          onClose={closeModal}
          title={selectedCategory?.name}
          description="Please select the items you have at home from the list below to update your inventory.">
            <GroceryItemsByCategory
              selectedCategory={selectedCategory}
              selectedItems={selectedItems}
              handleOnClick={handleChipClick}
            />
        </Modal>
      </FlexCol>
    </Page>
  );
};

export { Groceries };

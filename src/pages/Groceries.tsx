import React, { useState } from "react";
import { useGetGroceries } from "../hooks/useGetGroceries";
import { GroceryCategory, UserGrocery } from "../types";
import { Page,
  FlexCol,
  GroceryCategories,
  GrocerySelectedItems,
  Modal,
  GroceryItemsByCategory } from "../components";
import { useUserGroceries } from "../hooks/useUserGroceries";

const Groceries = () => {
  const { data: allGroceries, loading: groceriesLoading, error: groceriesError } = useGetGroceries();
  const {
    userGroceries,
    addUserGrocery,
    deleteUserGrocery,
    loading: userGroceriesLoading,
    error: userGroceriesError,
  } = useUserGroceries();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GroceryCategory | null>(null);
  const loading = groceriesLoading || userGroceriesLoading;
  const error = groceriesError || userGroceriesError;

  const openModal = (category: GroceryCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChipClick = (item: UserGrocery, action: "add" | "remove") => {
    if (action === "add") {
      addUserGrocery(item);
    }

    if (action === "remove") {
      deleteUserGrocery(item.groceryItemId);
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
          userGroceries={userGroceries}
          handleOnClick={handleChipClick}
        />
        <Modal
          show={isModalOpen}
          onClose={closeModal}
          title={selectedCategory?.name}
          description="Please select the items you have at home from the list below to update your inventory.">
            <GroceryItemsByCategory
              selectedCategory={selectedCategory}
              userGroceries={userGroceries}
              handleOnClick={handleChipClick}
            />
        </Modal>
      </FlexCol>
    </Page>
  );
};

export { Groceries };

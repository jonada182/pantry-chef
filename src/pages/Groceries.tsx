import React, { useState } from "react";
import { useGetGroceries } from "../hooks/useGetGroceries";
import { GroceryCategory, UserGrocery } from "../types";
import { Page,
  FlexCol,
  GroceryCategories,
  GrocerySelectedItems,
  Modal,
  GroceryItemsByCategory,
  AutoComplete } from "../components";
import { useUserGroceries } from "../hooks/useUserGroceries";

type Props = {
  userId: string | null;
};

const Groceries = ({ userId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GroceryCategory | null>(null);

  const {
    data: allGroceries,
    loading: groceriesLoading,
    error: groceriesError,
  } = useGetGroceries();
  const {
    userGroceries,
    addUserGrocery,
    deleteUserGrocery,
    loading: userGroceriesLoading,
    error: userGroceriesError,
  } = useUserGroceries({ userId });

  const loading = groceriesLoading || userGroceriesLoading;
  const error = groceriesError || userGroceriesError;

  const autoCompleteOptions =
    allGroceries?.flatMap(category => category.items)
      .filter(item => !userGroceries.some((sItem: UserGrocery) => sItem.groceryItemId === item._id))
      .map((item) => ({ label: item.name, value: item._id })) || [];

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

  const handleAutoComplete = (value: string) => {
    addUserGrocery({ groceryItemId: value });
  };

  return (
    <Page
      title="Groceries"
      description="Select the food items you have in your fridge to help you plan your next meal"
      isLoading={loading}
      error={error}
    >
      <FlexCol gap={4}>
        { allGroceries && (
          <AutoComplete placeholder="Search for grocery items..." options={autoCompleteOptions} handleSelectValue={(value) => handleAutoComplete(value)} />
        )}
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

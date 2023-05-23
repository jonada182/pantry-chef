import React, { useState } from "react";
import { Badge, Button, Card, FlexCol, FlexRow, Modal, Page, Toast } from "../components";
import { useUserRecipes } from "../hooks/useUserRecipes";
import { getRecipeDifficulty, UserRecipe } from "../types";

type Props = {
  userId: string | null;
};

const Recipes = ({ userId }: Props ) => {
  const {
    userRecipes,
    deleteUserRecipe,
    loading: userRecipesLoading,
    error: userRecipesError,
  } = useUserRecipes({ userId });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<UserRecipe | null>(null);

  const openModal = (userRecipe: UserRecipe) => {
    setSelectedRecipe(userRecipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderUserRecipes = () => {
    if (userRecipes?.length > 0) {
      return userRecipes.map((userRecipe) => (
        <Card key={userRecipe._id}>
          <FlexCol>
            <h3 className="text-xl font-bold">{userRecipe.title}</h3>
            <FlexRow gap={4} className="mt-2">
              <div className="text-sm"><strong>Ingredients: </strong><Badge text={`${userRecipe.ingredients?.length}`} /></div>
              <div className="text-sm"><strong>Difficulty: </strong>{getRecipeDifficulty(userRecipe.ingredients.length, userRecipe.instructions.length)}</div>
            </FlexRow>
          </FlexCol>
          <FlexRow gap={2}>
            <Button isSmall={true} text="View Details" handleOnClick={() => openModal(userRecipe)}/>
            <Button isSmall={true} isSecondary={true} text="Delete" handleOnClick={() => deleteUserRecipe(userRecipe._id)}/>
          </FlexRow>
        </Card>
      ));
    }

    return <Toast type="neutral" message="You haven't saved any recipes yet." />;
  };

  return (
    <Page
      title="Recipes"
      description="Here is a list of your favourite recipes."
      isLoading={userRecipesLoading}
      error={userRecipesError}
    >
      {renderUserRecipes()}
      <Modal
        show={isModalOpen}
        onClose={closeModal}
        title={selectedRecipe?.title}>
          <FlexCol gap={4}>
            <h3 className="font-bold text-lg">Ingredients</h3>
            <ul className="mx-4">
              { selectedRecipe?.ingredients?.map((ingredient, index) => <li key={index}>{ingredient}</li>) }
            </ul>
            <h3 className="font-bold text-lg">Instructions</h3>
            <ul className="mx-4">
              { selectedRecipe?.instructions?.map((instruction, index) => <li key={index} className="mb-2">{instruction}</li>) }
            </ul>
          </FlexCol>
      </Modal>
    </Page>
  );
};

export { Recipes };

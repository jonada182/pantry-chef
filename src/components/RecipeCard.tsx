import React from "react";
import { Recipe } from "../types";
import { Button, Card, FlexRow } from ".";

type Props = {
  recipe: Recipe;
  handleOnReset: () => void;
  handleOnSave: () => void;
};

export const RecipeCard = ({ recipe, handleOnReset, handleOnSave }: Props) => {
  return (
    <Card hero={{ title: recipe?.title || "Here is your tasty recipe", imageUrl: recipe?.imageUrl }}>
      <h3 className="font-bold text-lg">Ingredients</h3>
      <ul className="mx-4">
        { recipe?.ingredients?.map((ingredient, index) => <li key={index}>{ingredient}</li>) }
      </ul>
      <h3 className="font-bold text-lg">Instructions</h3>
      <ul className="mx-4">
        { recipe?.instructions?.map((instruction, index) => <li key={index} className="mb-2">{instruction}</li>) }
      </ul>
      <FlexRow gap={2} className="justify-center">
        <Button className="mb-4" isSecondary={true} handleOnClick={() => handleOnReset()} text="Edit Ingredients"/>
        <Button className="mb-4" handleOnClick={() => handleOnSave()} text="Save Recipe"/>
      </FlexRow>
    </Card>
  );
};

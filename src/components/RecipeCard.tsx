import React from "react";
import { Recipe } from "../types";
import { Button, Card } from ".";

type Props = {
  recipe: Recipe;
  handleOnClick: () => void;
};

export const RecipeCard = ({ recipe, handleOnClick }: Props) => {
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
      <Button className="mb-4" isCentered={true} handleOnClick={() => handleOnClick()} text="Edit Ingredients"/>
    </Card>
  );
};

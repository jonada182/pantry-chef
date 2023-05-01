import React from "react";
import { Recipe } from "../types";
import { Button, Card } from ".";

type Props = {
  recipe: Recipe;
  handleOnClick: () => void;
};

export const RecipeCard = ({ recipe, handleOnClick }: Props) => {
  return (
    <Card hero={{ title: recipe?.title || "Here is your tasty recipe", image_url: recipe?.image_url }}>
      <h3 className="font-bold text-lg">Ingredients</h3>
      <ul className="mx-4">{ recipe?.ingredients?.map((ingredient, index) => <li key={index}>{ingredient}</li>) }</ul>
      <h3 className="font-bold text-lg">Instructions</h3>
      <p className="mx-4">{ recipe?.instructions?.map((instruction, index) => <span className="mb-4" key={index}>{instruction}</span>) }</p>
      <Button isCentered={true} handleOnClick={() => handleOnClick()} text="Edit Ingredients"/>
    </Card>
  );
};

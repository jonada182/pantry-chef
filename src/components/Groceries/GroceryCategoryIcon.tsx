import React from "react";
import { BakeryImage, CannedGoodsImage, DairyImage, MeatImage, PantryImage, ProduceImage } from "../../assets/img/categories";

type Props = {
  categorySlug: string;
};

const getCategoryImage = (slug: string) => {
  switch (slug) {
    case "bakery":
      return BakeryImage;
    case "canned-goods":
      return CannedGoodsImage;
    case "dairy":
      return DairyImage;
    case "meat":
      return MeatImage;
    case "pantry":
      return PantryImage;
    case "produce":
      return ProduceImage;
    default:
      return "";
  }
};

export const GroceryCategoryIcon = ({ categorySlug }: Props) => {
  return (
    <div className="w-9 h-9">
      <img src={getCategoryImage(categorySlug)} alt={categorySlug} className="w-full h-full object-contain"/>
    </div>
  );
};

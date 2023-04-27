import { GroceryCategory, GroceryItem } from "../types";

export const compareGroceryItems = (a: GroceryItem, b:GroceryItem) => {
  if (a.slug < b.slug)
    return -1;
  if (a.slug > b.slug)
    return 1;
  return 0;
};

export const getItemsByCategorySlug = (
  groceries: GroceryCategory[] | null,
  categorySlugs: string[],
  selectedItemIds: string[],
): GroceryItem[] => {

  let items: GroceryItem[] = [];

  if (groceries)
    items = groceries?.filter(category => categorySlugs.includes(category.slug))
      .flatMap(category => category.items);

  if (selectedItemIds.length > 0)
    items = items?.filter(item => selectedItemIds.indexOf(item._id) >= 0);

  return items;
};

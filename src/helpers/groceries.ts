import { GroceryCategory, GroceryItem, GroupedGroceries, UserGrocery } from "../types";

const additionalCategorySlugs = ["pantry", "bakery"];

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

export const getGroupedGroceriesByCategory = (
  groceries: GroceryCategory[] | null,
  userGroceries: UserGrocery[],
): GroupedGroceries | null => {
  let myGroceries: GroupedGroceries | null = null;

  if (groceries && userGroceries.length > 0) {
    myGroceries = groceries?.reduce<GroupedGroceries>((acc, category) => {
      const items = category.items.filter(item => userGroceries.some(sItem => sItem.groceryItemId === item._id));
      if (additionalCategorySlugs.includes(category.slug)) {
        acc.additional = (acc.additional || []).concat(items);
      } else {
        acc[category.slug] = items;
      }
      return acc;
    }, {});
  }

  return myGroceries;
};

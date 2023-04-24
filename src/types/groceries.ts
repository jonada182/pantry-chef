export interface GroceryItem {
  _id: string;
  name: string;
  slug: string;
}

export interface GroceryCategory {
  _id: string;
  name: string;
  slug: string;
  items: GroceryItem[];
}

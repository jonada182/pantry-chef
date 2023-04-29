export interface GroceryItem {
  _id: string;
  name: string;
  slug: string;
  isSelected?: boolean;
}

export interface GroceryCategory {
  _id: string;
  name: string;
  slug: string;
  items: GroceryItem[];
}

export type MyGroceries = Record<string, GroceryItem[]>;

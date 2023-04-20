export enum Grocery_Item_Status {
  TO_BUY,
  BOUGHT,
}
export enum Grocery_Item_Order {
  NAME,
  DATE,
}
export interface Grocery_Item {
  name: string;
  quantity: number;
  add_date?: string;
  status?: Grocery_Item_Status;
  bought_date?: string;
}

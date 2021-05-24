import { Action } from "redux";
import { makeActionCreator } from "../utility";
export const SET_CART_ITEMS = "SET_CART_ITEMS";

export interface Item {
  id: string;
  quantity: number;
}

export interface SetCartItemsAction extends Action<typeof SET_CART_ITEMS> {
  payload: {
    items: Item[];
  };
}

export const setCartItems = makeActionCreator<SetCartItemsAction>(
  SET_CART_ITEMS,
  "items"
);

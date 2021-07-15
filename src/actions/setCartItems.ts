import { Action } from "redux";
import { actionCreator } from "../utility";
export const SET_CART_ITEMS = "SET_CART_ITEMS";

export interface Item {
  id: string;
  quantity: number;
}

export interface SetCartItemsAction extends Action<typeof SET_CART_ITEMS> {
  payload: {
    cartItems: Item[];
  };
}

export const setCartItems = actionCreator<SetCartItemsAction>(
  SET_CART_ITEMS,
  "cartItems"
);

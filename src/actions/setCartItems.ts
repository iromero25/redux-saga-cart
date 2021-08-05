import { Action } from "redux";
import { Item } from "./types";
import { actionCreator } from "../utils";
export const SET_CART_ITEMS = "SET_CART_ITEMS";

export interface SetCartItemsAction extends Action<typeof SET_CART_ITEMS> {
  payload: {
    cartItems: Item[];
  };
}

export const setCartItems = actionCreator<SetCartItemsAction>(
  SET_CART_ITEMS,
  "cartItems"
);

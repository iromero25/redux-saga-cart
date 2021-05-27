import { Item, SetCartItemsAction, SET_CART_ITEMS } from "../actions";

export const cartItemsReducer = (
  cartItems: Item[] = [],
  action: SetCartItemsAction
) => (action.type === SET_CART_ITEMS ? action.payload.cartItems : cartItems);

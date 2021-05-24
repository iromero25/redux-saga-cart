import { Item, SetCartItemsAction, SET_CART_ITEMS } from "../actions";

export const cartItemsReducer = (items: Item[] = [], action: SetCartItemsAction) => {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.payload.items;
    default:
      return items;
  }
};

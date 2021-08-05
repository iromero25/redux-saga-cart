import {
  Item,
  SetCartItemsAction,
  IncreaseItemQuantityAction,
  SET_CART_ITEMS,
  DECREASE_ITEM_QUANTITY,
  INCREASE_ITEM_QUANTITY,
  DecreaseItemQuantityAction,
} from "../actions";

export const cartItemsReducer = (
  cartItems: Item[] = [],
  action:
    | SetCartItemsAction
    | IncreaseItemQuantityAction
    | DecreaseItemQuantityAction
) => {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.payload.cartItems;

    case INCREASE_ITEM_QUANTITY:
      return immutableQuantityUpdate(
        action.payload.id,
        cartItems,
        INCREASE_ITEM_QUANTITY
      );

    case DECREASE_ITEM_QUANTITY:
      return immutableQuantityUpdate(
        action.payload.id,
        cartItems,
        DECREASE_ITEM_QUANTITY
      );

    default:
      return cartItems;
  }
};

// we make sure of returning a new CartItems object with the updated
// quantity of the item received as parameter
const immutableQuantityUpdate = (
  id: string,
  cartItems: Item[],
  operation: typeof INCREASE_ITEM_QUANTITY | typeof DECREASE_ITEM_QUANTITY
) => {
  const itemIdxToModify = cartItems.findIndex(cartItem => cartItem.id === id);
  if (itemIdxToModify === -1) return cartItems;

  const cartItemsClone = [...cartItems];
  const cartItemToUpdate = cartItemsClone[itemIdxToModify];
  const actualItemQty = cartItemToUpdate.quantity;
  cartItemToUpdate.quantity =
    operation === INCREASE_ITEM_QUANTITY ? actualItemQty + 1 : actualItemQty - 1;
  return cartItemsClone;
};

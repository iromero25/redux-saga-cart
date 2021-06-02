import { Action } from "redux";
import { makeActionCreator } from "../utility";
export const DECREASE_ITEM_QUANTITY = "DECREASE_ITEM_QUANTITY";

export interface DecreaseItemQuantityAction
  extends Action<typeof DECREASE_ITEM_QUANTITY> {
  payload: { id: string; local?: boolean };
}
export const decreaseItemQuantity = makeActionCreator<DecreaseItemQuantityAction>(
  DECREASE_ITEM_QUANTITY,
  "id",
  "local"
);

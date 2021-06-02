import { Action } from "redux";
import { makeActionCreator } from "../utility";
export const INCREASE_ITEM_QUANTITY = "INCREASE_ITEM_QUANTITY";

export interface IncreaseItemQuantityAction
  extends Action<typeof INCREASE_ITEM_QUANTITY> {
  payload: { id: string };
}
export const increaseItemQuantity = makeActionCreator<IncreaseItemQuantityAction>(
  INCREASE_ITEM_QUANTITY,
  "id"
);

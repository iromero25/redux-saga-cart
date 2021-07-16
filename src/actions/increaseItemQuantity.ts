import { Action } from "redux";
import { actionCreator } from "../utils";
export const INCREASE_ITEM_QUANTITY = "INCREASE_ITEM_QUANTITY";

export interface IncreaseItemQuantityAction
  extends Action<typeof INCREASE_ITEM_QUANTITY> {
  payload: { id: string };
}
export const increaseItemQuantity = actionCreator<IncreaseItemQuantityAction>(
  INCREASE_ITEM_QUANTITY,
  "id"
);

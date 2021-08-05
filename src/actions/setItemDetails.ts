import { Action } from "redux";
import { ItemDetail } from "./types";
import { actionCreator } from "../utils";
export const SET_ITEM_DETAILS = "SET_ITEM_DETAILS";

export interface SetItemDetailsAction extends Action<typeof SET_ITEM_DETAILS> {
  payload: {
    itemDetail: ItemDetail;
  };
}
export const setItemDetails = actionCreator<SetItemDetailsAction>(
  SET_ITEM_DETAILS,
  "itemDetail"
);

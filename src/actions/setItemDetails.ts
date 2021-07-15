import { Action } from "redux";
import { actionCreator } from "../utility";
export const SET_ITEM_DETAILS = "SET_ITEM_DETAILS";

export interface ItemDetail {
  id: string;
  name: string;
  description: string;
  usd: number;
  cad: number;
  img: string;
  quantityAvailable: number;
  weight: number;
}

export interface SetItemDetailsAction extends Action<typeof SET_ITEM_DETAILS> {
  payload: {
    itemDetail: ItemDetail;
  };
}
export const setItemDetails = actionCreator<SetItemDetailsAction>(
  SET_ITEM_DETAILS,
  "itemDetail"
);

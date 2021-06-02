import { Action } from "redux";
import { makeActionCreator } from "../utility";
export const FETCHED = "FETCHED";
export const FETCHING = "FETCHING";
export const SET_ITEM_QUANTITY_FETCH_STATUS = "SET_ITEM_QUANTITY_FETCH_STATUS";

export interface SetItemQuantityFetchStatusAction
  extends Action<typeof SET_ITEM_QUANTITY_FETCH_STATUS> {
  payload: {
    status: typeof FETCHED | typeof FETCHING;
  };
}
export const setItemQuantityFetchStatus =
  makeActionCreator<SetItemQuantityFetchStatusAction>(
    SET_ITEM_QUANTITY_FETCH_STATUS,
    "status"
  );

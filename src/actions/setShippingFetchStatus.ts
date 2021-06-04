import { Action } from "redux";
import { makeActionCreator } from "../utility";
import { FETCHED, FETCHING } from "./setItemQuantityFetchStatus";
export const SET_SHIPPING_FETCH_STATUS = "SET_SHIPPING_FETCH_STATUS";

export interface SetShippingFetchStatusAction
  extends Action<typeof SET_SHIPPING_FETCH_STATUS> {
  payload: { status: typeof FETCHED | typeof FETCHING };
}
export const setShippingFetchStatus =
  makeActionCreator<SetShippingFetchStatusAction>(
    SET_SHIPPING_FETCH_STATUS,
    "status"
  );

import { Action } from "redux";
import { actionCreator } from "../utility";
import { FETCHED, FETCHING } from "./setItemQuantityFetchStatus";
export const SET_SHIPPING_FETCH_STATUS = "SET_SHIPPING_FETCH_STATUS";

export interface SetShippingFetchStatusAction
  extends Action<typeof SET_SHIPPING_FETCH_STATUS> {
  payload: { status: typeof FETCHED | typeof FETCHING };
}
export const setShippingFetchStatus =
  actionCreator<SetShippingFetchStatusAction>(
    SET_SHIPPING_FETCH_STATUS,
    "status"
  );

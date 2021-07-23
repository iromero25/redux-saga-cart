import { SET_SHIPPING_FETCH_STATUS, FETCHING } from "../actions";
import { fetchStatusReducer } from "../utils";

export const shippingFetchStatusReducer = fetchStatusReducer(
  FETCHING,
  SET_SHIPPING_FETCH_STATUS
);

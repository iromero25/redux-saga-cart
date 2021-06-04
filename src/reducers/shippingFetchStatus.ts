import {
  SET_SHIPPING_FETCH_STATUS,
  SetShippingFetchStatusAction,
  FETCHING,
} from "../actions";

// maybe there's no need to have this reducer as we have another one that reduces a fetching status
export const shippingFetchStatusReducer = (
  shippingFetchStatus: SetShippingFetchStatusAction["payload"]["status"] = FETCHING,
  action: SetShippingFetchStatusAction
) =>
  action.type === SET_SHIPPING_FETCH_STATUS
    ? action.payload.status
    : shippingFetchStatus;

import {
  FETCHED,
  FETCHING,
  SET_ITEM_QUANTITY_FETCH_STATUS,
  SetItemQuantityFetchStatusAction,
} from "../actions";

export const itemQuantityFetchStatusReducer = (
  itemQuantityFetchStatus: typeof FETCHING | typeof FETCHED = FETCHED,
  action: SetItemQuantityFetchStatusAction
) =>
  action.type === SET_ITEM_QUANTITY_FETCH_STATUS
    ? action.payload.status
    : itemQuantityFetchStatus;

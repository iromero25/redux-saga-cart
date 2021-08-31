import {
  FETCHED,
  SET_ITEM_QUANTITY_FETCH_STATUS,
  SetItemQuantityFetchStatusAction,
} from "../actions";
import { fetchStatusReducer } from "../utils";

export const itemQuantityFetchStatusReducer =
  fetchStatusReducer<SetItemQuantityFetchStatusAction>(
    FETCHED,
    SET_ITEM_QUANTITY_FETCH_STATUS
  );

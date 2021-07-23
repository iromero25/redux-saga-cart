import {
  FETCHED,
  FETCHING,
  SET_ITEM_QUANTITY_FETCH_STATUS,
  SetItemQuantityFetchStatusAction,
} from "../actions";
import { fetchStatusReducer } from "../utils";

export const itemQuantityFetchStatusReducer = (
  itemQuantityFetchStatus: typeof FETCHING | typeof FETCHED = FETCHED,
  action: SetItemQuantityFetchStatusAction
) => {
  // try to print the stack
  // console.log(`inside itemQuantity ${action.type} ${itemQuantityFetchStatus}`);
  return action.type === SET_ITEM_QUANTITY_FETCH_STATUS
    ? action.payload.status
    : itemQuantityFetchStatus;
};

// export const itemQuantityFetchStatusReducer =
//   fetchStatusReducer<SetItemQuantityFetchStatusAction>(
//     FETCHED,
//     SET_ITEM_QUANTITY_FETCH_STATUS
//   );

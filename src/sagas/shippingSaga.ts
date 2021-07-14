import { put, select, takeLatest } from "redux-saga/effects";
import {
  DECREASE_ITEM_QUANTITY,
  FETCHED,
  FETCHING,
  INCREASE_ITEM_QUANTITY,
  SET_CART_ITEMS,
  Item,
  setShippingFetchStatus,
  setShippingCost,
} from "../actions";
import { times } from "lodash";
import { Store } from "../store";
import { fetchShipping } from "../api/fetchers";

const cartItemsSelector = (state: Store) => state.cartItems;

function* shipping() {
  yield put(setShippingFetchStatus(FETCHING));
  const cartItems: Item[] = yield select(cartItemsSelector);
  // we need to create a string that repeats the item id as many
  // times as quantity there is for each item separated by commas
  const cartItemsString = cartItems
    .reduce(
      (resultArr, item) => [...resultArr, ...times(item.quantity, () => item.id)],
      [] as string[]
    )
    .join(",");
  const response: Response = yield fetchShipping(cartItemsString);
  const { total }: { total: number } = yield response.json();
  yield put(setShippingCost(total));
  yield put(setShippingFetchStatus(FETCHED));
}

export function* shippingSaga() {
  // when ANY of these action types are triggered, we execute the `shipping` subprocess
  // the takeLatest effect ensures that if any of these actions is triggered while one
  // was being processed, the forked processed is cancelled for us and the latest one
  // is processed (super cool!)
  yield takeLatest(
    [SET_CART_ITEMS, INCREASE_ITEM_QUANTITY, DECREASE_ITEM_QUANTITY],
    shipping
  );
}

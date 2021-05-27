import { all, call, take, put, fork } from "redux-saga/effects";
import {
  SET_CART_ITEMS,
  Item,
  ItemDetail,
  setItemDetails,
  SetCartItemsAction,
} from "../actions";

function* loadItemDetailSaga(item: Item) {
  const response: Response = yield call(
    fetch,
    `http://localhost:8081/items/${item.id}`
  );
  const [itemDetail]: ItemDetail[] = yield response.json();
  yield put(setItemDetails(itemDetail));
}

export function* itemDetailsSaga() {
  const { payload }: SetCartItemsAction = yield take(SET_CART_ITEMS);
  const { cartItems } = payload;
  // map is returning an array of fork effects, so we need `yield all`
  // otherwise this won't work
  yield all(cartItems.map(item => fork(loadItemDetailSaga, item)));
}

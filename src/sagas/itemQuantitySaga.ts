import { currentUserSelector } from "../selectors";
import { all, select, put, takeLatest } from "redux-saga/effects";
import { decreaseUserItem, increaseUserItem } from "../api/fetchers";
import {
  FETCHING,
  FETCHED,
  INCREASE_ITEM_QUANTITY,
  decreaseItemQuantity,
  setItemQuantityFetchStatus,
  DecreaseItemQuantityAction,
  IncreaseItemQuantityAction,
  User,
  DECREASE_ITEM_QUANTITY,
} from "../actions";

function* handleIncreaseItemSaga({ payload }: IncreaseItemQuantityAction) {
  yield put(setItemQuantityFetchStatus(FETCHING));
  const currentUser: User = yield select(currentUserSelector);
  const itemId = payload.id;
  const response: Response = yield increaseUserItem(currentUser.id, itemId);

  if (response.status !== 200) {
    alert("There is no more stock available from the requested item");
    // decreasing the amount is required to update our own store and thus,
    // re-render the component that is displaying this item's amount
    yield put(decreaseItemQuantity(payload.id, true));
  }

  yield put(setItemQuantityFetchStatus(FETCHED));
}

function* handleDecreaseItemSaga({ payload }: DecreaseItemQuantityAction) {
  if (payload.local) {
    return;
  }

  yield put(setItemQuantityFetchStatus(FETCHING));
  const currentUser: User = yield select(currentUserSelector);
  const itemId = payload.id;
  const response: Response = yield decreaseUserItem(currentUser.id, itemId);
  if (response.status !== 200) {
    // quantity reached zero
    // To Do: we might end up with negative quantities, avoid this
  }
  yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* itemQuantitySaga() {
  // as a rule of thumb, use the `all` effect along with yield when dealing
  // with an array of effects (like fork or in this case, takeAll):
  yield all([
    takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemSaga),
    takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemSaga),
  ]);
}

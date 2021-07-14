import { put, take } from "redux-saga/effects";
import {
  SET_CURRENT_USER,
  Item,
  setCartItems,
  SetCurrentUserAction,
} from "../actions";
import { fetchCart } from "../api/fetchers";

// To Do: we need to upate the localhost to use a base url instead
export function* fetchCartSaga() {
  const { payload }: SetCurrentUserAction = yield take(SET_CURRENT_USER);
  const { id } = payload.user;
  const response: Response = yield fetchCart(id);
  const data: { owner: string; items: Item[] } = yield response.json();
  yield put(setCartItems(data.items));
}

import { spawn } from "redux-saga/effects";
import { currentUserSaga } from "./currentUserSaga";
import { fetchCartSaga } from "./fetchCartSaga";
import { itemDetailsSaga } from "./itemDetailsSaga";

export default function* rootSaga() {
  yield spawn(currentUserSaga);
  yield spawn(fetchCartSaga);
  yield spawn(itemDetailsSaga);
}

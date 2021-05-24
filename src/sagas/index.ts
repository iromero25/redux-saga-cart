import { spawn } from "redux-saga/effects";
import { currentUserSaga } from "./currentUserSaga";

export default function* rootSaga() {
  yield spawn(currentUserSaga);
}

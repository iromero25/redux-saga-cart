import { spawn } from "redux-saga/effects";
import * as sagas from "./index";

export default function* rootSaga() {
  for (const saga of Object.values(sagas)) {
    yield spawn(saga);
  }
}

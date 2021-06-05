import { call, put, take } from "redux-saga/effects";
import { SetCurrentUserAction, SET_CURRENT_USER } from "../actions";
import { setTaxRate } from "../actions";

export function* taxRateSaga() {
  const { payload }: SetCurrentUserAction = yield take(SET_CURRENT_USER);
  const country = payload.user.country;
  const response: Response = yield call(
    fetch,
    `http://localhost:8081/tax/${country}`
  );
  const { rate }: { rate: number } = yield response.json();
  yield put(setTaxRate(rate));
}

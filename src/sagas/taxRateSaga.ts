import { put, take } from "redux-saga/effects";
import { SetCurrentUserAction, SET_CURRENT_USER } from "../actions";
import { setTaxRate } from "../actions";
import { fetchTaxRate } from "../api/fetchers";

export function* taxRateSaga() {
  const { payload }: SetCurrentUserAction = yield take(SET_CURRENT_USER);
  const country = payload.user.country;
  const response: Response = yield fetchTaxRate(country);
  const { rate }: { rate: number } = yield response.json();
  yield put(setTaxRate(rate));
}

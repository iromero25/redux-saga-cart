import { call, put, select, take } from "redux-saga/effects";
import {
  ERROR_CHECKOUT_PHASE,
  QUANTITY_VERIFICATION_CHECKOUT_PHASE,
  setCheckoutPhase,
  TOGGLE_CHECKING_OUT,
  User,
} from "../actions";
import { validateUserCart } from "../api/fetchers";
import { currentUserSelector } from "../selectors";

// the API has an end-point that automatically validates the cart of any user
// so we use it:
export function* validateCart(user: User) {
  const response: Response = yield validateUserCart(user);
  const { validated } = yield response.json();
  return validated;
}

export function* checkout() {
  const user: User = yield select(currentUserSelector);
  yield put(setCheckoutPhase(QUANTITY_VERIFICATION_CHECKOUT_PHASE));
  const cartValidated: boolean = yield validateCart(user);
  if (!cartValidated) {
    yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
    return;
  }
  console.info("cart validated");
}

export function* checkoutSaga() {
  while (true) {
    const isCheckingOut: boolean = yield take(TOGGLE_CHECKING_OUT);
    if (isCheckingOut) {
      yield call(checkout);
    }
  }
}

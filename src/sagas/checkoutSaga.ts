import { call, put, select, take } from "redux-saga/effects";
import {
  CREDIT_VALIDATION_CHECKOUT_PHASE,
  ERROR_CHECKOUT_PHASE,
  PURCHASE_FINALIZATION_CHECKOUT_PHASE,
  QUANTITY_VERIFICATION_CHECKOUT_PHASE,
  setCheckoutPhase,
  SUCCESS_CHECKOUT_PHASE,
  TOGGLE_CHECKING_OUT,
  User,
} from "../actions";
import {
  executeUserPurchase,
  validateUserCart,
  validateUserCreditCard,
} from "../api/fetchers";
import { currentUserSelector } from "../selectors";

// the API has an end-point that automatically validates the cart of any user
// so we use it:
function* validateCart(user: User) {
  const response: Response = yield validateUserCart(user);
  const { validated } = yield response.json();
  return validated;
}

// the API has an end-point that automatically validates the user's credit card:
function* validateCreditCard(user: User) {
  const response: Response = yield validateUserCreditCard(user);
  const { validated } = yield response.json();
  return validated;
}

// the API has an end-point that automatically validates if the purchase can be done
// as there's a set amount of money related to the user's card. If that amount is
// exceeded, then the purchase fails
function* executePurchase(user: User) {
  const response: Response = yield executeUserPurchase(user);
  const { success } = yield response.json();
  return success;
}

export function* checkout() {
  const user: User = yield select(currentUserSelector);
  yield put(setCheckoutPhase(QUANTITY_VERIFICATION_CHECKOUT_PHASE));
  const cartValidated: boolean = yield validateCart(user);
  if (!cartValidated) {
    yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
    return;
  }

  yield put(setCheckoutPhase(CREDIT_VALIDATION_CHECKOUT_PHASE));
  const creditCardValidated: boolean = yield validateCreditCard(user);
  if (!creditCardValidated) {
    yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
    return;
  }

  yield put(setCheckoutPhase(PURCHASE_FINALIZATION_CHECKOUT_PHASE));
  const purchaseSuccessful: boolean = yield executePurchase(user);

  if (!purchaseSuccessful) {
    yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
    return;
  }

  // if we get to this point it means the whole purchase is valid:
  yield put(setCheckoutPhase(SUCCESS_CHECKOUT_PHASE));
}

export function* checkoutSaga() {
  while (true) {
    const isCheckingOut: boolean = yield take(TOGGLE_CHECKING_OUT);
    if (isCheckingOut) {
      yield call(checkout);
    }
  }
}

import { actionChannel, ActionPattern, put, take } from "redux-saga/effects";
import {
  FETCHED,
  setCanCheckOut,
  SetShippingFetchStatusAction,
  SET_SHIPPING_FETCH_STATUS,
} from "../actions";

export function* checkoutAvailabilitySaga() {
  const shippingFetchChannel: ActionPattern = yield actionChannel(
    SET_SHIPPING_FETCH_STATUS
  );
  while (true) {
    const { payload }: SetShippingFetchStatusAction = yield take(
      shippingFetchChannel
    );
    yield put(setCanCheckOut(payload.status === FETCHED));
  }
}

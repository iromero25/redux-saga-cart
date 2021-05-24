import { take, put, call } from "redux-saga/effects";
import {
  GET_CURRENT_USER_INFO,
  User,
  setCurrentUser,
  GetCurrentUserInfoAction,
} from "../actions";

export function* currentUserSaga() {
  const { payload }: GetCurrentUserInfoAction = yield take(GET_CURRENT_USER_INFO);
  const response: Response = yield call(
    fetch,
    `http://localhost:8081/user/${payload.id}`
  );
  const user: User = yield response.json();
  yield put(setCurrentUser(user)); // yield is importatnt so the saga knows where to wait
}

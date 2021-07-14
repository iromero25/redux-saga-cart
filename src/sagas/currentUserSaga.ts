import { take, put } from "redux-saga/effects";
import { fetchUser } from "../api/fetchers";
import {
  GET_CURRENT_USER,
  User,
  setCurrentUser,
  GetCurrentUserAction,
} from "../actions";

export function* currentUserSaga() {
  const { payload }: GetCurrentUserAction = yield take(GET_CURRENT_USER);
  const response: Response = yield fetchUser(payload.id);
  const user: User = yield response.json();
  yield put(setCurrentUser(user)); // yield is important so the saga knows where to wait
}

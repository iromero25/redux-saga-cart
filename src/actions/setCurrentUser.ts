import { Action } from "redux";
import { makeActionCreator } from "../utility";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export interface User {
  id?: string;
  name?: string;
  country?: string;
  address1?: string;
  phone?: number;
}

export interface SetCurrentUserAction extends Action<typeof SET_CURRENT_USER> {
  payload: {
    user: User;
  };
}

export const setCurrentUser = makeActionCreator<SetCurrentUserAction>(
  SET_CURRENT_USER,
  "user" // if we specified something different, the pre-compiler would allow it, which is wrong
);

// export const setCurrentUser = makeActionCreator<SetCurrentUserAction>(
//   SET_CURRENT_USER,
//   "name"
// );

// export const setCurrentUser = (user: User): SetCurrentUserAction => ({
//   type: SET_CURRENT_USER,
//   payload: {
//     user,
//   },
// });

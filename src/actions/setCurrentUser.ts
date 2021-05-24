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

// if we specified the wrong field (from the one in the interface),
// the pre-compiler would complain, which is what we want
export const setCurrentUser = makeActionCreator<SetCurrentUserAction>(
  SET_CURRENT_USER,
  "user"
);

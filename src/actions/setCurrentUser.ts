import { Action } from "redux";
import { User } from "./types";
import { actionCreator } from "../utils";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export interface SetCurrentUserAction extends Action<typeof SET_CURRENT_USER> {
  payload: {
    user: User;
  };
}

// if we specified the wrong field (from the one in the interface),
// the pre-compiler would complain, which is what we want
export const setCurrentUser = actionCreator<SetCurrentUserAction>(
  SET_CURRENT_USER,
  "user"
);

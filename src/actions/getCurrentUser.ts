import { Action } from "redux";
import { makeActionCreator } from "../utility";
export const GET_CURRENT_USER = "GET_CURRENT_USER";

export interface Payload {
  id: string;
}

export interface GetCurrentUserAction extends Action<typeof GET_CURRENT_USER> {
  payload: Payload;
}

// export const getCurrentUser = makeActionCreator<GetCurrentUserAction>(
//   GET_CURRENT_USER,
//   "id"
// );

export const getCurrentUser = (userId: string): GetCurrentUserAction => ({
  type: GET_CURRENT_USER,
  payload: {
    id: userId,
  },
});

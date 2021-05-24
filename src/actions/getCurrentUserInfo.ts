import { Action } from "redux";
import { makeActionCreator } from "../utility";
export const GET_CURRENT_USER_INFO = "GET_CURRENT_USER_INFO";

export interface Payload {
  id: string;
}

// what if I add a generic here to pass Payload??
export interface GetCurrentUserInfoAction
  extends Action<typeof GET_CURRENT_USER_INFO> {
  payload: Payload;
}

export const getCurrentUserInfo = makeActionCreator<GetCurrentUserInfoAction>(
  GET_CURRENT_USER_INFO,
  "id"
);

// export const getCurrentUserInfo = (id: string): GetCurrentUserInfoAction => ({
//   type: GET_CURRENT_USER_INFO,
//   payload: {
//     id,
//   },
// });

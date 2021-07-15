import { Action } from "redux";
import { actionCreator } from "../utility";
export const GET_CURRENT_USER = "GET_CURRENT_USER";

export interface Payload {
  id: string;
}

export interface GetCurrentUserAction extends Action<typeof GET_CURRENT_USER> {
  payload: Payload;
}

export const getCurrentUser = actionCreator<GetCurrentUserAction>(
  GET_CURRENT_USER,
  "id"
);

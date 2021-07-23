import { Action } from "redux";
import { FETCHING, FETCHED } from "../actions";

interface CustomAction extends Action {
  payload: { status: typeof FETCHING | typeof FETCHED };
}

// generic reducer for Fetch Status reducers
export const fetchStatusReducer =
  <T extends CustomAction>(
    initialState: T["payload"]["status"] = FETCHING,
    type: T["type"]
  ) =>
  (partOfState = initialState, action: T) =>
    action.type === type ? action.payload.status : partOfState;

import { ToggleCheckOutAction, TOGGLE_CHECKING_OUT } from "../actions";

export const isCheckingOutReducer = (
  initialState: ToggleCheckOutAction["payload"]["value"] = false,
  action: ToggleCheckOutAction
) => (action.type === TOGGLE_CHECKING_OUT ? action.payload.value : initialState);

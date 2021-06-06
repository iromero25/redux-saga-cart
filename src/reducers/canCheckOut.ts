import { SetCanCheckOutAction, SET_CAN_CHECK_OUT } from "../actions";

export const canCheckOutReducer = (
  canCheckout: boolean = false,
  action: SetCanCheckOutAction
) => (action.type === SET_CAN_CHECK_OUT ? action.payload.value : canCheckout);

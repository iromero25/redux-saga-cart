import { Action } from "redux";
import { actionCreator } from "../utils";
export const SET_TAX_RATE = "SET_TAX_RATE";

export interface SetTaxRateAction extends Action<typeof SET_TAX_RATE> {
  payload: { rate: number };
}
export const setTaxRate = actionCreator<SetTaxRateAction>(SET_TAX_RATE, "rate");

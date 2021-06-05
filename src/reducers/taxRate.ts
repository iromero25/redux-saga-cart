import { SET_TAX_RATE, SetTaxRateAction } from "../actions";

export const taxRateReducer = (
  taxRate: SetTaxRateAction["payload"]["rate"] = 0,
  action: SetTaxRateAction
) => (action.type === SET_TAX_RATE ? action.payload.rate : taxRate);

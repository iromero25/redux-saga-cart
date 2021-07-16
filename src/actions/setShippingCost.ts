import { Action } from "redux";
import { actionCreator } from "../utils";
export const SET_SHIPPING_COST = "SET_SHIPPING_COST";

export interface SetShippingCostAction extends Action<typeof SET_SHIPPING_COST> {
  payload: {
    cost: number;
  };
}

export const setShippingCost = actionCreator<SetShippingCostAction>(
  SET_SHIPPING_COST,
  "cost"
);

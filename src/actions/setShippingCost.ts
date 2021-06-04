import { Action } from "redux";
import { makeActionCreator } from "../utility";
export const SET_SHIPPING_COST = "SET_SHIPPING_COST";

export interface SetShippingCostAction extends Action<typeof SET_SHIPPING_COST> {
  payload: {
    cost: number;
  };
}

export const setShippingCost = makeActionCreator<SetShippingCostAction>(
  SET_SHIPPING_COST,
  "cost"
);

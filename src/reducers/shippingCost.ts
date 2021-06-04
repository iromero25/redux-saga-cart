import { SET_SHIPPING_COST, SetShippingCostAction } from "../actions";

export const shippingCostReducer = (
  shippingCost: number = 0,
  action: SetShippingCostAction
) => (action.type === SET_SHIPPING_COST ? action.payload.cost : shippingCost);

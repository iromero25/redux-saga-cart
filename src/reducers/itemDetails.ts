import { SET_ITEM_DETAILS, ItemDetail, SetItemDetailsAction } from "../actions";

export const itemDetailsReducer = (
  itemDetails: ItemDetail[] = [],
  action: SetItemDetailsAction
) => {
  // todo: we might need to update an existing detail
  ;
  return action.type === SET_ITEM_DETAILS
    ? [...itemDetails, action.payload.itemDetail]
    : itemDetails;
};

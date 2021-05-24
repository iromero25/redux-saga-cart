import { SET_CURRENT_USER, User, SetCurrentUserAction } from "../actions";

export const currentUserReducer = (
  currentUser: User = {},
  action: SetCurrentUserAction
) => {
  return action.type === SET_CURRENT_USER ? action.payload.user : currentUser;
};

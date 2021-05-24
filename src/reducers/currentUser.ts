import { SET_CURRENT_USER, User, SetCurrentUserAction } from "../actions";

// const emptyUser: User = {
//   id: "",
//   name: "",
//   country: "",
//   address1: "",
//   phone: 99999,
// };

export const currentUserReducer = (
  currentUser: User = {},
  action: SetCurrentUserAction
) => {
  
  return action.type === SET_CURRENT_USER ? action.payload.user : currentUser;
};

import { Action } from "redux";

// explain this!
interface CustomAction<U> extends Action {
  payload: U;
}

// To Note: typing `argName` as keyof T['payload']  means that  we are expecing
// `argName` to be any of the  keys specified at the payload interface  that is
// being extended by the Generic. This means that if the generit T is extending
// from a Payload interface that specifies  'user' as key, then we expect 'user'
// to be specified as the  `argName`; speicfying something else would be marked
// as an error by the pre-compiler (whihc is exactly what I want).
export const makeActionCreator =
  <T extends CustomAction<T["payload"]>>(
    type: T["type"],
    argName: keyof T["payload"]
  ) =>
  <U>(argVal: U) => {
    const payload = {
      [argName]: argVal,
    };
    return {
      type,
      payload,
    };
  };

import { Action } from "redux";

interface CustomAction<U> extends Action {
  payload: Record<keyof U, U[keyof U]>;
}

// Typing `argNames` as `keyof Payload` means we are expecting it to be any of the
// keys specified at  the payload interface  that is being extended by the Generic.
// This means that if  the generic T is extending  from a Payload  interface  that
// specifies 'user'  as key, then we expect 'user' to be specified as the `argName`;
// specifying something else would be marked as an error by the pre-compiler (which
// is exactly what I want).
// export const actionCreator =
//   <T extends CustomAction<Payload>, Payload = T["payload"]>(
//     type: T["type"],
//     ...argNames: Array<keyof Payload> // this is how to detail to expect an array of keys
//   ) =>
//   // this details to expect and array of values whose values are defined by the Payload type
//   (...argVals: Array<Payload[keyof Payload]>) => {
//     let payload = {} as Record<keyof Payload, Payload[keyof Payload]>;

//     argNames.forEach((argName, index) => {
//       payload = {
//         ...payload,
//         [argName]: argVals[index],
//       };
//     });

//     return {
//       type,
//       payload,
//     };
//   };

export const actionCreator =
  <T extends CustomAction<P>, P = T["payload"]>(
    type: T["type"],
    ...argNames: Array<keyof P>
  ) =>
  (...argVals: Array<P[keyof P]>) => {
    let payload = {} as P;

    argNames.forEach((argName, index) => {
      payload = {
        ...payload,
        [argName]: argVals[index],
      };
    });

    return {
      type,
      payload,
    };
  };

// this is something I got from https://fettblog.eu/typescript-hasownproperty/
// to narrow down the type of an object when checking if there's an existing
// preperty and have Typescript comply with it
export function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

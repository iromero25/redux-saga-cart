// import { all, call, put, take } from "redux-saga/effects";
// import { SET_CART_ITEMS, SET_CURRENT_USER } from "../actions";

// originally, there would be a `fetchItemPrice` fuction to  fetch the price of  an item
// but that is not neccessary as we store each item's price at the itemDetails structure

// function* fetchItemPrice(id: string, currency: number) {
//   const response: Response = yield fetch(
//     `http://localhost:8081/prices/${currency}/${id}`
//   );
//   const json = response.json();
//   const price = json[0].price;
//   yield put(setItemPrice(id, price));
// }

// export function* itemPriceSaga() {
//   const [{ user }, { items }] = yield all([
//     take(SET_CURRENT_USER),
//     take(SET_CART_ITEMS),
//   ]);
//   yield all(items.map(item => call(fetchItemPrice, item.id, user.country)));
// }

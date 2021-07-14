import { ItemDetail, User } from "../actions";

export const fetchUser = (userId: User["id"]) =>
  fetch(`http://localhost:8081/user/${userId}`);

export const fetchTaxRate = (country: User["country"]) =>
  fetch(`http://localhost:8081/tax/${country}`);

export const fetchCart = (userId: User["id"]) =>
  fetch(`http://localhost:8081/cart/${userId}`);

export const fetchItem = (itemId: ItemDetail["id"]) =>
  fetch(`http://localhost:8081/items/${itemId}`);

export const fetchShipping = (cartItems: string) =>
  fetch(`http://localhost:8081/shipping/${cartItems}`);

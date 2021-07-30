import { Item, ItemDetail, User } from "../actions";

const baseUrl = `http://localhost:8081`; // I need to dinamically assign this for heroku

export const fetchUser = (userId: User["id"]) =>
  fetch(`${baseUrl}/user/${userId}`);

export const fetchTaxRate = (country: User["country"]) =>
  fetch(`${baseUrl}/tax/${country}`);

export const fetchCart = (userId: User["id"]) =>
  fetch(`${baseUrl}/cart/${userId}`);

export const fetchItem = (itemId: ItemDetail["id"]) =>
  fetch(`${baseUrl}/items/${itemId}`);

export const fetchShipping = (cartItems: string) =>
  fetch(`${baseUrl}/shipping/${cartItems}`);

export const increaseUserItem = (userId: User["id"], itemId: Item["id"]) =>
  fetch(`${baseUrl}/cart/add/${userId}/${itemId}`);

export const decreaseUserItem = (userId: User["id"], itemId: Item["id"]) =>
  fetch(`${baseUrl}/cart/remove/${userId}/${itemId}`);

export const validateUserCart = (user: User) =>
  fetch(`${baseUrl}/cart/validate/${user.id}`);

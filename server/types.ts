import { Request, Response } from "express";
import { Item, ItemDetail, User } from "../src/actions/types";

export interface Cart {
  owner: string;
  items: Item[];
}

export interface Card {
  id: string;
  owner: string;
  number: number;
  availableFunds: number;
}

export interface TaxRate {
  symbol: string;
  rate: number;
}

export interface Database {
  users: Required<User>[];
  carts: Cart[];
  items: ItemDetail[];
  cards: Card[];
  taxRates: TaxRate[];
}

export interface Req extends Request {
  cart?: Cart;
  card?: Card;
}

export interface Res extends Response {}

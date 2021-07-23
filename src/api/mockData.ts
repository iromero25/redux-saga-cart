import { Item, ItemDetail, User } from "../actions";

export const user: Required<User> = {
  id: "U10000",
  name: "J.R.R Hemingway",
  country: "CAD",
  address1: "555 La Floridita Way",
  phone: 15551234567,
};

export const cart: { owner: string; items: Item[] } = {
  owner: "U10000",
  items: [
    {
      id: "I10000",
      quantity: 8,
    },
    {
      id: "I20000",
      quantity: 3,
    },
  ],
};

export const taxRate = {
  rate: 0.15,
};

export const itemArray: ItemDetail[] = [
  {
    id: "I10000",
    name: "Velvet Mousepad",
    description: "Your mouse never had it so good.",
    usd: 129.95,
    cad: 175.85,
    img: "velvet-mousepad.png",
    quantityAvailable: 100000,
    weight: 0.8,
  },
];

export const itemShipping = {
  total: 3.5,
};

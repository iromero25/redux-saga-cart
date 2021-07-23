import { Store } from "./store";

export const storeMock: Pick<Store, "cartItems" | "itemDetails"> = {
  cartItems: [
    {
      id: "I10000",
      quantity: 5,
    },
  ],
  itemDetails: [
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
  ],
};

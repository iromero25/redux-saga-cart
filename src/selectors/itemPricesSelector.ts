import { Store } from "../store";
import { hasOwnProperty } from "../utility";

// This item Price selector is a little bit of a pain.
// As we get the currency from the `itemDetail` based on the user's country,
// typescrypt complains about indexing `itemDetail` with such string, so we
// use `hasOwnProperty` that lets typescript know it is safe to do such indexing

// A series of stric checks take place to ensure the pre-compiler completely knows
// (and agrees) on the type that is returned by this selctor (number in this case)
export const itemPriceSelector = (id: string) => (state: Store) => {
  const country = state.currentUser.country;
  const currency = country?.toLowerCase() ?? "usd";
  const itemDetail = state.itemDetails.find(item => item.id === id);
  if (typeof itemDetail === "object" && hasOwnProperty(itemDetail, currency)) {
    const price = itemDetail[currency];
    if (typeof price === "number") {
      return price;
    }
  }
  return 0;
};

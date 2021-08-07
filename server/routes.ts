import express from "express";
import YAML from "yamljs";
import { ItemDetail } from "../src/actions/types";
import { Database, Req, Res, TaxRate } from "./types";

const router = express.Router();

YAML.load("./dist/database.yml", (database: Database) => {
  const makeCartAdjustmentRoute =
    (shouldAdd = true) =>
    (req: Req, res: Res) => {
      const { owner, itemID } = req.params;
      const cart = database.carts.find(cart => cart.owner === owner);
      if (!cart) {
        return res.status(500).json({
          error: "No cart found with the specified ID",
          owner,
        });
      }

      const item = database.items.find(item => item.id === itemID);
      if (!item) {
        return res.status(500).json({
          error: "No item found with the specified ID",
          itemID,
        });
      }

      const existingItem = cart.items.find(cartItem => cartItem.id === itemID);
      if (existingItem) {
        if (shouldAdd && existingItem.quantity >= item.quantityAvailable) {
          return res.status(503).json({
            error: "An insufficient quantity of items remains.",
            itemID,
            quantityAvailable: item.quantityAvailable,
          });
        }
        existingItem.quantity += shouldAdd ? 1 : -1;
        // I don't want to eliminate an item that has reached 0 requested units
        // if (existingItem.quantity === 0) {
        //   cart.items = cart.items.filter((item) => item.id !== itemID);
        // }
      } else {
        if (shouldAdd) {
          cart.items.push({
            quantity: 1,
            id: itemID,
          });
        } else {
          return res.status(500).json({
            error: "No item with the specified ID exists in the cart to be removed",
            owner,
            itemID,
          });
        }
      }
      res.status(200).send(cart);
    };

  router.get("/cart/add/:owner/:itemID", makeCartAdjustmentRoute(true));
  router.get("/cart/remove/:owner/:itemID", makeCartAdjustmentRoute(false));

  router.get("/user/:id", (req, res) => {
    const id = req.params.id;
    const user = database.users.find(user => user.id === id);
    if (!user) {
      return res.status(500).json({
        error: "No user with the specified ID",
        id,
      });
    } else {
      res.status(200).json(user);
    }
  });

  router.use(
    ["/cart/validate/:owner", "/cart/:owner", "/card/charge/:owner"],
    (req: Req, res: Res, next) => {
      const { owner } = req.params;
      const cart = database.carts.find(cart => cart.owner === owner);
      if (!cart) {
        return res
          .status(404)
          .json({ error: "No cart with the specified owner", owner });
      } else {
        req.cart = cart;
        next();
      }
    }
  );

  router.get("/cart/validate/:owner", (req: Req, res: Res) => {
    const { items } = req.cart!;
    let validated = true;
    let error = null;
    items.forEach(({ id, quantity }) => {
      const item = database.items.find(item => item.id === id)!;
      if (item.quantityAvailable < quantity) {
        validated = false;
        error = "There is an insufficient quantity of " + id;
      }
    });
    res.status(200).json({ validated, error });
  });

  router.get("/cart/:owner", (req: Req, res: Res) => {
    const cart = req.cart;
    res.status(200).json(cart);
  });

  router.use(
    ["/card/validate/:owner", "/card/charge/:owner"],
    (req: Req, res: Res, next) => {
      const { owner } = req.params;
      const card = database.cards.find(card => card.owner === owner);
      if (!card) {
        res.status(500).send({ error: `No card is available for user ${owner}` });
      }
      req.card = card;
      next();
    }
  );

  router.get("/card/validate/:owner", (req: Req, res: Res) => {
    const { card } = req;
    res.status(200).json({ validated: true });
  });

  router.get("/card/charge/:owner", (req: Req, res: Res) => {
    const { card, cart } = req;
    const { owner } = req.params;
    const country = database.users.find(user => user.id === owner)?.country ?? "USD";
    let total =
      cart?.items.reduce((total, { quantity, id }) => {
        const item = database.items.find(item => item.id === id)!;
        const symbol = country === "CAD" ? "cad" : "usd";
        const baseValue = item?.[symbol] ?? 0;
        const shipping = getItemShippingValue(item);
        total += (baseValue + shipping) * quantity;
        return total;
      }, 0) ?? 0;

    const { rate } = getTaxRate(country);
    total *= 1 + rate;

    // by the point we reach this point, the total is already covering
    // shipping expenses and taxes, which is the way it should be
    if (card!.availableFunds <= total) {
      return res.status(402).json({ success: false });
    }

    // I am modifying the server's logic so that available funds are never modified
    // while keeping the logic checking if the available funds are enough to cover
    // the purchase, which is what I want.

    // card.availableFunds -= total;
    res.status(201).send({ success: true });
  });

  router.get("/items/:ids", (req: Req, res: Res) => {
    const ids = req.params.ids.split(",");
    const items = ids.map(id => database.items.find(item => item.id === id));
    if (items.includes(undefined)) {
      res.status(500).json({ error: "A specified ID had no matching item" });
    } else {
      res.status(200).json(items);
    }
  });

  router.get("/prices/:symbol/:ids", (req: Req, res: Res) => {
    const ids = req.params.ids.split(",");
    const items = ids.map(id => database.items.find(item => item.id === id)!);
    const supportedSymbols = ["CAD", "USD"];
    const symbol = req.params.symbol;
    if (!supportedSymbols.includes(symbol)) {
      return res.status(403).json({
        error:
          "The currency symbol provided is inaccurate, see list of supported currencies",
        supportedSymbols,
      });
    }

    if (items.length === 0) {
      return res.status(500).json({ error: "A specified ID had no matching item" });
    } else {
      res.status(200).json(
        items.map(item => ({
          id: item.id,
          symbol,
          price: symbol === "USD" ? item?.usd : item.cad,
        }))
      );
    }
  });

  const getItemShippingValue = (item: ItemDetail) =>
    item.weight === 0 ? 0 : item.weight < 0.5 ? 3.5 : 8.5;

  router.get("/shipping/:items", (req, res) => {
    const ids = req.params.items.split(",");
    let total = 0;
    ids.forEach(id => {
      const item = database.items.find(item => item.id === id)!;
      //   if (item.weight === 0) {
      //     total += 0;
      //   } else if (item.weight < 0.5) {
      //     total += 3.5;
      //   } else {
      //     total += 8.5;
      //   }
      total += getItemShippingValue(item);
    });
    res.status(200).json({
      total,
    });
  });

  const getTaxRate = (symbol: TaxRate["symbol"]) =>
    database.taxRates.find(rate => rate.symbol === symbol)!;

  router.get("/tax/:symbol", (req, res) => {
    const { symbol } = req.params;
    // const taxRate = database.taxRates.find((rate) => rate.symbol === symbol);
    const taxRate = getTaxRate(symbol);
    if (!taxRate) {
      return res.status(500).json({
        symbol,
        error: "No tax rate info for symbol " + symbol,
      });
    }

    res.status(200).json({
      rate: taxRate.rate,
    });
  });
});

export default router;

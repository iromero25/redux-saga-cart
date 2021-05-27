import React from "react";
import { Store } from "../../store";
import { isEmpty } from "lodash";
import { Item } from "../../actions";
import CartItem from "./CartItem";
import StoreConnector from "../StoreConnector";

interface StoreProps {
  cartItems: Item[];
}
interface OwnProps {
  loadingMessage: string;
}
const mapStateToProps = (state: Store) => ({
  cartItems: state.cartItems,
});

const CartItemList: React.FC<StoreProps & OwnProps> = ({
  cartItems,
  loadingMessage,
}) => (
  <>
    {!isEmpty(cartItems) ? (
      <div>
        {cartItems.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
    ) : (
      <div>{loadingMessage}</div>
    )}
  </>
);

export default StoreConnector(CartItemList, mapStateToProps);

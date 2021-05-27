import React from "react";
import { Store } from "../../store";
import { isEmpty } from "lodash";
import { Item } from "../../actions";
import CartItem from "./CartItem";
import StoreConnector from "../StoreConnector";

interface StoreProps {
  items: Item[];
}
interface OwnProps {
  loadingMessage: string;
}
const mapStateToProps = (state: Store) => ({
  items: state.items,
});

const CartItemList: React.FC<StoreProps & OwnProps> = ({
  items,
  loadingMessage,
}) => (
  <>
    {!isEmpty(items) ? (
      <div>
        {items.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
    ) : (
      <div>{loadingMessage}</div>
    )}
  </>
);

export default StoreConnector(CartItemList, mapStateToProps);

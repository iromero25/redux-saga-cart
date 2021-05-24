import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Store } from "../../store";
import { isEmpty } from "lodash";
import CartItem from "./CartItem";

const mapStateToProps = (state: Store) => ({
  items: state.items,
});

const connector = connect(mapStateToProps);

interface ReduxProps extends ConnectedProps<typeof connector> {}

const CartItemList: React.FC<ReduxProps> = ({ items }) => (
  <div>
    {!isEmpty(items) ? (
      <div>
        {items.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
    ) : (
      <div>Please wait...</div>
    )}
  </div>
);

export default connector(CartItemList);

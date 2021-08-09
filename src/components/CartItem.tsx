import React, { Dispatch } from "react";
import {
  FETCHED,
  Item,
  decreaseItemQuantity,
  increaseItemQuantity,
  DecreaseItemQuantityAction,
  IncreaseItemQuantityAction,
} from "../actions";
import { isEmpty } from "lodash";
import { Store } from "../store";
import { connect, ConnectedProps } from "react-redux";
import { itemPriceSelector } from "../selectors";

interface OwnProps extends Item {}

const mapStateToProps = (state: Store, ownProps: OwnProps) => {
  const itemDetails = state.itemDetails;
  const quantityFetchStatus = state.itemQuantityFetchStatus;
  const itemDetail = itemDetails.find(itemDetail => itemDetail.id === ownProps.id)!;
  const price = itemDetail ? itemPriceSelector(itemDetail.id)(state) : 0;
  return {
    fetched: !isEmpty(itemDetail),
    quantityFetchStatus,
    price,
    ...itemDetail,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<IncreaseItemQuantityAction | DecreaseItemQuantityAction>
) => ({
  increaseItemQuantity: (id: string) => dispatch(increaseItemQuantity(id)),
  decreaseItemQuantity: (id: string, local: boolean) =>
    dispatch(decreaseItemQuantity(id, local)),
});

const Connector = connect(mapStateToProps, mapDispatchToProps);
interface ReduxProps extends ConnectedProps<typeof Connector> {
  quantity: number;
}

const CartItem: React.FC<ReduxProps> = ({
  fetched,
  name,
  description,
  price,
  id,
  quantity,
  increaseItemQuantity,
  decreaseItemQuantity,
  quantityFetchStatus,
}) => (
  <div>
    {fetched ? (
      <div>
        <h5>{name}</h5>
        <div>
          {price > 0 ? (
            <div>${price}</div>
          ) : (
            <div>
              <div
                className="loader"
                title=" We're getting the price for this item..."
              />
            </div>
          )}
        </div>
        <p>{description}</p>
        <section>
          <span className="item-quantity">Quantity: {quantity}</span>
          <button
            className="btn btn-secondary"
            disabled={quantityFetchStatus !== FETCHED || quantity <= 0}
            onClick={() => decreaseItemQuantity(id, false)}
          >
            -
          </button>
          <button
            className="btn btn-secondary"
            disabled={quantityFetchStatus !== FETCHED}
            onClick={() => increaseItemQuantity(id)}
          >
            +
          </button>
        </section>
      </div>
    ) : (
      <div className="loader"></div>
    )}
  </div>
);

export default Connector(CartItem);

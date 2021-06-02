import React from "react";
import {
  FETCHED,
  Item,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../actions";
import { isEmpty } from "lodash";
import { Store } from "../../store";
import { connect, ConnectedProps } from "react-redux";
// import StoreConnector, { MapToState } from "../StoreConnector";

interface OwnProps extends Item {}
// interface Props extends ItemDetail {
//   fetched: boolean;
//   price: number;
// }

// const mapStateToProps: MapToState = (state, ownProps) => {
const mapStateToProps = (state: Store, ownProps: OwnProps) => {
  const itemDetails = state.itemDetails;
  const quantityFetchStatus = state.itemQuantityFetchStatus;
  const itemDetail = itemDetails.find(itemDetail => itemDetail.id === ownProps.id);
  return {
    quantityFetchStatus,
    fetched: !isEmpty(itemDetail),
    ...itemDetail,
  };
};

const mapDispatchToProps = {
  decreaseItemQuantity,
  increaseItemQuantity,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface ReduxProps extends ConnectedProps<typeof connector> {
  price: number;
  quantity: number;
}

// const CartItemDisplay: React.FC<ReduxProps & OwnProps & Props> = ({
const CartItemDisplay: React.FC<ReduxProps> = ({
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
            disabled={quantityFetchStatus !== FETCHED}
            onClick={() => decreaseItemQuantity(id, false as any)}
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

// export default StoreConnector(CartItemDisplay, mapStateToProps);
export default connector(CartItemDisplay);

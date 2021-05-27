import React from "react";
import { Item, ItemDetail } from "../../actions";
import { isEmpty } from "lodash";
import StoreConnector, { MapToState } from "../StoreConnector";

interface OwnProps extends Item {}
interface Props extends ItemDetail {
  fetched: boolean;
  price: number;
}

const mapStateToProps: MapToState = (state, ownProps) => {
  const itemDetails = state.itemDetails;
  const itemDetail = itemDetails.find(itemDetail => itemDetail.id === ownProps.id);
  return {
    fetched: !isEmpty(itemDetail),
    ...itemDetail,
  };
};

const CartItemDisplay: React.FC<Props & OwnProps> = ({
  fetched,
  name,
  description,
  price,
  id,
  quantity,
  // increaseItemQuantity,
  // decreaseItemQuantity,
  // quantityFetchStatus,
}) => (
  <div>
    {fetched ? (
      <div>
        <h5>{name}</h5>
        <div>
          {price ? (
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
          {/* <button
            className="btn btn-secondary"
            disabled={quantityFetchStatus !== FETCHED}
            onClick={() => decreaseItemQuantity(id)}
          >
            -
          </button> */}
          {/* <button
            className="btn btn-secondary"
            disabled={quantityFetchStatus !== FETCHED}
            onClick={() => increaseItemQuantity(id)}
          >
            +
          </button> */}
        </section>
      </div>
    ) : (
      <div className="loader"></div>
    )}
  </div>
);

export default StoreConnector(CartItemDisplay, mapStateToProps);

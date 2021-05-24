import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Item } from "../../actions";
import { Store } from "../../store";
import { isEmpty } from "lodash";
// import { FETCHED } from "../../actions";

const mapStateToProps = (state: Store, ownProps: Item) => {
  const items = state.items;
  const itemDetail = items.find(item => item.id === ownProps.id);
  return {
    fetched: false,
    ...itemDetail,
  };
};

const connector = connect(mapStateToProps);

interface ReduxProps extends ConnectedProps<typeof connector> {}
// interface Props extends Item {
//   fetched: boolean;
// }

const CartItemDisplay: React.FC<ReduxProps> = ({
  fetched,
  // name,
  // description,
  // price,
  id,
  quantity,
  // increaseItemQuantity,
  // decreaseItemQuantity,
  // quantityFetchStatus,
}) => (
  <div>
    {fetched ? (
      <div>
        {/* <h5>{name}</h5>
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
        <p>{description}</p> */}
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

export default connector(CartItemDisplay);

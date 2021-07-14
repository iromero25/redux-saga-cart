import React, { Dispatch, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Store } from "../store";
import { getCurrentUser, GetCurrentUserAction } from "../actions";
import { isEmpty } from "lodash";

const mapStateToProps = (state: Store) => {
  const { currentUser } = state;
  return !isEmpty(currentUser)
    ? { ...currentUser, fetched: true }
    : { fetched: false };
};

const mapDispatchToProps = (dispatch: Dispatch<GetCurrentUserAction>) => ({
  getCurrentUser: (id: string) => dispatch(getCurrentUser(id)),
});

const Connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof Connector>;

const UserInfo: React.FC<ReduxProps> = ({
  name,
  address1,
  country,
  phone,
  fetched,
  getCurrentUser,
}) => {
  useEffect(() => {
    getCurrentUser("U10000");
  }, []);

  return (
    <div>
      <section className="current-user">
        {fetched ? (
          <>
            <span>{name}</span>
            <br />
            <span>{address1}</span>,<span>{country}</span>
            <br />
            <span>{phone}</span>
          </>
        ) : (
          <span>Please wait while we fetch your user info.</span>
        )}
      </section>
    </div>
  );
};

export default Connector(UserInfo);

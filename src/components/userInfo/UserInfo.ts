import { connect } from "react-redux";
import { Store } from "../../store";
import { isEmpty } from "lodash";
import { UserInfoDisplay } from "./UserInfoDisplay";

// import {
//     currentUserSelector
// } from './../../selectors'

const mapStateToProps = (state: Store) => {
  const { currentUser } = state;
  return !isEmpty(currentUser)
    ? { ...currentUser, fetched: true }
    : { fetched: false };
};

const UserInfo = connect(mapStateToProps)(UserInfoDisplay);

export default UserInfo;

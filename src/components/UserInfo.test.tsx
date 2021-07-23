import React from "react";
import { render } from "@testing-library/react";
import UserInfo from "./UserInfo";
import { fetchUser } from "../api/fetchers";
import { mockFetchPromise } from "../utils";
import { createReduxWrapper } from "../utils";
import * as actions from "../actions/getCurrentUser";
import { user, cart, taxRate, itemArray, itemShipping } from "../api/mockData";
import "@testing-library/jest-dom";

import store from "../store";

// since this is an integration test, it is better to mock most of the API
// calls involved and let all the logic in the sagas flow
jest.mock("../api/fetchers", () => ({
  fetchUser: jest.fn().mockImplementation(() => mockFetchPromise(user)),
  fetchCart: jest.fn().mockImplementation(() => mockFetchPromise(cart)),
  fetchTaxRate: jest.fn().mockImplementation(() => mockFetchPromise(taxRate)),
  fetchItem: jest.fn().mockImplementation(() => mockFetchPromise(itemArray)),
  fetchShipping: jest.fn().mockImplementation(() => mockFetchPromise(itemShipping)),
}));

const ReduxWrapper = createReduxWrapper(store);

test("User Info component renders after the saga is triggered", async () => {
  const currentUserSpy = jest.spyOn(actions, "getCurrentUser");
  const { getByText, findByText, queryByText } = render(
    <ReduxWrapper>
      <UserInfo />
    </ReduxWrapper>
  );

  // To notice: the different way in which the testing-library text-related
  // functions are used:

  // `getByText` doesn't await and returns if finds a match
  expect(getByText(/wait while we fetch/)).toBeInTheDocument();
  // `queryByText` works better to search something that is not expected to
  // be in de DOM as it returns null if no text is mathed. All other options
  // throw an exception in that case.
  expect(queryByText(user.name)).not.toBeInTheDocument();
  expect(currentUserSpy).toHaveBeenCalled();
  expect(fetchUser).toHaveBeenCalled();

  // `findByText` works as expected with `await` (wait for an async op to
  // update the DOM)
  const { name, address1 } = user;
  const userName = await findByText(name);
  const address = await findByText(address1);
  expect(userName).toBeInTheDocument();
  expect(address).toBeInTheDocument();
});

import React from "react";
import store from "../store";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import UserInfo from "./UserInfo";
import * as actions from "../actions/getCurrentUser";
import { fetchUser } from "../api/fetchers";
import mockFetchPromise from "../utility/mockPromise";
import {
  userMock,
  cartMock,
  taxRateMock,
  itemArrayMock,
  itemShippingMock,
} from "../utility/mockData";
import "@testing-library/jest-dom";

// since this is an integration test, it is better to mock most of the API
// calls involved and let all the logic in the sagas flow
jest.mock("../api/fetchers", () => ({
  fetchUser: jest.fn().mockImplementation(() => mockFetchPromise(userMock)),
  fetchCart: jest.fn().mockImplementation(() => mockFetchPromise(cartMock)),
  fetchTaxRate: jest.fn().mockImplementation(() => mockFetchPromise(taxRateMock)),
  fetchItem: jest.fn().mockImplementation(() => mockFetchPromise(itemArrayMock)),
  fetchShipping: jest
    .fn()
    .mockImplementation(() => mockFetchPromise(itemShippingMock)),
}));

const Wrapper: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

test("User Info component renders after the saga is triggered", async () => {
  const currentUserSpy = jest.spyOn(actions, "getCurrentUser");
  const { getByText, findByText, queryByText } = render(
    <Wrapper>
      <UserInfo />
    </Wrapper>
  );

  // To notice: the different way in which the testing-library text-related
  // functions are used:

  // `getByText` doesn't await and returns if finds a match
  expect(getByText(/wait while we fetch/)).toBeInTheDocument();
  // `queryByText` works better to search something that is not expected to
  // be in de DOM as it returns null if no text is mathed. All other options
  // throw an exception in that case.
  expect(queryByText(userMock.name)).not.toBeInTheDocument();
  expect(currentUserSpy).toHaveBeenCalled();
  expect(fetchUser).toHaveBeenCalled();

  // `findByText` works as expected with `await` (wait for an async op to
  // update the DOM)
  const userName = await findByText(userMock.name);
  const address = await findByText(userMock.address1);
  expect(userName).toBeInTheDocument();
  expect(address).toBeInTheDocument();
});

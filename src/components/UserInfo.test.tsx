import React from "react";
import UserInfo from "./UserInfo";
import { user } from "../api/mockData";
import * as actions from "../actions/getCurrentUser";

// I believe `mockAPIs` needs to be imported before `store` so it can work as expected
import { mockAPIs } from "../testUtils/mockAPIs";
import { renderWithRedux } from "../testUtils";
import { fetchUser } from "../api/fetchers";
import "@testing-library/jest-dom";

// Important: I cannot provide a reference to the `mockAPIs`  function as second
// parameter of the mock e.g.: `jest.mock("../api/fetchers", mockAPIs)` since it
// won't work. I need to specify it as an arrow function like this:
jest.mock("../api/fetchers", () => mockAPIs());

test("User Info component renders after the saga is triggered", async () => {
  const currentUserSpy = jest.spyOn(actions, "getCurrentUser");
  const { getByText, findByText, queryByText } = renderWithRedux(<UserInfo />);

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

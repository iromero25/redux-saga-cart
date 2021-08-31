# redux-saga-cart

Example of an online Checkout Cart application. It uses Redux for state management combinded with Sagas to handle several asynchronous database operations that are perfomed via AJAX requests. Typescrypt is used as the main programming language.

## Server

This app executes AJAX calls that are dealt by an internal server. This server could have been placed externally but I wanted to keep this whole app contained.

Since the AJAX requests are RESTful API requests in reality, the server relies on an internal database to persist the data manipulated by such REST operations. The database is managed by the YAML library. It is out of the scope of this repository to elaborate on how YAML works.

All the logic comprising the API endpoints on the server ([routes.ts](./server/routes.ts)) as well as the database file itself [database.yml](./server/database.yml) were not coded by me: this is code that was sync'ed down from this [repository](https://github.com/danielstern/redux-saga-shopping-cart-server) and it was authored by [Daniel Stern](https://github.com/danielstern).

## Higher Order Component

A Higher Order Component (HOC) was created to connect a component to the Redux's store. The component is called [StoreConnector](./src/components/StoreConnector.tsx).

This proved challenging due to an ongoing issue with Typescript's dynamic typing of the wrapped component's props which can be seen [here](https://github.com/microsoft/TypeScript/issues/28884).

The component is working and can be seen in action wrapping the [CartItemList](./src/components/CartItemList.tsx) component.

There are a couple of important issues to pay attention to in there:

1. It takes two arguments: the component it is wrapping and the `mapStateToProps` function.
1. We need to specify all the props in the interface that are being wrapped:

   - the props that are connected through the store, and;
   - the own props (the ones declared by its parent component)

   (See the code at the wrapped _CartItemList_ component to see an example of how these props are defined).

1. If the `mapStateToProps` is using/accessing `ownProps` then **it has to be typed** using the `MapToState` type that is exported by `StoreConnector`. The reason behind this is that `StoreConnector` cannot correctly infer `mapStateToProps` type when ownProps is involved. See the _mapStateToProps_ defined in the [CartItem](./src/components/CartItem.tsx) component to see an example of this situation.

## Utilities

I created the [actionCreator](./src/utils/actionCreator.ts) function that returns (as stated by its name) an Action Creator (which is in turn, also a function). `actionCreator` is strongly typed as is used to create all action creators. An interesting example of `actionCreator` receiving more than one argument can be seen in the [decreaseItemQuantity](./src/actions/decreaseItemQuantity.ts) file.

## Scripts (and bulding)

I am listing some useful information related to the scripts at the `package.json` below:

- The **build:dev** script runs all the tasks configured via Webpack to create the bundles related to the front-end.
- The **prebuild:server** script will run just before **build:server**. This will ensure that:

  - the `/dist` folder is created if it doesn't exist, and;
  - the `database.yml` file that is required by the server is copied inside it

- The **build:server** script's purpose is to compile all the `.ts` files under the `/server` folder (following the configuration at the `tsconfig.server.json` file), including the [routes.ts](./server/routes.ts) file which is expected to load the data from the `database.yml` file.
- The **build** script executes both `build:dev` & `build:server` scripts effetivelly building the whole application.
- The **start** script runs the transpiled server from the generated `dist/` folder.

## tsconfig.server.json

Note how this configuration file is only worried to transpile the `server.ts` file. However, since this one is importing the `routes.ts` file, it gets transpiled and placed under the same destination folder automatically. This means all dependencies are transpiled and correctly placed as needed.

## (Integration) Testing

I am providing integration tests for some components and as such, sagas are being tested. I am using React's Testing-Library and thus, my tests are focused on checking the DOM being updated accordingly, specially after a saga has being triggered.

There are a couple of important features that are worth mentioning for this tests:

- The usage of the [mockAPIs](./src/testUtils/mockAPIs.ts) function that supports with the mocking of all APIs used throught the tests. This is convenient as our tests rely on all API calls to be mocked. Refer to any of the test files to check how the function is used.

- The implementation of the [renderWithRedux](./src/testUtils/renderWithRedux.tsx) function as a way to handle mouting the React components to be tested. This function accepts the children components (in JSX notation) that will wrap and the initial state of the store. It returns two references:
  - One to the `screen` object of the Testing library representing the DOM where the components are being mounted, and;
  - Another to the internal `store` that is being used inside the context of the mounted DOM meant for testing. This reference is the one to be used to dispatch any actions.

Here's a list of some relevant test files along with their description:

1. [UserInfo.test.tsx](./src/components/UserInfo.test.tsx). Tests `UserInfo`. This is the first test to look at and the simplest one. It is testing that the `getCurrentUser` action is triggered as part of the `useEffect` hook in that component and thus, all sagas listening to that action are springed. I mock all API calls involved and let the sagas flow with it. The test is just checking the mocked user data is displayed at the DOM.
1. [CartItemList.test.tsx](./src/components/CartItemList.test.tsx). Tests `CartItemList` but mainly `CartItem`. It starts by checking that the DOM loads with cart data as we mock inital data for the store. Then ir proceeds to verify that the add and decrease quantity buttons (+ & -) do trigger the expected actions but more importantly, that the buttons are disabled immediately after being clicked on. It finishes by checking adding an item "reverts" back to the initial quantity when we go over the existing quantity in stock.
1. [OderSummary.test.tsx](./src/components/OrderSummary.test.tsx). One of the most complete there are. The intention is to only test the right figures (subtotal, tax, shipping and total) are being shown every time we dispatch an action to increase or decrease the quantity. This includes testing for the case where we exceed the physical stock of an item and thus the quanity is reverted back. This test is important because it is refactoring the logic to check present quantities in the DOM (so it can be reused) and because it is overriding some mocked APIs that are initially created through the `mockAPIs` util. Please refer to the comments therein for more info.

## NPM Registry and Library dependencies

As a reminder, library dependencies were all installed using NPM's public repository using:
`YARN_REGISTRY=https://registry.npmjs.org yarn install`

Also, I am using specifyic verions of `webpack`, `webpack-cli`, `typescript`, `ts-loader` and `copy-webpack-plugin` that are not conflictive. More recent versions of these libraries were tried and resulted in many errors being thrown at compile/bundle time.

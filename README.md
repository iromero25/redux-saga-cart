# redux-saga-cart

Checkout cart app using Redux for state management and Sagas to handle several asynchronous database operations. Typescrypt is used as programming language.

## Server

This app executes AJAX calls that are dealt by an internal server. This server could have been placed external to this app but it I wanted to keep this whole application contained.

Since the AJAX requests are RESTful API requests in reality, the server has to rely on an internal database to persist the data manipulated by such REST operations. The database is managed by the YAML package.

All the logic comprising the API endpoints on the server ([routes.ts](./server/routes.ts)) as well as the database file itself [database.yml](./server/database.yml) were not coded by me; this is code that was sync'ed down from this [repository](https://github.com/danielstern/redux-saga-shopping-cart-server) and it was authored by [Daniel Stern](https://github.com/danielstern).

## Higher Order Component

A Higher Order Component (HOC) was created to connect a component to the Redux's store. The component is called [StoreConnector](./src/components/StoreConnector.tsx).

This proved challenging due to an ongoing issue with Typescript's dynamic typing of the wrapped component's props which can be seen [here](https://github.com/microsoft/TypeScript/issues/28884).

The component is working and can be in action wrapping the [CartItemList](./src/components/cartItems/CartItemList.tsx) component.

There are a couple of important issues to pay attention to in there:

1. It takes two arguments: the component it is wrapping and the `mapStateToProps` function.
1. We need to specify all the props in the interface that is being wrapped:

   - the props that are connected through the store, and;
   - the own props (the ones declared by its parent component)

   (See the code at the wrapped _CartItemList_ component to see an example of how these props are defined).

1. If the `mapStateToProps` is using/accessing `ownProps` then **it has to be typed** using the `MapToState` type that is exported by `StoreConnector`. The reason behind this is that `StoreConnector` cannot correctly infer `mapStateToProps` type when ownProps is involved. See the _mapStateToProps_ defined in the [CartItem](./src/components/cartItems/CartItem) component to see an example of this situtation.

## Utilities

I created the [actionCreator](./src/utility/actionCreator.ts) function that returns (as stated by its name) an Action Creator (which is in turn, also a function). `actionCreator` is strongly typed as is used to create all action creators. An interesting example of `actionCreator` receiving more than one argument can be seen in the [decreaseItemQuantity](./src/actions/decreaseItemQuantity.ts) file.

## Scripts

I list some useful information related to the scripts at the `package.json` that might not be instantky clear:

- The **prebuild:server** script will run just before **build:server**. This will ensure that:

  - the `/dist` folder is created if it doesn't exist, and;
  - the `database.yml` file that is required by the server is copied inside it

- The **build:server** script's purpose is to compile all the `.ts` files under the `/server` folder (following the configuration at the `tsconfig.server.json` file), including the [routes.ts](./server/routes.ts) file which is expected to load the data from the `database.yml` file.

## tsconfig.server.json

Note how this configuration file is only worried to transpile the `server.ts` file. However, since this one is importing the `routes.ts` file, it gets transpiled and placed under the same destination folder automatically. This means all dependencies are transpiled and correctly placed as needed.

## (Integration) Testing

I am providing integration tests for some components and as such, sagas are being tested. I am using React's Testing-Library and thus, my tests are focused on checking the DOM being updated accordingly, specially after a saga has bein triggered. Here's a list of the test files and descriptions:

1. [UserInfo.test.tsx](./src/components/UserInfo.test.tsx). Tests `UserInfo`. This is the first test to look at and the simplest one. It is testing that the `getCurrentUser` action is triggered as part of the `useEffect` hook in that component and thus, all sagas listening to that action are springed. I mock all API calls involved and let the sagas flow with it. The test is just checking the mocked user data is displayed at the DOM.
1. [CartItemList.test.tsx](./src/components/cartItems/CartItemList.test.tsx). Tests `CartItemList` but mainly `CartItem`. It starts by checking that the DOM loads with cart data as we mock inital data for the store. Then ir proceeds to verify that the add and decrease quantity buttons (+ & -) do trigger the expected actions but more importantly, that the buttons are disabled immediately after being clicked on. It finishes by checking adding an item "reverts" back to the initial quantity when we go over the existing quantity in stock.

## NPM Registry and Library dependencies

As a reminder, library dependencies were all installed using NPM's public repository using:
`YARN_REGISTRY=https://registry.npmjs.org yarn install`

Also, I am using specifyic verions of `webpack`, `webpack-cli`, `typescript`, `ts-loader` and `copy-webpack-plugin` that are not conflictive. More recent versions of these libraries were tried and resulted in many errors being thrown at compile/bundle time.

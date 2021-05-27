# redux-saga-cart

Checkout cart app using Redux for state management and Sagas to handle several asynchronous database operations. Typescrypt is used as programming language.

## server

To Do: mention that this app relies on an external server to serve its AJAX requests.

## Higher Order Component

A Higher Order Component (HOC) was created to connect a component to the Redux's store. The component is called [StoreConnector](./src/components/StoreConnector).

This proved challenging due to an ongoing issue with Typescript's dynamic typing of the wrapped component's props which can be seen [here](https://github.com/microsoft/TypeScript/issues/28884).

The component is working and can be in action wrapping the [CartItemList](./src/components/cartItems/CartItemList.tsx) component.

There are a couple of important issues to pay attention to in there:

1. It takes two arguments: the component it is wrapping and the `mapStateToProps` function.
1. We need to specify all the props in the interface that is being wrapped:

   - the props that are connected through the store, and;
   - the own props (the ones declared by its parent component)

   (See the code at the wrapped _CartItemList_ component to see an example of how these props are defined).

1. If the `mapStateToProps` is using/accessing `ownProps` then **it has to be typed** using the `MapToState` type that is exported by `StoreConnector`. The reason behind this is that `StoreConnector` cannot correctly infer `mapStateToProps` type when ownProps is involved. See the _mapStateToProps_ defined in the [CartItem](./src/components/cartItems/CartItem) component to see an example of this situtation.

## NPM Registry and Library dependencies

As a reminder, library dependencies were all installed using NPM's public repository using:
`YARN_REGISTRY=https://registry.npmjs.org yarn install`

Also, I am using specifyic verions of `webpack`, `webpack-cli`, `typescript`, `ts-loader` and `copy-webpack-plugin` that are not conflictive. More recent versions of these libraries were tried and resulted in many errors being thrown at compile/bundle time.

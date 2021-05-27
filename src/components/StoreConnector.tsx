import React from "react";
import { Store } from "../store";
import { connect, ConnectedProps } from "react-redux";

export interface MapToState {
  (state: Store, ownProps: Record<string, any>): Record<string, any>;
}

// First working version of a HOC that aims to connect the component it wraps
// (WrappedComponent) with the store.
export default function StoreConnector<OriginalProps>(
  WrappedComponent: React.FC<OriginalProps>,
  mapStateToProps: MapToState
) {
  const connector = connect(mapStateToProps);
  interface ReduxProps extends ConnectedProps<typeof connector> {}

  const HOC = (props: ReduxProps) => (
    // Here's the main difficulty: dynamically type the wrapped  component's
    // props is not happening. I need to assert the type on spread like this:
    <WrappedComponent {...(props as OriginalProps & ReduxProps)} />
    // This is an ongoing issue at the Typescript library. See details:
    // https://github.com/microsoft/TypeScript/issues/28884
  );

  return connector(HOC);
}

// Note to myself: maybe this can be achieved in a cleaner way if I was to
// use hooks for dealing with the dispatching. So it is worth having a look.

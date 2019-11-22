import React from 'react';
import compose from 'recompose/compose';
import { withCurrentUser } from '../components/withCurrentUser';
import AuthView from '../views/authView';

const Switch = props => {
  const { Component, FallbackComponent } = props;
  return (
    <AuthView>
      {authed => {
        if (!authed) return <FallbackComponent />;
        return <Component />;
      }}
    </AuthView>
  );
};

const SignedOutFallback = (Component, FallbackComponent) => {
  return (props) => (
    <Switch
      FallbackComponent={FallbackComponent}
      Component={Component}
    />
  );
};

export default SignedOutFallback;
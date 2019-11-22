import React from 'react';
import { Route } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route  exact {...rest} render={props => isLoggedIn && <Component {...props} />} />
);
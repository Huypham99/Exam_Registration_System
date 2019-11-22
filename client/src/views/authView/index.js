import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { useQuery } from '@apollo/react-hooks';
import { getCurrentUserQuery } from '../../graphql/queries/user/getUser';

const AuthView = ({ children }) => {

    const { loading, data } = useQuery(getCurrentUserQuery);

    if (data && data.getCurrentUser.id) return children(true);
    if (loading) return null;
    return children(false);
};

export default AuthView;


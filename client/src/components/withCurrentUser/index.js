import React from 'react';
import { graphql } from 'react-apollo';
import { getCurrentUserQuery } from '../../../src/graphql/queries/user/getUser'
import { useQuery } from '@apollo/react-hooks'
import { compose } from 'recompose';



const CurrentUser = ({children }) => {
    const { loading, data } = useQuery(getCurrentUserQuery);
    const currentUser = data && data.getCurrentUser
    if (loading) {
        return (<div>....</div>);
    }
    return children({ currentUser, loading });
};

export default CurrentUser;

export const withCurrentUser = (Component) => {
    return (
        () => {
            return (
                <CurrentUser>
                    {({ currentUser, loading }) => {
                        return (
                            <Component
                                currentUser={currentUser ? currentUser : null}
                                isLoadingCurrentUser={loading}
                            />
                        );
                    }}
                </CurrentUser>
            );
        }
    );
}

import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authentication/AuthContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    /* This is a higher-order-component */
    // Take a component and its props
    const authContext = useContext(AuthContext);
    const { authenticated, loading, authenticatedUser } = authContext;

    useEffect(() => {
        authenticatedUser();
        // eslint-disable-next-line
    }, []);

    return (
        <Route { ...props } render={ props => !authenticated && !loading ? (
            // If the user isn't authenticated, redirect to login page
            <Redirect to="/" />
        ) : (
            // If the user is authenticated, call the component and send props
            <Component {...props} />
        ) } />
    );
}

export default PrivateRoute;
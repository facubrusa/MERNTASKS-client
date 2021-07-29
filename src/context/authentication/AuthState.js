import React, { useReducer } from 'react';

import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import clientAxios from '../../config/Axios';
import setToken from '../../config/Token';

import { 
    SUCCESSFUL_REGISTRATION,
    ERROR_REGISTRATION,
    GET_USER,
    SUCCESSFUL_LOGIN,
    ERROR_LOGIN,
    LOG_OUT } from "../../types";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Functions
    const registerUser = async (data) => {
        try {
            const response = await clientAxios.post('/api/users', data);

            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data
            });

            //Get data of the user
            authenticatedUser();
        } catch (error) {
            console.log(error.response.data);
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_REGISTRATION,
                payload: alert
            });
        }
    }

    // Get and set information of the logged user in the state
    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');

        if(token) {
            setToken(token);
        }

        try {
            const response = await clientAxios.get('/api/auth');

            dispatch({
                type: GET_USER,
                payload: response.data.user
            });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: ERROR_LOGIN
            });
        }
    }

    const logIn = async (data) => {
        try {
            const response = await clientAxios.post('/api/auth', data);

            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data
            });

            //Get data of the user
            authenticatedUser();
        } catch (error) {
            console.log(error.response);
            //let responseError = error.response.data;
            let messageError = 'Error logIn';
            /* if(responseError.hasOwnProperty('errors')){
                messageError = responseError.errors[0].msg;
            } else {
                messageError = responseError.msg;
            } */
            const alert = {
                msg: messageError,
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_LOGIN,
                payload: alert
            });
        }
    }

    const logOut = () => {
        dispatch({
            type: LOG_OUT
        });
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                logIn,
                authenticatedUser,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;
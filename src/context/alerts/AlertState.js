import React, { useReducer } from 'react';

import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import { SHOW_ALERT, HIDE_ALERT } from "../../types";

const AlertState = props => {
    const initialState = { 
        alert: null
    };

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Functions
    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                category
            }
        });

        // Hide alert after 5s
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            });
        }, 4000);
    }

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );

}

export default AlertState;
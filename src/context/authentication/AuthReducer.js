import { 
    SUCCESSFUL_REGISTRATION,
    ERROR_REGISTRATION,
    GET_USER,
    SUCCESSFUL_LOGIN,
    ERROR_LOGIN,
    LOG_OUT } from "../../types";

const AuthReducer = (state, action) => {
    switch(action.type){
        case SUCCESSFUL_REGISTRATION:
        case SUCCESSFUL_LOGIN:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                loading: false
            }
        case ERROR_REGISTRATION:
        case ERROR_LOGIN:
        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authenticated: null,
                user: null,
                message: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default AuthReducer;
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/AlertContext';
import AuthContext from '../../context/authentication/AuthContext';
const Login = (props) => {

    // Get the alert state for show alert errors
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { authenticated, message, logIn } = authContext;

    const [user, saveUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    useEffect(() => {
        if(authenticated){
            props.history.push('/projects');
        }

        if(message){
            showAlert(message.msg, message.category);
        }
        // eslint-disable-next-line
    }, [authenticated, message, props.history]);

    const handleChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Validate all inputs
        if(email.trim() === '' || password.trim() === '') {
            showAlert('All fields are required', 'alert-error');
            return;
        }
        // Move to action
        logIn({email, password});
    }

    return ( 
        <div className="form-usuario">
            { alert ? (<div className={`alerta ${alert.category}`}> {alert.msg} </div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Log In</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="You Email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="You Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-auth btn-block" 
                            value="Log In" 
                        />
                    </div>
                </form>

                <p className="enlace-cuenta">Don't have an account?<Link to={'/register'} className="register-link">Sign Up</Link></p>
            </div>
        </div>
    );
}
 
export default Login;
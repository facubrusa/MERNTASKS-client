import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/AlertContext';
import AuthContext from '../../context/authentication/AuthContext';

const Register = (props) => {

    // Get the alert state for show alert errors
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { authenticated, message, registerUser } = authContext;

    const [user, saveUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = user;

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

        // Validate all inputs are not empty
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || password2.trim() === ''){
            showAlert('All fields are required', 'alert-error');
            return;
        }
        // Password have more that 6 characters
        if(password.length < 6) {
            showAlert('The password must contain more than 6 characters', 'alert-error');
            return;
        }

        // The 2 password are same
        if(password !== password2) {
            showAlert('The passwords must be the same', 'alert-error');
            return;
        }
        // Move to action
        registerUser({
            name,
            email,
            password
        });
    }

    return ( 
        <div className="form-usuario">
            { alert ? (<div className={`alerta ${alert.category}`}> {alert.msg} </div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Sign Up</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            placeholder="You Name"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>

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
                        <label htmlFor="password2">Repeat Password</label>
                        <input 
                            type="password"
                            id="password2"
                            name="password2"
                            placeholder="Repeat Password"
                            value={password2}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-auth btn-block" 
                            value="Sign Up" 
                        />
                    </div>
                </form>

                <p className="enlace-cuenta">Already have an account?<Link to={'/'} className="register-link">Log In</Link></p>
            </div>
        </div>
    );
}
 
export default Register;
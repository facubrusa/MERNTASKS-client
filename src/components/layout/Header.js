import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/AuthContext';

const Header = () => {
    const authContext = useContext(AuthContext);
    const { user, authenticatedUser, logOut } = authContext;

    useEffect(() => {
        authenticatedUser();
        // eslint-disable-next-line
    }, []);

    return ( 
        <header className="app-header">
            { user ? <p className="nombre-usuario">Hi <span>{user.name}</span></p> : null }
            
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => logOut()}
                    >Log Out</button>
            </nav>
        </header>
    );
}
 
export default Header;
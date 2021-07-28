import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import FormTask from '../tasks/FormTask';
import ListTasks from '../tasks/ListTasks';
import AuthContext from '../../context/authentication/AuthContext';

const Projects = () => {
    // Get data of the authState
    const authContext = useContext(AuthContext);
    const { authenticatedUser } = authContext;

    useEffect(() => {
        authenticatedUser();
        // eslint-disable-next-line
    }, []);
    
    return ( 
        <div className="contenedor-app">

            <Sidebar />
            <div className="seccion-principal">

                <Header />

                <main>
                    <FormTask />

                    <div className="contenedor-tareas">
                        <ListTasks />
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Projects;
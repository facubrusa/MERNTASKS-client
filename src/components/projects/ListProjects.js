import React, { useContext, useEffect } from 'react'
import Project from './Project';
import ProjectContext from '../../context/projects/ProjectContext';
import AlertContext from '../../context/alerts/AlertContext';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListProjects = () => {
    // Extract project from initial state
    const projectContext = useContext(ProjectContext);
    const { projects, message, getProjects } = projectContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const nodeRef = React.useRef(null);

    // useEffect ever before any return
    useEffect(() => {
        if(message){
            showAlert(message.msg, message.category);
        }

        getProjects();
    // eslint-disable-next-line
    }, [message]);
    // Review if we have projects
    if(projects.length === 0) return <p>There are no projects, start by creating one</p>

    return ( 
        <ul className="listado-proyectos">

            { alert ? (<div className={`alerta ${alert.category}`}> {alert.msg} </div>) : null }

            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        nodeRef={nodeRef}
                        timeout={300}
                        classNames="proyecto"
                    >
                        <Project
                            project={project}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>        
    );
}
 
export default ListProjects;
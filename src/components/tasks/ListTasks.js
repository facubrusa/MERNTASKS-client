import React, { Fragment, useContext, useEffect } from 'react'
import Task from './Task';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';
import AlertContext from '../../context/alerts/AlertContext';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListTasks = () => {
    // Extract the states and function from the project context
    const projectContext = useContext(ProjectContext);
    const { project, editFormProject, deleteProject } = projectContext;

    // Extract the states and function from the task context
    const taskContext = useContext(TaskContext);
    const { projecttask, message } = taskContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const nodeRef = React.useRef(null); //With this, I deleted the warning: 'findDOMNode is deprecated in StrictMode' c:

    useEffect(() => {
        if(message) showAlert(message.msg, message.category);
        // eslint-disable-next-line
    }, [message]);

    // Review if we have projects
    if(!project) return <h2>Select the project</h2>;

    // Apply array destructuring and get the [0] position
    const [ actualProject ] = project;

    const editActualProject = (name) => {
        editFormProject(name);
    }

    return ( 
        <Fragment>
            <h2>Project: {actualProject.name}</h2>

            <ul className="listado-tareas">
    
                { alert ? (<div className={`alerta ${alert.category}`}> {alert.msg} </div>) : null }

                {projecttask.length === 0 ?
                    <li className="tarea"><p>The aren't tasks</p></li>
                :
                <TransitionGroup>
                    {projecttask.map(task => (
                        <CSSTransition
                            key={task._id}
                            nodeRef={nodeRef}
                            timeout={300}
                            classNames="tarea"
                        >
                            <Task
                                task={task}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                
                }   
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => deleteProject(actualProject._id)}
            >Delete Project</button>

            <button
                type="button"
                className="btn btn-editar"
                onClick={() => editActualProject(actualProject.name)}
            >Edit Project</button>

        </Fragment>

    );
}
 
export default ListTasks;
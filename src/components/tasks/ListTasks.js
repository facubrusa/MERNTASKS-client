import React, { Fragment, useContext } from 'react'
import Task from './Task';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListTasks = () => {
    // Extract the states and function from the project context
    const projectContext = useContext(ProjectContext);
    const { project, showForm, editProject, deleteProject } = projectContext;

    // Extract the states and function from the task context
    const taskContext = useContext(TaskContext);
    const { projecttask } = taskContext;

    if(!project) return <h2>Select the project</h2>;

    // Apply array destructuring
    const [ actualProject ] = project;

    // Get the name of the project
    const { name } = actualProject;

    const editActualProject = (idProject) => {
        console.log(idProject);
        showForm();
    }

    return ( 
        <Fragment>
            <h2>Project: {actualProject.name}</h2>

            <ul className="listado-tareas">
                {projecttask.length === 0 ?
                    <li className="tarea"><p>The aren't tasks</p></li>
                :
                <TransitionGroup>
                    {projecttask.map(task => (
                        <CSSTransition
                            key={task._id}
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
                onClick={() => editActualProject(actualProject._id)}
            >Edit Project</button>

        </Fragment>

    );
}
 
export default ListTasks;
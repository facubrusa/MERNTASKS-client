import React, { useContext, useState, useEffect } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

const FormTask = () => {
    // Extract project from initial state
    const projectContext = useContext(ProjectContext);
    const { project } = projectContext;

    const taskContext = useContext(TaskContext);
    const { errortask, actualtask, getTasks, addTask, validateTask, editActualTask, cleanActualTask } = taskContext;

    const [task, saveTask] = useState({
        name: ''
    });

    useEffect(() => {
        if(actualtask){
            saveTask(actualtask)
        } else {
            saveTask({
                name: ''
            });
        }
    }, [actualtask]);

    if(!project) return null;

    // Apply array destructuring
    const [ actualProject ] = project;

    const { name } = task;

    const onSubmit = e => {
        e.preventDefault();

        // Validate form
        if(name.trim() === '') {
            validateTask();
            return;
        }

        // Create or edit a task
        if(actualtask){
            // Edit
            editActualTask(task);
            cleanActualTask();
        } else {
            // Add task to state
            task.project = actualProject._id;
            task.status = false;
            addTask(task);
        }

        // Refresh the tasks of the project
        getTasks(actualProject._id);

        // Restart form
        saveTask({
            name: ''
        });
    }

    const handleChange = e => {
        saveTask({
            ...task,
            [e.target.name] : e.target.value
        });
    }
    
    return (  
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Task name..."
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={ actualtask ? 'Edit Task' : 'Add Task' }
                    />
                </div>
            </form>

            { errortask ? <p className="mensaje error">The task name is required</p> : null }
        </div>
    );
}
 
export default FormTask;
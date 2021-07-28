import React, { useContext } from 'react';
import TaskContext from '../../context/tasks/TaskContext';

const Task = ({task}) => {
    // Extract the states and function from the task context
    const taskContext = useContext(TaskContext);
    const { getTasks, deleteTask, editActualTask, saveActualTask } = taskContext;

    const deleteOneTask = (idTask) => {
        console.log(idTask);
        console.log(task.project);
        deleteTask(idTask, task.project);
        getTasks(task.project);
    }

    const changeStatus = task => {
        task.status = (task.status) ? false : true;
        editActualTask(task);
    }

    const setActualTask = task => {
        saveActualTask(task);
    }

    return ( 
        <li className="tarea sombra">
            <p>{task.name}</p>

            <div className="estado">
                {task.status ?
                <button
                    type="button"
                    className="completo"
                    onClick={() => changeStatus(task)}
                >Completed</button>    
            :
                <button
                    type="button"
                    className="incompleto"
                    onClick={() => changeStatus(task)}
                >Incompleted</button>     
            }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => setActualTask(task)}
                >Edit</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => deleteOneTask(task._id)}
                >Delete</button>
            </div>
        </li>
    );
}
 
export default Task;
import React, { useReducer } from 'react';

import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import clientAxios from '../../config/Axios';
import { PROJECT_TASKS, 
    ADD_TASK, 
    VALIDATE_TASK, 
    DELETE_TASK, 
    ACTUAL_TASK, 
    EDIT_TASK, 
    CLEAN_TASK,
    ERROR_TASK } from '../../types/index';

const TaskState = props => {
    const initialState = {
        projecttask: [],
        errortask: false,
        actualtask: null,
        message: null
    };

    // Dispatch for ejecute actions
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // Serie of functions
    const getTasks = async project => {
        try {
            // Send actual project obj in the body
            const response = await clientAxios.get('/api/tasks', { params: { project }});
            dispatch({
                type: PROJECT_TASKS,
                payload: response.data.tasks
            });
        } catch (error) {
            const alert = {
                msg: 'Ops! Something failed',
                category: 'alert-error'
            };
            dispatch({
                type: ERROR_TASK,
                payload: alert
            });
        }

    }

    // Add task to list
    const addTask = async task => {
        try {
            const response = await clientAxios.post('/api/tasks', task);
            //console.log(response);
            dispatch({
                type: ADD_TASK,
                payload: response.data
            });
        } catch (error) {
            const alert = {
                msg: 'Ops! Something failed',
                category: 'alert-error'
            };
            dispatch({
                type: ERROR_TASK,
                payload: alert
            });
        }
        
    }

    // Show error if the form task is empty
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        });
    }

    // Delete task
    const deleteTask = async (idTask, project) => {
        /* console.log(idTask);
        console.log(project); */
        try {
            await clientAxios.delete(`/api/tasks/${idTask}`, { params: { project }});
            //console.log(response);
            dispatch({
                type: DELETE_TASK,
                payload: idTask
            });
        } catch (error) {
            const alert = {
                msg: 'Ops! Something failed',
                category: 'alert-error'
            };
            dispatch({
                type: ERROR_TASK,
                payload: alert
            });
        }
    }

    // Edit status and modify task
    const editActualTask = async task => {
        try {
            await clientAxios.put(`/api/tasks/${task._id}`, task)
            //console.log(response);
            dispatch({
                type: EDIT_TASK,
                payload: task
            });
        } catch (error) {
            const alert = {
                msg: 'Ops! Something failed',
                category: 'alert-error'
            };
            dispatch({
                type: ERROR_TASK,
                payload: alert
            });
        }
    }

    // Set and save actual task
    const saveActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        });
    }

    // Set actualtask to null when alredy edited
    const cleanActualTask = () => {
        dispatch({
            type: CLEAN_TASK
        });
    }

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                projecttask: state.projecttask,
                errortask: state.errortask,
                actualtask: state.actualtask,
                message: state.message,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                saveActualTask,
                editActualTask,
                cleanActualTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;
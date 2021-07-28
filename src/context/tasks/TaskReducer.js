import { PROJECT_TASKS, 
    ADD_TASK, 
    VALIDATE_TASK, 
    DELETE_TASK, 
    ACTUAL_TASK, 
    EDIT_TASK, 
    CLEAN_TASK,
    ERROR_TASK } from '../../types/index';

const TaskReducer = (state, action) => {
    switch(action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                projecttask: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                projecttask: [ action.payload, ...state.projecttask ],
                errortask: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                errortask: true
            }
        case DELETE_TASK:
            return {
                ...state,
                projecttask: state.projecttask.filter(task => task._id !== action.payload)
            }
        case EDIT_TASK:
            return {
                ...state,
                projecttask: state.projecttask.map(task => task._id === action.payload._id ? action.payload : task)
            }
        case ACTUAL_TASK:
            return {
                ...state,
                actualtask: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                actualtask: null
            }
        case ERROR_TASK:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

export default TaskReducer;
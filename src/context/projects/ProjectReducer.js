import { SHOW_FORM_PROJECT, 
    FORM_PROJECT,
    GET_PROJECTS, 
    ADD_PROJECT, 
    VALIDATE_FORM, 
    ACTUAL_PROJECT, 
    EDIT_FORM_PROJECT,
    DELETE_PROJECT, 
    EDIT_PROJECT,
    ERROR_PROJECT } from "../../types";

const ProjectReducer = (state, action) => {
    switch(action.type){
        case SHOW_FORM_PROJECT:
            return {
                ...state,
                form: true
            }
        case FORM_PROJECT:
            return {
                ...state,
                formproject: {
                    ...state.formproject,
                    [action.payload.name] : action.payload.value
                }
            }
        case EDIT_FORM_PROJECT:
            return {
                ...state,
                form: true,
                editproject: true,
                formproject: {
                    name: action.payload
                }
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                formerror: false,
                formproject: {
                    name: ''
                }
            }
        case VALIDATE_FORM:
            return {
                ...state,
                formerror: true
            }
        case ACTUAL_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        case EDIT_PROJECT:
            return {
                ...state,
                form: false,
                formerror: false,
                editproject: false,
                formproject: {
                    name: ''
                }
            }
        case ERROR_PROJECT:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}


export default ProjectReducer;
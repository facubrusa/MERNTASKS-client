import React, { useReducer } from 'react';

import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import { SHOW_FORM_PROJECT, 
    FORM_PROJECT,
    GET_PROJECTS, 
    ADD_PROJECT, 
    VALIDATE_FORM, 
    ACTUAL_PROJECT, 
    EDIT_FORM_PROJECT,
    DELETE_PROJECT, 
    EDIT_PROJECT,
    ERROR_PROJECT } from '../../types/index';
import clientAxios from '../../config/Axios';

const ProjectState = props => {

    const initialState = { 
        form: false,
        editproject: false,
        projects : [],
        formerror: false,
        project: null,
        message: null,
        formproject: {
            name: ''
        }
    };

    // Dispatch for ejecute actions
    const [state, dispatch] = useReducer(ProjectReducer, initialState);

    // Serie of functions
    const showForm = () => {
        dispatch({
            type: SHOW_FORM_PROJECT
        });
    }

    // Manage the name of the new project
    const saveProject = (target) => {
        dispatch({
            type: FORM_PROJECT,
            payload: target
        });
    }

    // Get the projects
    const getProjects = async () => {
        try {
            const response = await clientAxios.get('/api/projects');

            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects
            });
        } catch (error) {
            const alert = {
                msg: 'Ops! Something failed',
                category: 'alert-error'
            };
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }
    }

    // Add project and reset form
    const addProject = async (project) => {
        try {
            const response = await clientAxios.post('/api/projects', project);

            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            });
        } catch (error) {
            const alert = {
                msg: 'Ops! Something failed',
                category: 'alert-error'
            };
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }
    }

    // Show error if name of project is empty
    const validateForm = () => {
        dispatch({
            type: VALIDATE_FORM
        });
    }

    // Actual project or active project
    const actualProject = idProject => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: idProject
        });
    }

    // Edit form project
    const editFormProject = (name) => {
        dispatch({
            type: EDIT_FORM_PROJECT,
            payload: name
        });
    }

    const editProject = async (idProject, project) => {
        try {
            await clientAxios.put(`/api/projects/${idProject}`, project);
            dispatch({
                type: EDIT_PROJECT
            });

            getProjects(); //Refresh the name of the edited project
        } catch (error) {
            const alert = {
                msg: 'Ops! Something failed',
                category: 'alert-error'
            };
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }
    }

    // Delete project
    const deleteProject = async idProject => {
        try {
            await clientAxios.delete(`/api/projects/${idProject}`);

            dispatch({
                type: DELETE_PROJECT,
                payload: idProject
            });
        } catch (error) {
            const alert = {
                msg: 'Ops! Something failed',
                category: 'alert-error'
            };
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }
    }

    return (
        <ProjectContext.Provider
            value={{
                form: state.form,
                editproject: state.editproject,
                projects: state.projects,
                formerror: state.formerror,
                project: state.project,
                message: state.message,
                formproject: state.formproject,
                showForm,
                saveProject,
                getProjects,
                addProject,
                validateForm,
                actualProject,
                editFormProject,
                editProject,
                deleteProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;
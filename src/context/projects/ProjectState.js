import React, { useReducer } from 'react';

import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import { SHOW_FORM_PROJECT, FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, VALIDATE_FORM, ACTUAL_PROJECT, DELETE_PROJECT, ERROR_PROJECT } from '../../types/index';
import clientAxios from '../../config/Axios';

const ProjectState = props => {

    const initialState = { 
        form: false,
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
    const saveProjects = (e) => {
        dispatch({
            type: FORM_PROJECT,
            payload: e
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
            console.log(error);
        }
    }

    // Add project to state
    const addProject = async (project) => {
        try {
            const response = await clientAxios.post('/api/projects', project);

            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
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

    // Edit project
    const editProject = async idProject => {
        console.log(idProject);
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
                projects: state.projects,
                formerror: state.formerror,
                project: state.project,
                message: state.message,
                formproject: state.formproject,
                showForm: showForm,
                saveProjects: saveProjects,
                getProjects: getProjects,
                addProject: addProject,
                validateForm: validateForm,
                actualProject: actualProject,
                editProject: editProject,
                deleteProject: deleteProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;
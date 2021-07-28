import React, { Fragment, useContext, useEffect } from 'react'
import ProjectContext from '../../context/projects/ProjectContext';
const NewProject = () => {

    const projectContext = useContext(ProjectContext);
    const { form, editproject, formerror, formproject, project, showForm, saveProject, addProject, validateForm, editProject } = projectContext;

    const { name } = formproject;

    let actualProject;
    if(project) {
        // Apply array destructuring
        [ actualProject ] = project;
    }

    useEffect(() => {
        // Reload the component when i edit the project name
    }, [editproject]);

    const handleChange = e => {
        saveProject(e.target);
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Validate the project
        if(name.trim() === '') {
            validateForm();
            return;
        }
        // Add to state and Reset the form
        if(editproject){
            editProject(actualProject._id, formproject);
        } else {
            addProject(formproject);
        }
    }


    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => showForm()}
            >New Project</button>

            { form ? 
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={handleSubmit}
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="New Project"
                            name="name"
                            value={name}
                            onChange={handleChange}
                        />

                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value={ editproject ? 'Edit Project' : 'Add Project'}
                        />
                    </form>
                ) : null 
            }

            { formerror ? <p className="mensaje error">You must enter the project name</p> : null }
            
        </Fragment>
    );
}
 
export default NewProject;
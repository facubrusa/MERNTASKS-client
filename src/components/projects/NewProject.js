import React, { Fragment, useState, useContext } from 'react'
import ProjectContext from '../../context/projects/ProjectContext';
const NewProject = () => {

    const projectContext = useContext(ProjectContext);
    const { form, formerror, formproject, showForm, saveProjects, addProject, validateForm } = projectContext;

    const [project, saveProject] = useState({
        name: ''
    });

    console.log(project);
    console.log(formproject);
    const { name } = project;

    const handleChange = e => {
        saveProject({
            ...project,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Validate the project
        if(name.trim() === '') {
            validateForm();
            return;
        }
        // Add to state
        addProject(project);

        // Reset the form
        saveProject({
            name: 'asdasd'
        });
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
                            value="Add Project"
                        />
                    </form>
                ) : null 
            }

            { formerror ? <p className="mensaje error">You must enter the project name</p> : null }
            
        </Fragment>
    );
}
 
export default NewProject;
import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

const Project = ({project}) => {
    // Extract project from initial state
    const projectContext = useContext(ProjectContext);
    const { actualProject } = projectContext;

    const taskContext = useContext(TaskContext);
    const { getTasks } = taskContext;

    const selectProject = idProject => {
        actualProject(idProject);
        getTasks(idProject);
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project._id)}
            >{project.name}</button>
        </li>
    );
}
 
export default Project;
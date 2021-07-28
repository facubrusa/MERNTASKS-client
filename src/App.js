import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Projects from './components/projects/Projects';

import ProjectState from './context/projects/ProjectState';
import TaskState from './context/tasks/TaskState';
import AlertState from './context/alerts/AlertState';
import AuthState from './context/authentication/AuthState';
import setToken from './config/Token';
import PrivateRoute from './components/routes/PrivateRoute';

const token = localStorage.getItem('token');
if(token) {
  setToken(token);
}

function App() {
  return (
    <ProjectState>
        <TaskState>
          <AlertState>
            <AuthState>
                <Router>
                  <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute exact path="/projects" component={Projects} />
                  </Switch>
                </Router>
              </AuthState>
            </AlertState>
        </TaskState>
    </ProjectState>
  );
}

export default App;

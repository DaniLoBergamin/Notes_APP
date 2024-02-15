import React from 'react'

// BrowserRouter - Contains the routes; 
// Switch - Element for exchanging routes;
// Route - Route.
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HomeScreen from './screens/home';
import RegisterScreen from './screens/auth/register';
import LoginScreen from './screens/auth/login';
import NotesIndexScreen from './screens/notes/index';
import UsersEditScreen from './screens/users/edit';

import PrivateRoute from './components/auth/private_route';
/* PrivateRoute - Only the user who is logged in will have access to /notes and users/edit */

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/register' component={RegisterScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <PrivateRoute exact path='/notes' component={NotesIndexScreen} />
            <PrivateRoute exact path='/users/edit' component={UsersEditScreen} />
        </Switch>
    </BrowserRouter>
)

export default Routes;
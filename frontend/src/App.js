//Importing pre made packages 
import React from 'react';
import { Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { UserContextProvider } from './Modules/Users/context';
import  routes, {renderRoutes } from './Routes';


const history = createBrowserHistory();

export default function App () {
    return (
        <div>
            <UserContextProvider>
                <Router history={history}>
                    {renderRoutes(routes)}
                </Router>
            </UserContextProvider>
        </div>
    )
}
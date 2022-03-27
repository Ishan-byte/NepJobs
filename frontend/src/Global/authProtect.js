import React from 'react';
import PropTypes from 'prop-types';

import {pagePath, routes} from '../Routes/path';
import {getUser} from '../Utils/SessionManager';
import {Redirect} from 'react-router-dom';
AuthProtect.propTypes = {
    children: PropTypes.node
  };
function AuthProtect({children, authUsers}) {
    console.log(authUsers);
    const currentUser = getUser(); //gets the user data from the local storage

    if(!currentUser) {
        return <Redirect to={pagePath.app.login}/>
    }

    const { role, is_registered} = currentUser;
    console.log(is_registered);
    if(!is_registered) {
        return <Redirect to={pagePath.app.waitForApproval}/> 
    }

    if(authUsers.length === 0){
        return <>{children}</>
    }

    if(authUsers && authUsers.includes(role)) {
        return <>{children}</>
    }else{
        return <Redirect to={routes.app}/>
    }

}   

export default AuthProtect;
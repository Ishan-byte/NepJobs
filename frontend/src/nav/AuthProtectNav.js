import React from "react";
import PropTypes from 'prop-types';
import { getUser } from "../Utils/SessionManager";

AuthProtectNav.propTypes = {
    children: PropTypes.node
};

function AuthProtectNav({children, authUsers}) {
   const currentUser = getUser();
   if(!currentUser){
    return <div></div>;
   }
   const {role} = currentUser; 

  if(authUsers.length===0){
    return <>{children}</>;
  }
  if (authUsers && authUsers.includes(role)) {
    return <>{children}</>;
  } else {
    return <div></div>;
  }
}
export default AuthProtectNav;
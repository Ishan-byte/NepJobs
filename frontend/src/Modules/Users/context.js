import React, { createContext, useReducer } from 'react';
import actions from './actions';
import * as Service from './services';
import userReducer from './reducers';
import { getToken } from '../../Utils/SessionManager';


const initialState = {
    user_information: {},
    refresh: false
};

const accessToken = getToken();

export const UserContext = createContext(initialState);

export const UserContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(userReducer, initialState);


    //Login function
    async function userLogin(payload) {
        var form = new FormData();
        form.append("email", payload.email);
        form.append("password", payload.password);

        const res = await Service.login(form);
        console.log(res);
        dispatch({type: actions.SET_USER, data: res.data});
        return res;
    }
    async function getAllRoles(payload) {
        return await Service.getAllRole();
    }

    //Register function
    async function addUser(payload) {
        var form = new FormData();
        form.append("email", payload.email);
        form.append("password", payload.password);
        form.append("fullname", payload.fullName);
        form.append("dateOfBirth", payload.dob);
        form.append("country", payload.country);
        form.append("role", payload.role);

        return await Service.addUser(form);
    }

    //approving the user function\
  

    //GetAllusers function
    async function getAllUser(payload) {
        return await Service.getAllUser(payload);
    }

    //GetAllroles function
    async function getAllRole(payload) {
        return await Service.getAllRole(payload);
    }

    function logOut() {
        return Service.logOut();
    }


    return (
        <UserContext.Provider value={{ addUser, getAllRoles, userLogin, logOut, getAllUser, getAllRole}}>{children}</UserContext.Provider>
    )
} 
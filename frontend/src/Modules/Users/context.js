import React, { createContext, useEffect, useReducer } from "react";
import actions from "./actions";
import * as Service from "./services";
import userReducer from "./reducers";

const initialState = {
  user_information: {},
  list: [],
  refresh: false,
};

export const UserContext = createContext(initialState);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  //Login function
  async function userLogin(payload) {
    var form = new FormData();
    form.append("email", payload.email);
    form.append("password", payload.password);

    const res = await Service.login(form);
    console.log(res);
    dispatch({ type: actions.SET_USER, data: res.data });
    return res;
  }
  async function getAllRoles(payload) {
    return await Service.getAllRole();
  }

  async function getById(id) {
    return await Service.getById(id);
  }

  async function approveUser(id) {
    return await Service.approveUser(id);
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

  async function editUser(id, payload) {
    console.log(id);
    return await Service.editUser(id, payload);
  }

  //approving the user function\

  //GetAllusers function
  async function getAllUser() {
    try {
      const res = await Service.getAllUser();
      dispatch({ type: actions.SET_LIST, data: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  //GetAllroles function
  async function getAllRole() {
    return await Service.getAllRole();
  }
  async function refreshData() {
    dispatch({ type: actions.REFRESH_DATA, data: true });
  }

  function logOut() {
    return Service.logOut();
  }

  useEffect(() => {
    if (state.refresh === true) {
      Service.getAllUser().then((res) => {
        dispatch({ type: actions.SET_LIST, data: res.data });
        dispatch({ type: actions.REFRESH_DATA, data: false });
      });
    }
  }, [state.refresh]);

  return (
    <UserContext.Provider
      value={{
        user_info: state.user_information,
        list: state.list,
        addUser,
        getAllRoles,
        userLogin,
        logOut,
        getAllUser,
        getAllRole,
        approveUser,
        refreshData,
        editUser,
        getById
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

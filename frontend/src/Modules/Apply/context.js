import React, { createContext, useEffect, useReducer } from "react";
import actions from "./actions";
import * as Service from "./services";
import applyReducer from "./reducers";

const initialState = {
    applies: [],
    refresh: false,
};

export const ApplyContext = createContext(initialState);

export const ApplyContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(applyReducer, initialState);
    async function getAllApplies() {
        try {
            const res = await Service.getAllApplies();
            dispatch({ type: actions.SET_APPLIES, data: res.data });
        } catch (err) {
            console.log(err.message);
        }
    }

    function cmp(a, b){
        console.log(a.job.employer_id)
        return a.job.employer_id === b;
    }

    async function getByEmployer(id) {
        try {
            const arr = state.applies;
            console.log(typeof arr[0].job.employer_id)
            const res = arr.filter();
            return res;
        } catch (err) {
            console.log(err.message);
        }
    }

    function getByEmployee(id) {
        try {
            const res = state.applies.filter(e=>e.employee._id == id);
            return res;
        } catch (err) {
            console.log(err.message);
        }
    }

    function toFormData(o) {
        return Object.entries(o).reduce((d,e) => (d.append(...e),d), new FormData())
      }

    function refreshData() {
        dispatch({ type: actions.REFRESH_DATA, data: true});
    }

    async function addApply(payload) {
        try {
            const form = toFormData(payload)
            const res = await Service.addApply(form);
            dispatch({ type: actions.REFRESH_DATA, data: true});
        } catch (err) {
            throw err;
        }
    }

    async function acceptApplication(id) {
        try {
            const res = await Service.acceptApplication(id);
            return res;
        } catch (err) {
            throw err;
        }
    }
    async function rejectApplication(id) {
        try {
            const res = await Service.rejectionApplication(id);
            return res;
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        console.log(state.refresh)
        if (state.refresh === true) {
            console.log("ok")
            Service.getAllApplies().then((res) => {
                dispatch({ type: actions.SET_APPLIES, data: res.data });
                dispatch({ type: actions.REFRESH_DATA, data: false });
            }
            )
        }
    }, [state.refresh]);
    return (
        <ApplyContext.Provider
            value={{
                applies: state.applies,
                getAllApplies,
                refreshData,
                addApply,
                getByEmployee,
                getByEmployer,
                acceptApplication,
                rejectApplication
            }}
        >
            {children}
        </ApplyContext.Provider>
    );
}
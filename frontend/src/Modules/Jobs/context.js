import React, { createContext, useEffect, useReducer } from "react";
import actions from "./actions";
import * as Service from "./services";
import userReducer from "./reducers";

const initialState = {
    jobs: [],
    refresh: false,
};

export const JobsContext = createContext(initialState);

export const JobsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    async function getAllJobs() {
        try {
            const res = await Service.getAllJobs();
            dispatch({ type: actions.SET_JOBS, data: res.data });
        } catch (err) {
            console.log(err.message);
        }
    }

    async function getByEmployer(id) {
        try {
            const res = await Service.getByEmployer(id);
            dispatch({ type: actions.REFRESH_DATA, data: true });
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    function toFormData(o) {
        return Object.entries(o).reduce((d, e) => (d.append(...e), d), new FormData())
    }

    async function addNewJob(payload) {
        const form = toFormData(payload);
        form.delete("requirements")
        payload.requirements.map((req) => {
            form.append("requirements", req)
        })
        const res = await Service.addNewJob(form);
        refreshData()
        return res;
    }

    async function updateJob(id, payload) {
        const res = await Service.updateJob(id,payload);
        refreshData()
        return res;
    }

    async function refreshData() {
        dispatch({ type: actions.REFRESH_DATA, data: true });
    }

    useEffect(() => {
        if (state.refresh === true) {
            Service.getAllJobs().then((res) => {
                dispatch({ type: actions.SET_JOBS, data: res.data });
                dispatch({ type: actions.REFRESH_DATA, data: false });
            });
        }
    }, [state.refresh]);

    return (
        <JobsContext.Provider
            value={{
                jobs: state.jobs,
                getAllJobs,
                refreshData,
                addNewJob,
                getByEmployer,
                updateJob
            }}
        >
            {children}
        </JobsContext.Provider>
    );
};


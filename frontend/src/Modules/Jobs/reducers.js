import actions from "./actions";

const userReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_JOBS:
            return { ...state, jobs: action.data };
        case actions.REFRESH_DATA:
            return { ...state, refresh: action.data }
        default:
            return state;
    }
};

export default userReducer;
import actions from "./actions";

const applyReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_APPLIES:
            return { ...state, applies: action.data };
        case actions.REFRESH_DATA:
            return { ...state, refresh: action.data }
        default:
            return state;
    }
};

export default applyReducer;
import actions from "./actions";

const userReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_USER: 
            return { ...state, user_information: action.data};
        case actions.SET_LIST: 
            return { ...state, list: action.data};
        case actions.REFRESH_DATA:
            return {...state, refresh: action.data}
        default: 
            return state;
        }
};

export default userReducer;
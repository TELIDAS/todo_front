import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER_ERROR
} from "../actions/loginActions";

const initialState = {
    user: null,
    userError: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type){
        case REGISTER_ERROR:
            return {...state, user: null, userError: action.error}
        case LOGIN_SUCCESS:
            return {...state, user: action.data, userError: null}
        case LOGIN_ERROR:
            return {...state, user: null, userError: action.error}
        default:
            return state
    }
}
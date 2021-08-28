import {
    GET_TODOS_SUCCESS,
    GET_TODOS_ERROR
} from "../actions/todoActions";

const initialState = {
    todoList: [],
    todoListError: null
}

export const todoReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_TODOS_SUCCESS:
            return {...state, todoList: action.data, todoListError: null}
        case GET_TODOS_ERROR:
            return {...state, todoList: null, todoListError: action.error}
        default:
            return state
    }
}

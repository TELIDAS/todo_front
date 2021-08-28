import { axiosAPI } from '../../axiosAPI'

export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
export const GET_TODOS_ERROR = 'GET_TODOS_ERROR';

export const POST_TODO_SUCCESS = 'POST_TODO_SUCCESS';
export const POST_TODO_ERROR = 'POST_TODO_ERROR';

export const getTodosSuccess = (data) => ({type: GET_TODOS_SUCCESS, data})
export const getTodosError = (error) => ({type: GET_TODOS_ERROR, error})

export const postTodoSuccess = (data) => ({type: POST_TODO_SUCCESS, data})
export const postTodoError = (error) => ({type: POST_TODO_ERROR, error})


export const fetchTodos = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axiosAPI.get('api/v2/todos/')

            dispatch(getTodosSuccess(data))

            return data
        } catch(e){
            dispatch(getTodosError(e))
        }
    }
}

export const addTodo = (todo) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axiosAPI.post('api/v2/todos/', todo)

            dispatch(postTodoSuccess(data))

            await fetchTodos()

            return data
        }catch (e) {
            dispatch(postTodoError(e))
        }
    }
}

export const deleteTodo = (id) => {
    return async (dispatch) => {
        try {
           return await axiosAPI.delete(`api/v2/todos/${id}/`)
        }catch (e) {
            console.log(e)
        }
    }
}

export const changeTodo = (id, todo) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosAPI.put(`api/v2/todos/${id}/`, todo)

            return data
        }catch (e) {
            console.log(e)
        }
    }
}
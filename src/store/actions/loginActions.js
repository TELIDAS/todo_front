import {axiosAPI} from "../../axiosAPI";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const loginSuccess = (data) => ({type: LOGIN_SUCCESS, data})
export const loginError = (error) => ({ type: LOGIN_ERROR, error })

export const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, user})
export const registerError = (error) => ({ type: REGISTER_ERROR, error})

export const login = (user) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosAPI.post('api/login/', user)

            const newData = {
                username: data.username,
                email: data.email
            }

            localStorage.setItem('_todo:user', JSON.stringify(newData))
            localStorage.setItem('_todo:access', data.access)
            localStorage.setItem('_todo:refresh', data.refresh)

            dispatch(loginSuccess(newData))

            return data
        }catch (e){
            dispatch(loginError(e))
        }
    }
}

export const register = (user) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosAPI.post('api/register/', user)

            dispatch(registerSuccess(data))

            return data
        }catch (e) {
            dispatch(registerError(e))
        }
    }
}

export const refreshToken = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axiosAPI.post('api/login/refresh/', {
                refresh: localStorage.getItem('_todo:refresh')
            })

            localStorage.setItem('_todo:access', data.access)

            return data
        }catch (e) {
            return null
        }
    }
}
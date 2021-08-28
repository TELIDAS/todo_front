import axios from 'axios'

export const axiosAPI = axios.create({
    baseURL: 'https://damp-forest-25291.herokuapp.com/'
})
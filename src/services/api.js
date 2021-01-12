import axios from 'axios'
import {environments} from '../env'

const apiUrl = environments.apiUrl

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''}`
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


export const get = (url) => {
    return axios.get(`${apiUrl}${url}`)
}

export const post = (url, request) => {
    return axios.post(`${apiUrl}${url}`, request)
}

export const put = (url, request) => {
    return axios.put(`${apiUrl}${url}`,request)
}

export const remove = (url) => {
    return axios.delete(`${apiUrl}${url}`)
}

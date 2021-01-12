import { post } from "./api"

const url1 = '/users/login'

export const loginUser = (value) => {
    return post(url1, value)
}
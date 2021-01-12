import { get, post, put, remove } from "./api"

const url1 = '/animals/create'
const url2 = '/animals/delete'
const url3 = '/animals/get-all'
const url4 = '/animals/save-image'

export const saveAnimal = request => {
    return post(url1, request)
}

export const deleteAnimal = id => {
    return remove(`${url2}/${id}`)
}

export const getAllAnimals = () => {
    return get(url3)
}

export const saveImage = request => {
    return put(url4, request)
}


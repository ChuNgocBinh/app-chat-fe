import axios from "./interceptor";
// import request from "./interceptor";
const URL = 'http://localhost:8080'

export const login = async (data) => {
    const result = await axios({
        url: URL + '/auth/login',
        method: 'post',
        data
    })
    return result
}

export const signup = async (data) => {
    const result = await axios({
        url: URL + '/auth/signup',
        method: 'post',
        data
    })
    return result
}

export const findUser = async (data) => {
    const result = await axios({
        url: URL + '/user',
        method: 'get',
        params: data
    })
    return result
}

export const getMe = async () => {
    const result = await axios({
        url: URL + '/user/me',
        method: 'get',
    })
    return result
}

export const getChat = async (data) => {
    const result = await axios({
        url: URL + '/chat',
        method: 'get',
        params: data
    })
    return result
}

export const createChat = async (data) => {
    const result = await axios({
        url: URL + '/chat/create',
        method: 'post',
        data: data
    })
    return result
}

export const getChatOfMe = async () => {
    const result = await axios({
        url: URL + '/chat/me',
        method: 'get',
    })
    return result
}

export const createMessage = async (data) => {
    const result = await axios({
        url: URL + '/conversation/create',
        method: 'post',
        data
    })
    return result
}

export const getMessages = async (chat_id) => {
    const result = await axios({
        url: URL + `/conversation/${chat_id}`,
        method: 'get',
    })
    return result
}
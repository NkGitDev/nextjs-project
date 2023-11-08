import axios from "axios";
import {httpAxios} from '../helper/httpHelper'

export async function userSignUp(user){
    const result = await httpAxios.post('/api/users', user).then(response => response.data)
    return result;
}

export async function userLogin(loginData){
    const result = await httpAxios.post('/api/login', loginData).then(response => response.data)
    return result;
}

export async function currentUser(){
    const result = await httpAxios.get('/api/current-login').then(response => response.data)
    return result;
}

export async function logout(){
    const result = await httpAxios.post('/api/logout').then(response => response.data)
    return result;
}
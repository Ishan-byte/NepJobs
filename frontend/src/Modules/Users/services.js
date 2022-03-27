import axios from 'axios';
import {USER, ROLES} from '../../Constants/Api.js';
import { saveUser, saveUserToken, saveUserPermissions, getToken } from '../../Utils/SessionManager';


//getting token of the loggedIn user
const accessToken = getToken();

// function for Login
export async function login(payload){
    return new Promise((resolve, reject) => {
        axios.post(USER + '/login', payload )
        .then((res) => {
            saveUser(res.data);
            saveUserToken(res.data.token);
            saveUserPermissions(res.data.permissions);
            resolve({sucess: true, status:200, data:res.data})
        })
        .catch((err) => {
            reject(err);
        })
    });
}

// function for register
export async function addUser(payload){
    return new Promise((resolve, reject) => {
        axios.post(USER + '/register', payload)
        .then((res) => {
            resolve({sucess: true, status: 200, data: res.data})
        }).catch((err) => {
            reject(err)
        })
    })
}

//function for getting all the users
export async function getAllUser (payload) {
    try {
        const res = await axios.get(USER, payload, {
            headers: {
                'access_token' : accessToken
            }
        });

        return res;
    }
    catch(err) {
        console.error(err);
    }
}


//function for getting all the user roles
export async function getAllRole () {
    try {
        const response = await axios.get(ROLES);
        return response.data.data;
    }
    catch(err) {
        return err;
    }
}


//function for verifying token
export async function verifyToken(token) {
    try {
        const response = await axios.get(USER + `/auth/${token}`);
        return response;
    }
    catch(err) {
        console.error(err);
    }
}


//function for logging out

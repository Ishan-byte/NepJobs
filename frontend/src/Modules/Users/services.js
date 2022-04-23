import axios from 'axios';
import {USER, ROLES} from '../../Constants/Api.js';
import { saveUser, saveUserToken, saveUserPermissions, getToken, logOutUser } from '../../Utils/SessionManager';


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

export async function editUser(id, payload) {
    return new Promise((resolve, reject) => {
        axios.post(USER + `/${id}/update`, payload,
            {
                headers: {
                    'access_token': accessToken
                }
            }

        )
            .then((res) => {
                resolve({ sucess: true, status: 200, data: res.data })
            }).catch((err) => {
                reject(err)
            })
    })
}

//function for getting all the users
export async function getAllUser () {
    try {
        const res = await axios.get(USER, {
            headers: {
                'access_token' : accessToken
            }
        });
        return res;
    }
    catch(err) {
        throw err;
    }
}

export async function getById(id) {
    try {
        const res = await axios.get(USER+`/${id}`, {
            headers: {
                'access_token' : accessToken
            }
        });
        return res.data;
    }
    catch(err) {
        throw err;
    }
}


//function for getting all the user roles
export async function getAllRole () {
    try {
        const response = await axios.get(ROLES);
        return response.data;
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


//approve a user
export async function approveUser(id) {
    try {
        const response = await axios.post(USER + `/approve/${id}`,{},{
            headers:{
                access_token: accessToken
            }
        });
        return response;
    }
    catch(err) {
        console.error(err);
    }
}


//function for logging out
export function logOut() {
    logOutUser();
}

import axios from 'axios';
import {JOB, ROLES} from '../../Constants/Api.js';
import { saveUser, saveUserToken, saveUserPermissions, getToken, logOutUser } from '../../Utils/SessionManager';


//getting token of the loggedIn user
const accessToken = getToken();

// function for Login
//function for getting all the users
export async function getAllJobs () {
    try {
        const res = await axios.get(JOB, {
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

export async function getByEmployer(id) {
    try {
        const res = await axios.get(JOB + `/employee/${id}`,  {
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

export async function addNewJob(payload) {
    try {
        const res = await axios.post(JOB + '/register',payload, {
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

import axios from 'axios';
import { saveUser, saveUserToken, saveUserPermissions, getToken, logOutUser } from '../../Utils/SessionManager';
import { APPLY } from '../../Constants/Api';


const accessToken = getToken();


export async function getAllApplies(){
    try{
        const res = await axios.get(APPLY ,{
            headers:{
                'access_token' : accessToken
            }
        })
        return res;
    }
    catch(err){
        throw err;
    }
}


export async function addApply(payload) {
    try {
        const res = await axios.post(APPLY+ `/register/${accessToken}`,payload, {
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

export async function acceptApplication(id) {
    try {
        const res = await axios.post(APPLY+ `/approve/${id}`,{}, {
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

export async function rejectionApplication(id) {
    try {
        const res = await axios.post(APPLY+ `/reject/${id}`,{}, {
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
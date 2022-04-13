require('dotenv').config();

const server_URL = process.env.REACT_APP_API_SERVER
const base_URL = server_URL + '/api/v1'

module.exports={
    USER: base_URL + '/User',
    ROLES: base_URL + '/Roles',
    JOB: base_URL + '/Job',
    APPLY: base_URL + '/Apply',
}
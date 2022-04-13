const { JOB } = require('../../constant/permissions');
const controllers = require('./apply.controllers')
const validators = require('./apply.validators')

const routes = {
    list: {
        method: 'GET',
        path: '',
        description: 'Lists all of the existing job applies',
    },
    add: {
        method: 'POST',
        path: '/register/{access_token}',
        description: 'Registers a job apply in the database',
        uploadPayload: {
            output:'stream',
            parse:true,
            multipart: true,
            allow: 'multipart/form-data',
        },
    },
    getById: {
        method: 'GET',
        path: '/{id}',
        description: "Getting job info by id"
    },
    approveApplication:{
        method:'POST',
        path: '/approve/{id}',
        description: "approve application"
    },
    rejectApplication:{
        method:'POST',
        path: '/reject/{id}',
        description: "reject application"
    }
}

function register(app){
    app.register({
        name: 'Apply',
        routes,
        controllers,
        validators
    })
}

module.exports = register; 
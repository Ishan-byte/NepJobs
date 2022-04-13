const { JOB } = require('../../constant/permissions');
const controllers = require('./job.controllers')
const validators = require('./job.validators')

const routes = {
    list: {
        method: 'GET',
        path: '',
        description: 'Lists all of the existing jobs',
    },
    add: {
        method: 'POST',
        path: '/register',
        description: 'Registers a job in the database',
        uploadPayload: {
            output:'stream',
            parse:true,
            multipart: true,
            allow: 'multipart/form-data',
        },
        permissions:[JOB.WRITE]
    },
    getById: {
        method: 'GET',
        path: '/{id}',
        description: "Getting job info by id",
    },
    update: {
        method: 'POST',
        path: '/{id}',
        description: "Update job info by id",
    },
    getByEmployee: {
        method: 'GET',
        path: '/employee/{id}',
        description: "Get all the ids posted by the employee"
    },
}

function register(app){
    app.register({
        name: 'Job',
        routes,
        controllers,
        validators
    })
}

module.exports = register; 
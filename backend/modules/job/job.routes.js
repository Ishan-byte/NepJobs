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
    },
    getById: {
        method: 'GET',
        path: '/{id}',
        description: "Getting job info by id"
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
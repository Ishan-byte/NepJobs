const Joi = require('joi-oid');

module.exports = {

    //Validator for register
    add: {
        payload: Joi.object({
            title: Joi.string().description('Name of the role'),
            description: Joi.string().description("Description of job"),
            requirements: Joi.array().description("Requirements of job"),
            status: Joi.string().description("Status of the job"),
            salary: Joi.number().description("salary of job"),
        })
    },
    archive: {
        params: Joi.object({
            id: Joi.objectId(),
        })
    },
    getById: {
        params: Joi.object({
            id: Joi.objectId(),
        })
    },
}
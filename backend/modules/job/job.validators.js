const Joi = require('joi-oid');

module.exports = {

    //Validator for register
    add: {
        payload: Joi.object({
            title: Joi.string().description('Name of the role'),
            description: Joi.string().description("Description of job"),
            requirements: Joi.array().description("Requirements of job"),
            is_available: Joi.boolean().description("is the job available now"),
            salary: Joi.number().description("salary of job"),
            salary_negotiable: Joi.boolean().description("is salary negotiable"),
            number_of_employee: Joi.number().description("Number of employees"),
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
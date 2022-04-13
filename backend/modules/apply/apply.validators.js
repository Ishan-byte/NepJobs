const Joi = require('joi-oid');

module.exports = {

    //For getbyid
    getById: {
        params: Joi.object({
            id: Joi.objectId(),
        }),
    },

    //For findbyid
    findById: {
        params: Joi.object({
            id: Joi.objectId(),
        })
    },


    //For register
    add: {
        params: Joi.object({
            access_token: Joi.string(),
        }),
        payload: Joi.object({
            job_id: Joi.objectId().description("Email of the user"),
            remarks: Joi.string().description("Password of the user"),
        })
    },

    //For archive
    archive: {
        params: Joi.object({
            id: Joi.objectId(),
        })
    },
    approveApplicaton: {
        params: Joi.object({
            id: Joi.objectId(),
        })
    },
    rejectApplicaton: {
        params: Joi.object({
            id: Joi.objectId(),
        })
    },

    //For update
    update: {
        params: Joi.object({
            token: Joi.string(),
        }),
        payload: Joi.object({
            job_id: Joi.objectId().description("Email of the user"),
            remarks: Joi.string().description("Password of the user"),
        })
    },

    
}
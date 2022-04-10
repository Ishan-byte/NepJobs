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
    approve: {
        params: Joi.object({
            id: Joi.objectId(),
        })
    },

    //For findbyroles
    findByRoles: {
        params: Joi.object({
            role: Joi.string(),
        })
    },

    //For register
    register: {
        payload: Joi.object({
            email: Joi.string().description("Email of the user"),
            password: Joi.string().description("Password of the user"),
            fullname: Joi.string().description("Fullname of the user"),
            dateOfBirth: Joi.string().description("DOB of the user"),
            country: Joi.string().description("Country of the user"),
            role: Joi.string().description("Role of the user"),
        })
    },

    //For login 
    login: {
        payload: Joi.object({
            email: Joi.string().description("Email of the user"),
            password: Joi.string().description("Password of the user"),
        })
    },

    //For archive
    archive: {
        params: Joi.object({
            id: Joi.objectId(),
        })
    },

    //For update
    update: {
        params: Joi.object({
            id: Joi.objectId(),
        }),
        payload: Joi.object({
            fullname: Joi.string().description("Fullname of the user"),
            dateOfBirth: Joi.string().description("DOB of the user"),
            country: Joi.string().description("Country of the user"),
            role: Joi.string().description("Role of the user"),
        }),
    },

    //For changepassword
    changePassword: {
        payload: Joi.object({
            oldPassword: Joi.string().description("Old password of the user"),
            newPassword: Joi.string().description("New password of the user"),
        })
    }


    
}
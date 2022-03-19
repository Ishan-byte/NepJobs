const Joi = require('joi-oid');

module.exports = {

    //Validator for register
    register: {
        payload: Joi.object({
            name: Joi.string().description('Name of the role'),
            permissions: Joi.array().description("Permissions for the Role")
        })
    },


    //Validator for Deleterole
    delete: {
        params: Joi.object({
            id: Joi.objectId(),
        })
    },

    //Validator for RoleCheck
    RoleCheck: {
        params: Joi.object({
            name: Joi.string().description("Name of the role")
        })
    },


    //Validator for GetRole
    getrole: {
        params: Joi.object({
            id: Joi.objectId(),
        })
    },
    
    
    
    //Validator for GetPermissions
    getPermissions: {
        params: Joi.object({
            name: Joi.string().description("Name of the role")
        })
    },


    //Validator for addPermissions
    AddPermissions: {
        payload: Joi.object({
            name: Joi.string().description("Name of the role"),
            permissions: Joi.array().description("Permissions to add in the role")
        })
    },


     //Validator for removePermissions
     RemovePermissions: {
        payload: Joi.object({
            name: Joi.string().description("Name of the role"),
            permissions: Joi.array().description("Permissions to remove in the role")
        })
    }

}
const { findByRoles } = require("./user.controllers");
const controllers = require("./user.controllers");
const validators = require("./user.validators");

//Constructing API's for the user controllers
const routes = {

    //Creating API for user register method
    register: {
        method: 'POST',
        path: '/register',
        description: 'Registers a new user in the database',
        uploadPayload: {
            output:'stream',
            parse:true,
            multipart: true,
            allow: 'multipart/form-data',
        },
    },

    //Creating API for user login method
    login: {
        method: 'POST',
        path: '/login',
        description: 'For User Login',
        uploadPayload: {
            output: 'stream',
            parse: true, 
            multipart: true,
            allow: 'multipart/form-data'
        }
    },

    //Creating API for changing Password
    changePassword: {
        method: 'PUT',
        path: '/changepassword/{token}',
        description: "Changing the user password",
        uploadPayload: {
            output: 'stream',
            parse: true,
            multipart: true,
            allow: 'multipart/form-data'
        }
    },



    //Creating API for archiving the user data
    archive: {
        method: 'DELETE',
        path: '/{id}',
        description: 'Archiving the user instead of deleting it permanantly',
    },



    //Creating API for updating the user information
    update: {
        method: 'POST',
        path: '/{id}/update',
        description:"Updating the user information"
    },


    //Creatng API for finding a user by its id
    findById: {
        method: 'GET',
        path: '/{id}',
        description: "Getting the user infromation according to the user"
    },


      //Creatng API for finding a user by its id
      findByRoles: {
        method: 'GET',
        path: '/role/{roles}',
        description: "Getting the user infromation according to the role"
    },







}//End of routes constant


//Creating a register function
function register(app){
    app.register({
        name: 'User',
        routes,
        controllers,
        validators
    })
}

module.exports = register; 
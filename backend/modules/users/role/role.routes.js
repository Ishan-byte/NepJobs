const validators = require('./role.validators');
const controllers = require('./role.controllers');


const routes = {

    //Creating API for role register method
    add: {
        method: 'POST',
        path: '',
        description: 'Registers a new role in the Role Table',
    },
    list: {
        method: 'GET',
        path: '',
        description: 'GET all roles',
    },


    //Creating API for getting a role information method
    getrole: {
        method: 'GET',
        path: '/{id}',
        description: 'Gets role information from the Role table',
  },


    //Creating API for deleting a role from the role table
    delete: {
        method: 'DELETE',
        path: '/{id}',
        description: 'Deletes a role from the Role Table'
    },


    //Creating API for getting permissions of a specific role from the Role table
    getPermissions: {
        method: 'GET',
        path: '/permissions/{name}',
        description: 'Gets permissions of a specific role from the Role Table'
    },


    //Creating API for adding permissions for a specific role in the Role Table
    AddPermissions: {
        method: 'PATCH',
        path: '/permissions/{id}',
        description: "Adds permissions of a specific role in the Role Table",
    },


    //Creating API for deleting permissions for a specific role in the Role Table
    RemovePermissions: {
        method: 'DELETE',
        path: '/permissions/{id}',
        description: "Removes permissions of a specific role from the Role Table"
    },

};


function register(app) {
    app.register({
        name: 'Roles',
        routes, validators, controllers,
    });
}


module.exports = register;
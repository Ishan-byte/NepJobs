// Importing a model exported from role.model.js and saving it in an constant value
const RoleModel = require('./role.model');
//Importing other necessary packages
require('dotenv').config();



//Making of the Role constant

const Role = {

    //to register a specific role
    async register (data) {
        const {name, permissions} = data;
        oldRole  = await RoleModel.findOne({ name: name});
        if(oldRole) {
            throw `Role with name ${name} already exists`;
        }

        if(permissions == null ){
            permissions = []
        }

        const role = await RoleModel.create({
            name : name.toUpperCase(),
            permissions: permissions
        });
        return role;
    },


    //to add a new role to the Role table
    async add (data) {
        return await this.register(data);
    },
    


    //to find a specific role information by its id 
    async getrole (id) {
        //getting a specific role by using its id
        const get = RoleModel.findById(id);
        return get;
    },


    //to archive a specific role information from Role table
    async archive (id) {
        const OldRole = await RoleModel.findById({_id: id, is_archived: false});
        if(!OldRole){
            throw `Role of ${id} does not exists`
        }

        const NewRole = await RoleModel.findByIdAndUpdate({id}, {is_archived: true});
        return NewRole;
    },


    //to get permissions of a specific role
    async getPermissions (name) {
        const user = await RoleModel.findOne({ name: name.toUpperCase()})
        
        return user ? user.permissions : [];
    },



    //to check whether the user's role is valid or not 
    async RoleCheck (name) {
        const check = await RoleModel.findOne({ name: name.toUpperCase()})
        return check != null;
    },


    //to add new permissions in a user role
    async AddPermissions (data) {
        const {id, permissions} = data;
        const OldRole = await RoleModel.findOne({_id: id, is_archived: false})

        if(!OldRole){
            throw `Role of ${id} does not exists`
        }

        if(permissions == null){
            permissions = []
        }

        NewPermissions = OldRole.permissions.concat(permissions);

        const NewRole = await RoleModel.findOneAndUpdate({_id: id}, {permissions: NewPermissions});
        return NewRole;
    },


    //to remove permissions in a user role
    async RemovePermissions (data) {
        const {id, permissions} = data;
        const OldRole = await RoleModel.findOne({_id: id, is_archived: false})

        if(!OldRole){
            throw `Role of ${id} does not exists`
        }

        if(permissions == null){
            permissions = []
        }

        const toDelete = new Set(permissions);

        const NewPermissions = OldRole.permissions.filter(x =>!toRemove.has(x));
        const NewRole = await RoleModel.findOneAndUpdate(id, {permissions: NewPermissions});
        return NewRole;
    }

}// Role component ends


//Exporting all of the functions created in Role constant for dynamic use throughout the app
module.exports = {
    Role, 
    add: (req) => Role.add(req.payload),
    getrole: (req) => Role.getrole(req.params.id),
    delete: (req) => Role.archive(req.params.id),
    getPermissions: (req) => Role.getPermissions(req.params.name),
    RoleCheck: (req) => Role.RoleCheck(req.params.name),
    AddPermissions: (req) => Role.AddPermissions(req.payload),
    RemovePermissions: (req) => Role.RemovePermissions(req.payload),
}
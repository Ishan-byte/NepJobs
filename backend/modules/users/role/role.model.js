//Importing necessary libraries and functions for running the component
const mongoose = require("mongoose")
const dynamicschema = require("../../../helpers/schema")


//Storing the user data into a constant to reduce hassle code
const schema = {
    name: { type: String, required: true},
    permissions : { type: Array, required: true},
    ...dynamicschema,
}

//Adding the constant as the original value inside the mongoose schema
const RoleSchema = mongoose.Schema( schema, {
    collection: 'Role',
    toObject: { virtuals: true},
    toJSON: {virtuals: true},
});

RoleSchema.index({ unique: true });

//exporting an instance of the schema as a model in order to use it in the entire backend

module.exports = mongoose.model('Role', RoleSchema);
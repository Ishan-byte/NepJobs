//Importing necessary libraries and functions for running the component
const Joi = require("joi");
const mongoose = require('mongoose');
const dynamicschema = require('../../../helpers/schema');

//Storing the user data into a constant to reduce hassle code

const schema = {
    email: {type: String, required: true, joi: Joi.string().email().description("Email of the user")},
    password: {type: String, required: true, joi: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).description("Password of the user")},
    fullname: {type: String, required: true, joi: Joi.string().description("Fullname of the user")},
    dateOfBirth: {type: String, required: true, joi: Joi.string().description("DOB of the user")},
    country: {type:String, required: true, joi: Joi.string().description("Country of the user")},
    role: {type: String, required: true, joi: Joi.string().description("Role of the user")},
    ...dynamicschema,
};

//Adding the constant as the original value inside the mongoose schema

const UserSchema = mongoose.Schema( schema, {
    collection: 'User',
    timestamps: {createdAt: 'created_at' , updatedAt: 'updated_at'},
    toObject : { virtuals: true},
    toJSON: { virtuals : true}
});

//setting email as index and making it unique, for reducing data repitation in email column

UserSchema.index({ email : 1}, { unique: true});

//exporting an instance of the schema as a model in order to use it in the entire backend

module.exports = mongoose.model('User', UserSchema);
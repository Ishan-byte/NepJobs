//Importing necessary libraries and functions for running the component
const { ObjectId } = require('mongoose').Schema;
const mongoose = require('mongoose');
const dynamicschema = require('../../helpers/schema');


const schema = {
    title: { type: String, required: true, description: "title of the job, example : frontend developer"},
    employer_id : {type : ObjectId, ref: "Users", required: true, description: "The user id of the employeer who posted the job"},
    description: { type: String, required: true, description: "Description of the job"},
    requirements: { type: Array, required: false, default:[],  description: "Requirements for the job, e.g. years of experience, language profeciency"},
    is_available: { type: String, required: true,default: true,  description: "is the job still available" },
    number_of_employee: { type: Number, required: true, default: 1, description: "how many employee is required or how many vacancy are left"},
    salary: { type: Number, required: true, description: "salary for the job"},
    salary_negotiable : { type: Boolean, required: true, default: false,  description: "Is the salary negotiable"},
    ...dynamicschema
}

const JobSchema = mongoose.Schema( schema, {
    collection: 'Job',
    toObject: { virtuals: true},
    toJSON: { virtuals: true},
});

module.exports = mongoose.model('Job', JobSchema);
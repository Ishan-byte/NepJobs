//Importing necessary libraries and functions for running the component
const mongoose = require('mongoose');
const dynamicschema = require('../../helpers/schema');


const schema = {
    title: { type: String, required: true},
    description: { type: String, required: true},
    requirements: { type: Array, required: true},
    status: { type: String, required: true},
    salary: { type: Number, required: true},
    ...dynamicschema
}

const JobSchema = mongoose.Schema( schema, {
    collection: 'Job',
    toObject: { virtuals: true},
    toJSON: { virtuals: true},
});

JobSchema.index({ unique: true});

module.exports = mongoose.model('Job', JobSchema);
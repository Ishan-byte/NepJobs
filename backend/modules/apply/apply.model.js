const { ObjectId } = require('mongoose').Schema;
const mongoose = require('mongoose');
const dynamicschema = require('../../helpers/schema');


const schema = {
    employee_id: { type: ObjectId,ref: "User", required: true, description: "User Id of the employee"},
    job_id: {type : ObjectId, ref: "Job", required: true, description: "Job Id"},
    status: {type: String, require: false,description: "Status of the job" },
    remarks : { type: String, required: true, description: "Remarks added by employee"},
    ...dynamicschema
}

const ApplySchema= mongoose.Schema( schema, {
    collection: 'Apply',
    toObject: { virtuals: true},
    toJSON: { virtuals: true},
});

module.exports = mongoose.model('Apply', ApplySchema);
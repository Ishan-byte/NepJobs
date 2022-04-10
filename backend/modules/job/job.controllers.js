const userControllers = require('../users/user/user.controllers');
const JobModel = require('./job.model');


const Job = {

    async list(){
        return await JobModel.find();
    },

    //to register a specific job
    async register (token, data) {

        console.log(token);
        const {user, permissions} = await userControllers.User.validateToken(token);
        const {title, description, requirements, status, salary} = data;
        const job = await JobModel.create({
           employer: user._id,
           title: title,
           description: description, 
           requirements: requirements, 
           status:status,
           salary: salary
        });

        return job;
    },


    async add (token, data) {
        return await this.register(token, data);
    },


    async getById (id){
        const get = await JobModel.findById(id);
        return get; 
    },

    async archive (id) {
        const job = await JobModel.findById(id);
        if(!job){
            throw { message: `Job of id  ${id} doesn't exist`, code:400};
        }
        job = await JobModel.findByIdAndUpdate({id}, {is_archived: true});
        return job;
    },
}

module.exports= {
    Job,
    add: (req) => Job.add(req.headers.access_token , req.payload),
    archive: (req) => Job.archive(req.params.id),
    list: (req)=>Job.list(),
    getById: (req)=>Job.getById(req.params.id)
}








const JobModel = require('./job.model');


const Job = {

    async list(){
        return await JobModel.find();
    },

    //to register a specific job
    async register (data) {
        const {title, description, requirements, status, salary} = data;
        console.log(data);
        const job = await JobModel.create({
           title: title,
           description: description, 
           requirements: requirements, 
           status:status,
           salary: salary
        });

        return job;
    },


    async add (data) {
        return await this.register(data);
    },


    async getById (id){
        const get = await JobModel.findById(id);
        return get; 
    },

    async archive (id) {
        const job = await JobModel.findById(id);
        if(!job){
            throw `Job of id  ${id} doesn't exist`;
        }
        job = await JobModel.findByIdAndUpdate({id}, {is_archived: true});
        return job;
    },
}

module.exports= {
    Job,
    add: (req) => Job.add(req.payload),
    archive: (req) => Job.archive(req.params.id),
    list: (req)=>Job.list(),
    getById: (req)=>Job.getById(req.params.id)
}








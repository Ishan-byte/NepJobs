const { default: mongoose } = require('mongoose');
const jobModel = require('../job/job.model');
const { User } = require('../users/user/user.controllers');
const userControllers = require('../users/user/user.controllers');
const UserModel = require('../users/user/user.model');
const ApplyModel = require('./apply.model')

const Apply = {

    async list(token) {

        const { user, permissions } = await userControllers.User.validateToken(token);

        var query = {}

        if(user.role == "JOBSEEKER"){
            query = {employee_id : new mongoose.Types.ObjectId(user._id)}
        }else if(user.role == "EMPLOYER"){

            const myJobs = await jobModel.find({employer_id: user._id});

            const job_ids = []

            myJobs.map((i)=>{
                job_ids.push(i._id)
            })
            query = { job_id : {$in: job_ids}};
        }

        const jobs = await ApplyModel.aggregate
            (
                [{
                    $lookup: {
                        from: "User",
                        localField: "employee_id",
                        foreignField: "_id",
                        as: "employee"
                    }
                },{$match:query},

                    {$lookup: {
                        from: "Job",
                        localField: "job_id",
                        foreignField: "_id",
                        as: "job"
                    }},
                     {
                    $project: {
                        "employee.password": 0,
                        "employee.is_archived": 0,
                        "employee.is_registered": 0,
                        "employee.role": 0,
                        "employee.created_at": 0,
                        "employee.updated_at": 0,
                        "employee.__v": 0
                    }
                }]
            )

        return jobs;
    },

    //to register a specific job
    async register(token, data) {
        const { user, permissions } = await userControllers.User.validateToken(token);
        const jobExists = await ApplyModel.findOne({employee_id: user._id, job_id: data.job_id}); 
        if(jobExists){
            throw {message: "You have already applied to this job", code: 404};
        }
        const job = await ApplyModel.create({
            employee_id : user._id,
            job_id: data.job_id,
            remarks : data.remarks,
            status: "Applied",
        });
        return job;
    },

    async approveApplication(token, id){
        const { user, permissions } = await userControllers.User.validateToken(token);

        const apply = await ApplyModel.findById(id);


        if(!apply){
            throw {message: "application dosen't exist", code : 404};
        }

        if(apply.status === "Approved"){
            throw {message: "Application already approved", code :404}
        }

        const job = await jobModel.findById(apply.job_id);
        console.log(user._id.str)

        if(job.employer_id.str != user._id.str){
            throw {message: "You are not the owner of this post", code :404}
        }

        return await ApplyModel.findByIdAndUpdate(id, {status: "Approved"})

    },

    async rejectApplication(token, id){
        const { user, permissions } = await userControllers.User.validateToken(token);

        const apply = await ApplyModel.findById(id);

        if(!apply){
            throw {message: "application dosen't exist", code : 404};
        }
        if(apply.status === "Rejected"){
            throw {message: "Application already rejected", code :404}
        }


        const job = await jobModel.findById(apply.job_id);

        if(job.employer_id.str != user._id.str){
            throw {message: "You are not the owner of this post", code :404}
        }

        return await ApplyModel.findByIdAndUpdate(id, {status: "Rejected"})

    },


    async add(token, data) {
        return await this.register(token, data);
    },


    async getById(id) {
        const job = await ApplyModel.findById(id);
        return job;
    },

    /*
    async getByEmployee(id) {
        const job = await JobModel.aggregate(
            [{$match:{
                employer_id : new mongoose.Types.ObjectId(id)
            }},{$lookup:{
                from: "User",
                localField: "employer_id",
                foreignField : "_id",
                as:"employer"
            }},{
                $project:{
                    "employer.password":0,
                    "employer.dateOfBirth":0,
                    "employer.is_archived":0,
                    "employer.is_registered":0,
                    "employer.role":0,
                    "employer.created_at":0,
                    "employer.updated_at":0,
                    "employer.__v":0
                }
            }]
        )
        return job;
    },
    */

    async archive(id) {
        const job = await ApplyModel.findById(id);
        if (!job) {
            throw { message: `Job of id  ${id} doesn't exist`, code: 400 };
        }
        job = await ApplyModel.findByIdAndUpdate({ id }, { is_archived: true });
        return job;
    },
}

module.exports = {
    Apply,
    add: (req) => Apply.add(req.params.access_token, req.payload),
    archive: (req) => Apply.archive(req.params.id),
    list: (req) => Apply.list(req.headers.access_token),
    getById: (req) => Apply.getById(req.params.id),
    approveApplication:(req)=> Apply.approveApplication(req.headers.access_token, req.params.id),
    rejectApplication:(req)=>  Apply.rejectApplication(req.headers.access_token, req.params.id),
}





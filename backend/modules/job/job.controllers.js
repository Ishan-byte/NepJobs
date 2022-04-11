const userControllers = require('../users/user/user.controllers');
const userModel = require('../users/user/user.model');
const JobModel = require('./job.model');

const mongoose = require('mongoose')

const Job = {

    async list() {
        const jobs = await JobModel.aggregate(
            [{$lookup:{
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
        return jobs;
    },

    //to register a specific job
    async register(token, data) {
        console.log(token);
        const { user, permissions } = await userControllers.User.validateToken(token);
        const { title, description, requirements, status, salary } = data;
        const job = await JobModel.create({
            employer_id: user._id,
            title: title,
            description: description,
            requirements: requirements,
            status: status,
            salary: salary
        });
        return job;
    },


    async add(token, data) {
        return await this.register(token, data);
    },


    async getById(id) {
        const job = await JobModel.aggregate(
            [{$match:{
                _id : new mongoose.Types.ObjectId(id)
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

    async archive(id) {
        const job = await JobModel.findById(id);
        if (!job) {
            throw { message: `Job of id  ${id} doesn't exist`, code: 400 };
        }
        job = await JobModel.findByIdAndUpdate({ id }, { is_archived: true });
        return job;
    },
}

module.exports = {
    Job,
    add: (req) => Job.add(req.headers.access_token, req.payload),
    archive: (req) => Job.archive(req.params.id),
    list: (req) => Job.list(),
    getById: (req) => Job.getById(req.params.id),
    getByEmployee: (req) => Job.getByEmployee(req.params.id)
}








const User  = require('./users/user/user.routes')
const Role  = require('./users/role/role.routes')
const Job   = require('./job/job.routes')
const Apply = require('./apply/apply.routes')


module.exports= {
    User,
    Role,
    Job,
    Apply
}
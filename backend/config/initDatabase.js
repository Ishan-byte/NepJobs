const mongo = require('mongoose');
const RoleController = require('../modules/users/role/role.controllers')
const UserController = require('../modules/users/user/user.controllers')
require('dotenv').config();
mongo.connect(process.env.MONGODB_URL)

Role = RoleController.Role;
User = UserController.User;

const roleAdder = async () => {
    await Role.register({
        name: 'Super Admin',
        permissions: [
            'app_admin',
            'user_write',
            'user_delete',
            'user_read',
            'user_list',
            'user_admin',
            'job_read',
            'job_write',
            'job_remove',
        ],
    });
    await Role.register({
        name: 'Admin',
        permissions: [
            'app_admin',
            'user_write',
            'user_delete',
            'user_read',
            'user_list',
            'user_admin',
            'job_read',
            'job_write',
            'job_remove',
        ],
        is_system: true
    });
    // await Role.register({
    //     name: 'Staff',
    //     permissions: [
    //         'job_read',
    //         'job_write',
    //     ],
    // });
    console.log('Admin Role is Added');
    console.log('Super Admin Role Added');
    console.log('Staff Manager Role Added');
}
const userAdder=async()=>{
    await User.register({
        email:'samrat.biz19@gmail.com',
        password:'9828',
        role: "SUPER ADMIN"
    })
    await User.register({
        email:'staff@gmail.com',
        password:'staff123',
        role: "STAFF"
    })
}

// userAdder();

roleAdder();
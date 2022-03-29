const mongo = require("mongoose");
const RoleController = require("../modules/users/role/role.controllers");
const UserController = require("../modules/users/user/user.controllers");
require("dotenv").config();
mongo.connect(process.env.MONGODB_URL);

Role = RoleController.Role;
User = UserController.User;

const roleAdder = async () => {
  await Role.register({
    name: "ADMIN",
    permissions: [
      "app_admin",
      "user_write",
      "user_delete",
      "user_read",
      "user_list",
      "user_admin",
      "job_read",
      "job_write",
      "job_remove",
    ],
    is_system: true,
  });
  await Role.register({
    name: "JOBSEEKER",
    permissions: [
      "job_read",
      "job_write",
    ],
  });
  await Role.register({
    name: "EMPLOYEER",
    permissions: [
      "user_write",
      "user_read",
      "user_list",
      "job_read",
      "job_write",
      "job_remove",
    ],
  });

  console.log("Admin Role is Added");
  console.log("Job seeker Role Added");
  console.log("Employeer Role Added");
};
const userAdder = async () => {
  await User.register({
    email: "limbuisan@gmail.com",
    password: "2121",
    fullname: "Ishan Chemjong",
    dateOfBirth: 2013 / 02 / 23,
    country: "Nepal",
    role: "ADMIN",
  });
};

//userAdder();

roleAdder();

// Importing a model exported from user.model.js and saving it in an constant value
const UserModel = require("./user.model");
//Importing other necessary packages
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../role/role.controllers");
//const permissions = require('../../../constant/permissions');
require("dotenv").config();

//Making of the User constant

const User = {
  //Add function
  async add(data) {
    return await this.register(data);
  },

  //Update function
  async update(request) {
    const res = await UserModel.findOneAndUpdate(
      { _id: request.params.id },
      request.payload
    );
    return res;
  },

  //Get a specific user function by using the user's id
  async getById(_id) {
    return UserModel.findOne({ _id, is_archived: false });
  },

  //Get the user according to role without showing the password in the output
  async findByRoles(role) {
    return User.model
      .find({ role: role, is_archived: false })
      .select("-password");
  },

  //Get the user according to id without showing the password in the output
  async findById(id) {
    return UserModel.findOne({ _id: id, is_archived: false }).select(
      "-password"
    );
  },

  //Archive a specific user function
  async archive(id) {
    return UserModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { is_archived: true }
    );
  },

  async list() {
    return await UserModel.find({ is_archived: false });
  },

  //Register function
  async register(data) {
    //assigning the input data of the user in to local variables for easier use
    var { email, password, fullname, dateOfBirth, country, role } = data;

    //converting role into uppercase for easy validation
    role = role.toUpperCase();

    //Validation: it throws an error whenever the fields are left empty
    if (!(email && password && fullname && dateOfBirth && country && role)) {
      return "Please fill up all of the empty input fields";
    }

    //Making salt for utilizing it for developing encrypted password as well as a jwt
    const salt = process.env.TOKEN_KEY;

    //Making of encrypted password
    encrypted_password = await bcrypt.hash(password, parseInt(salt));

    //Saving all of the validated data into a new user model
    const user = await UserModel.create({
      email: email.toLowerCase(),
      password: encrypted_password,
      role: role,
      fullname: fullname,
      dateOfBirth: dateOfBirth,
      country: country,
    });

    //Creating a jwt for the user
    const token = jwt.sign(
      {
        user_id: user._id,
        email,
        role: user.role,
      },
      salt
    );

    //Adding the jwt token into the newly created user model
    user.token = token;

    //At last the modified and validated model is returned from the function
    return user;
  }, // Register function ends

  //Login Function starts
  async login(data) {
    //try and catch
    try {
      //assigning the input data of the user in to local variables for easier use
      var { email, password } = data;

      //Validating if the user has left empty in any of the input fields
      if (!(email && password)) {
        throw "Please fill all of the input fields. ";
      }

      //the following method checks whether the input email exists in the database or not
      const user = await UserModel.findOne({ email });

      //the following method runs if the user email matches in the database
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          //Making a new jwt token each time the user logins to the app after validating
          const token = jwt.sign(
            { user_id: user._id, email, role: user.role },
            process.env.TOKEN_KEY
          );

          //Assigning the value of token into the user model
          user.token = token;

          //returns the data of the user extracted from the database for further use or validations
          var permissions = await Role.Role.getPermissions(user.role);
          return {
            role: user.role,
            token,
            permissions,
            email,
            is_registered: user.is_registered,
            user_id: user._id,
          };
        } else {
          throw { message: "Invalid Password", code: 400 }; // throws an error if the email is correct but password is wrong
        }
      } else {
        throw { message: "Invalid Email or Password ", code: 400 }; // throws an error if both of the input field's data are wrong
      }
    } catch (err) {
      throw err;
    }
  }, // Login Function ends

  //Token validation function
  async validateToken(token) {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await UserModel.findOne({
      email: decoded.email,
      is_archived: false,
    });

    //if the user constant does not receive the user information than the following if statement will be executed
    if (!user) {
      throw {
        message: "Token not correct. Please Login and Try again.",
        code: 400,
      };
    }

    const permissions = await Role.Role.getPermissions(user.role);

    return { user, permissions };
  },

  //Password Change function
  async changePassword(req) {
    token = req.headers.access_token;
    const { oldPassword, newPassword } = req.payload;
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await UserModel.findOne({ email: decoded.email });

    if (user) {
      try {
        const salt = parseInt(process.env.TOKEN_KEY);
        encrypted_password = await bcrypt.hash(newPassword, salt);
        const done = await UserModel.findOneAndUpdate(
          { email: decoded.email },
          { password: encrypted_password }
        );
        if (done) {
          return { message: "Password change successfully" };
        }
      } catch {
        throw err;
      }
    } else {
      throw {
        message: "Token not correct please login and try again",
        code: 400,
      };
    }
  },

  //Token authorization function, authorizes the token whether it is valid or not valid token
  async auth(request) {
    try {
      const token =
        request.params.token ||
        request.headers.access_token ||
        request.cookies.access_token;

      const { user, permissions } = await User.validateToken(token);

      return {
        users,
        permissions,
      };
    } catch (e) {
      throw Error("ERROR: ${e}");
    }
  },

  async approve(_id) {
    const user = await UserModel.findById(_id);
    if (!user) {
      throw { message: "User of this id not found", code: 400 };
    }
    return await UserModel.findByIdAndUpdate(_id, {
      is_registered: !user.is_registered,
    });
  },
}; //User components ends

// Exporting the user constant as well as other methods for dynamic use
module.exports = {
  User,
  list: (req) => User.list(),
  getById: (req) => User.getById(req.params.id),
  findById: (req) => User.findById(req.params.id),
  findByRoles: (req) => User.findByRoles(req.params.role),
  register: (req) => User.register(req.payload),
  login: (req) => User.login(req.payload),
  archive: (req) => User.archive(req.params.id),
  update: (req) => User.update(req),
  changePassword: (req) => User.changePassword(req),
  validateToken: (req) => User.validateToken(req.params.token),
  approve: (req) => User.approve(req.params.id),
  auth: (req) => User.auth(req),
};

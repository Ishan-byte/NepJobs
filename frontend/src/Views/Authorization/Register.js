import React, { useState, useContext, useEffect } from "react";
import { Button } from "@material-ui/core";
import { UserContext } from "../../Modules/Users/context";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import { pagePath, routes } from "../../Routes/path";


const RegisterComponent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { getAllRoles, addUser } = useContext(UserContext);
  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  const history = useHistory();


  useEffect(async () => {
    const res = await getAllRoles();
    setRoles(res);
    setRole(res[0].name);
  }, [getAllRoles])

  const handleRegister = async () => {
    try{
      const res = await addUser({ email, password, fullName, dob, country, role });
      enqueueSnackbar("added user successfully", {variant: 'success'});
    }catch(err){
      enqueueSnackbar(err.response.data.message, {variant: 'error'});
    }

  }

  return (
    <div className="row">
      <div className="col-lg-6 col-md-7 mx-auto ">
        <div className="card border-primary shadow-lg my-4">
          <div className="card-header border-bottom border-primary">
            <h4
              style={{ fontSize: "40px" }}
              className="text-center text-primary"
            >
              Nep Jobs
            </h4>
          </div>
          <div className="card-body border-bottom">
            {/* Email Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="email">
                Email
              </label>
              <div className="col-lg-8">
                <input onChange={(e) => { setEmail(e.target.value) }} type="text" id="email" className="form-control" />
              </div>
            </div>
            {/* Email Ends */}
            {/* Password Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="password">
                Password
              </label>
              <div className="col-lg-8">
                <input
                  onChange={(e) => { setPassword(e.target.value) }} 
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
              </div>
            </div>
            {/* Password Ends */}
            {/* FullName Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="fullName">
                Full Name
              </label>
              <div className="col-lg-8">
                <input
                  onChange={(e) => { setFullName(e.target.value) }} 
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control"
                />
              </div>
            </div>
            {/* FullName Ends */}
            {/* Date of birth Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <div className="col-lg-8">
                <input
                  onChange={(e) => { setDob(e.target.value) }} 
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="form-control"
                />
              </div>
            </div>
            {/* Date of Birth Ends */}
            {/* Country Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="country">
                Country
              </label>
              <div className="col-lg-8">
                <input
                  onChange={(e) => { setCountry(e.target.value) }} 
                  type="text"
                  id="country"
                  name="country"
                  className="form-control"
                />
              </div>
            </div>
            {/* Country Ends */}
            {/* Role Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="role">
                Role
              </label>
              <div className="col-lg-8">
                <select 
                  onChange={(e) => { setRole(e.target.value) }} 
                 id="role" name="role" className="form-control">
                  {roles.map((role) => (
                    <option key={role._id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Role Ends */}
          </div>
          <div className="card-footer">
            <Button onClick={handleRegister} variant="contained" color="primary">Register</Button>
            {'                    '}
            <Button onClick={()=>{
              window.location = pagePath.app.login;
            }} variant="contained" color="primary">Login instead</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Register=()=>{
  return(
    <SnackbarProvider>
      <RegisterComponent/>
    </SnackbarProvider>
  )

}

export default Register;

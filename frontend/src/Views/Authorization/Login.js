import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { Button } from "@material-ui/core";
import { UserContext } from "../../Modules/Users/context";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin } = useContext(UserContext);

  //  Login function
  const onLoginClick = async () => {
    try {
      await userLogin({ email, password });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-5 col-md-7 mx-auto">
        <div className="card border-success shadow-lg my-4">
          <div className="card-header border-bottom border-success">
            <h4
              className="text-center text-success"
              style={{ fontSize: "40px" }}
            >
              Nep Jobs
            </h4>
          </div>
          <div className="card-body border-bottom border-success">
            {/* For Email */}
              <Grid container spacing={3} xs={8} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField
                    id="logemail"
                    label="Email"
                    type={"email"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            {/* Email Ends */}
            {/* For Password */}
              <Grid container spacing={3} xs={8} alignItems="flex-end">
                <Grid item>
                  <KeyIcon />
                </Grid>
                <Grid item>
                  <TextField
                    id="logpassword"
                    label="Password"
                    type={"password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            {/* Password Ends */}
          </div>
          <div className="card-footer">
            <Button onClick={onLoginClick} variant="contained" color="primary">Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

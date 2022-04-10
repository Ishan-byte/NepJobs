import React, {useState, useEffect, useContext} from 'react';
import { SnackbarProvider, useSnackbar } from "notistack";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { pagePath } from '../../../Routes/path';
import { Button } from "@material-ui/core";
import { UserContext } from '../context';

const useStyles = makeStyles((theme) => ({
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 4, 3),
    },
}));

export default function EditUser({ open, handleOpen, item }) {
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();
    const { getAllRoles, editUser, refreshData } = useContext(UserContext);
    const [roles, setRoles] = useState([]);
    const [fullname, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [country, setCountry] = useState("");
    const [role, setRole] = useState("");

  useEffect(() => {
    getAllRoles().then((res) => {
      setRoles(res);
      setRole(res[0].name);
    });

    setFullName(item.fullname);
    setDob(item.dateOfBirth);
    setCountry(item.country);
    setRole(item.role);
  }, [getAllRoles, item]);

  async function handleUpdate(){
    try{
        await editUser(item._id, {
           fullname, dateOfBirth: dob, country, role
        } )
      enqueueSnackbar("User updated successfully", { variant: "success" });
      refreshData();
    }catch(err){
      enqueueSnackbar(err.response.data.message, { variant: "error" });
    }
  }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleOpen}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
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
            {/* FullName Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="fullname">
                Full Name
              </label>
              <div className="col-lg-8">
                <input
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  type="text"
                  value={fullname}
                  id="fullname"
                  name="fullname"
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
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  value={dob}
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
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  value={country}
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
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  id="role"
                  name="role"
                  className="form-control"
                >
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
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
            {"                    "}
            <Button
              onClick={() => {
                window.location = pagePath.app.login;
              }}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
            </Fade>
        </Modal>
    );
}

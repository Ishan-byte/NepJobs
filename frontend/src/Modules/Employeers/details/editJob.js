import React, { useState, useEffect, useContext } from 'react';
import { SnackbarProvider, useSnackbar } from "notistack";
import DeleteIcon from '@material-ui/icons/Delete';
import { JobsContext } from '../../Jobs/context';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { pagePath } from '../../../Routes/path';
import { Button } from "@material-ui/core";
import { UserContext } from '../../Users/context';

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

export default function EditJob({ job,  open, handleOpen }) {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const {updateJob, refreshData} =  useContext(JobsContext);
  const [title , setTitle] = useState([]);
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([""]);
  const [salary, setSalary] = useState(0);
  const [salary_negotiable, setSalaryNegotiable] = useState(false);
  const [number_of_employee, setNumEmployees] = useState(0);

  function handleReqAdd(){
    setRequirements([...requirements,"" ]);
  }

  function handleReqDelete(index){
    if(index >= 0 && index < requirements.length){
      const req = requirements;
      req.splice(index, 1);
      setRequirements([...req])
    }
  }

  useEffect(()=>{
    setTitle(job.title)
    setDescription(job.description)
    setSalary(job.salary)
    setSalaryNegotiable(job.salary_negotiable)
    if(job.requirements){
      setRequirements([...job.requirements,"" ]);
    }
    setNumEmployees(job.number_of_employee)
  },[job])

  async function handleUpdateJob() {
    try{
      const res = await updateJob(job._id,{
        title, description, requirements, salary, salary_negotiable, number_of_employee
      })
      refreshData();
      enqueueSnackbar("Job updated successfully", {variant: "success"})
    }catch(err){
      enqueueSnackbar(err.response.data.message, {variant: "error"})
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
                  Add new job
                </h4>
              </div>
              <div className="card-body border-bottom">
                <div className="form-group form-row">
                  <label className="col-lg-4" htmlFor="title">
                    Job Title
                  </label>
                  <div className="col-lg-8">
                    <input
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      type="text"
                      value={title}
                      id="title"
                      name="title"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-lg-4" htmlFor="requirements">
                    Requirements
                  </label>
                  <Button variant='contained' onClick={()=>{
                    handleReqAdd();
                  }}>Add</Button>
                  {requirements.map((req, i) => {
                    return (
                      <div key={i} className="col-lg-8">

                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">{i+1}</span>
                          </div>
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1" onClick={()=>{
                              handleReqDelete(i);
                            }}><DeleteIcon/></span>
                          </div>
                          <input type="text" onChange={(e) => {
                            const req = requirements;
                            req[i] = e.target.value;
                            setRequirements([...req]);
                          }} className="form-control" value={requirements[i]} placeholder="Requirement" aria-label="Requirement" aria-describedby="basic-addon1" />
                        </div>
                      </div>
                        )
                  })}
                </div>
                {/* Date of Birth Ends */}
                {/* Country Starts */}
                <div className="form-group form-row">
                  <label className="col-lg-4" htmlFor="description">
                    Description
                  </label>
                  <div className="col-lg-8">
                    <input
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      value={description}
                      type="text"
                      id="description"
                      name="description"
                      className="form-control"
                    />
                  </div>
                </div>
                {/* Country Ends */}
                {/* Role Starts */}
                <div className="form-group form-row">
                  <label className="col-lg-4" htmlFor="salary">
                    Salary
                  </label>
                  <div className="col-lg-8">
                    <input
                      onChange={(e) => {
                        setSalary(e.target.value);
                      }}
                      value={salary}
                      type="number"
                      id="salary"
                      name="salary"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-lg-4" htmlFor="salary">
                    Salary Negotiable ?
                  </label>
                  <div className="col-lg-8">
                    <input type="checkbox" value={salary_negotiable} onClick={(e)=>{
                      setSalaryNegotiable(!salary_negotiable)
                    }}/>
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-lg-4" htmlFor="employee">
                    Number of employee
                  </label>
                  <div className="col-lg-8">
                    <input
                      onChange={(e) => {
                        setNumEmployees(e.target.value);
                      }}
                      value={number_of_employee}
                      type="number"
                      id="employee"
                      name="employee"
                      className="form-control"
                    />
                  </div>
                </div>
                {/* Role Ends */}
              </div>
              <div className="card-footer">
                <Button
                  onClick={handleUpdateJob}
                  variant="contained"
                  color="primary"
                >
                 Save Changes
                </Button>
                {"                    "}
                <Button
                  onClick={handleOpen}
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

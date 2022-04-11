import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddNewJob from "./details/addJob";
import {JobsContext} from '../Jobs/context'
const Employers = () => {

    const [openAddJob, setOpenAddJob] = useState(false);
    const {getByEmployer, refresh} = useContext(JobsContext)

    const handleOpenJob = () => {
        setOpenAddJob(!openAddJob);
    }

    return (
        <div>
            <Typography variant="h2">
                Employeers
            </Typography>
            <Button variant="contained" onClick={handleOpenJob}>
                <Typography variant="body1">
                    Post New Job
                </Typography>
            </Button>
            <AddNewJob open={openAddJob} handleOpen={handleOpenJob} />
        </div>
    )
}
export default Employers;
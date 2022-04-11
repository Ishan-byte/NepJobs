import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import AddNewJob from "./details/addJob";

const Employers = () => {

    const [openAddJob, setOpenAddJob] = useState(false);

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
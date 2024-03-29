import React, { useState, useContext, useEffect } from "react";
import { TextField } from '@material-ui/core';
import { Button } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import { Box } from "@material-ui/core";
import DetailsIcon from '@material-ui/icons/Details';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { SnackbarProvider, useSnackbar } from "notistack";
import Grid from '@material-ui/core/Grid';
import { JobsContext } from "./context";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { colors } from "@material-ui/core";
import JobDetail from "./details/detailModal";
import { ApplyContext } from "../Apply/context";

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
  applyPaper: {
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        backgroundColor: colors.orange[200],
        padding: theme.spacing(4, 4, 3),
  },
  modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
  },
    paper: {
        height: 290,
        width: 300,
        elevation: 3,
        variant: "outlined",
    },
    control: {
        padding: theme.spacing(5),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    card: {
        backgroundColor: colors.teal[200],
    },
    textField: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
    },
}));



function QuickSearchToolbar({ jobs, setCurrJobs }) {

    const classes = useStyles();
    const [searchText, setSearchText] = useState('');

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = jobs.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setCurrJobs(filteredRows);
    };

    return (
        <div >
            <TextField
                variant="standard"
                value={searchText}
                onChange={(e) => requestSearch(e.target.value)}
                placeholder="Search…"
                className={classes.textField}
                InputProps={{
                    startAdornment: <SearchIcon fontSize="medium" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: { searchText } ? 'visible' : 'hidden' }}
                            onClick={() => requestSearch('')}
                        >
                            <ClearIcon fontSize="medium" />

                        </IconButton>
                    ),
                }}
            />
        </div>
    );
}

const ApplyConformation=({job, open, handleOpen, handleConfirm})=>{
  const classes = useStyles();
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
                <Paper className={classes.applyPaper} variant="outlined" >
                    <Typography variant="h5">
                        You are applying for {job.title} role at {job.employer[0].fullname} 
                    </Typography>
                    <Grid container>
                        <Grid item>
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleConfirm}>
                                <Typography variant="button" >
                                    Confirm
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item>
                        <Button variant="contained" color="secondary">
                        <Typography variant="button" >
                            Cancel
                        </Typography>
                    </Button>
                        </Grid>
                    </Grid>
                </Paper>

                </Fade>
                </Modal>

    )
}


const JobsComponent = () => {

    //declearation
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const { jobs, refreshData, refresh } = useContext(JobsContext);
    const {addApply} = useContext(ApplyContext);
    const [currJobs, setCurrJobs] = useState([]);
    const [job, setJob] = useState({});
    const [openDetail, setOpenDetail] = useState(false);
    const [openApply, setOpenApply] = useState(false);
    
    //defination
    const handleOpenDetail = () => {
        setOpenDetail(!openDetail);
    }

    const handleOpenApply= () => {
        setOpenApply(!openApply);
    }

    useEffect(async () => {
        await refreshData()
        setCurrJobs(jobs);
    }, [jobs])

    async function handleConfirm(){
        try{
            await addApply({job_id: job._id, remarks: "remarks"})
            enqueueSnackbar(`Applied for job`, {
                variant: "success",
            });
        }catch(err){
            enqueueSnackbar(err.response.data.message, {
                variant: "error",
            });
        }
    }

    useEffect(() => {
        refreshData();
    }, [refresh])
    return (
        <div className={classes.root}  >
            <Grid container className="col-lg-8">
                <Grid item className="col-lg-5">
                    <Typography variant="h2">
                        Jobs
                    </Typography>
                </Grid>
                <Grid item className="col-lg-3">
                    <QuickSearchToolbar setCurrJobs={setCurrJobs} jobs={jobs} />
                </Grid>
            </Grid>
            <Grid container className={classes.root} spacing={4}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={9}>
                        {currJobs ?(
                        currJobs.map((job) => (
                            <Grid key={job._id} item>
                                <Paper className={classes.paper}>
                                    <Card className={classes.card}>
                                        <CardHeader
                                            title={job.title.toUpperCase()}
                                            subheader={job.employer[0].fullname}
                                        />
                                        <CardContent>
                                            <Typography variant="body1" >
                                                {job.description.slice(0,27)}...
                                            </Typography>
                                            <Typography variant="h5" >
                                                <Box p="1rem" color="grey">Requirements</Box>
                                            </Typography>
                                            {job.requirements.map((req, i) => {
                                                if (i < 2) {
                                                    return (
                                                        <Typography key={i} variant="body1" >
                                                            -  {req}
                                                        </Typography>
                                                    )
                                                }
                                            })}
                                            <Typography variant="body1" >
                                                ... more
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton aria-label="add to favorites" onClick={() => {
                                                setJob(job);
                                                handleOpenApply();
                                            }
                                            }>
                                                <BookmarkIcon />
                                            </IconButton>
                                            <IconButton aria-label="share" onClick={() => {
                                                setJob(job);
                                                handleOpenDetail();
                                            }}>
                                                <DetailsIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Paper>
                            </Grid>
                        ))
                        ):("")}
                    </Grid>
                </Grid>
            </Grid>
            <JobDetail open={openDetail} handleOpen={handleOpenDetail} job={job}/>
            {openApply?(

            <ApplyConformation job={job} open={openApply} handleOpen={handleOpenApply} handleConfirm={handleConfirm} /> 
            ):""}
        </div>
    );
};

const Jobs = () => {
    return (
        <SnackbarProvider>
            <JobsComponent />
        </SnackbarProvider>
    );
};
export default Jobs;
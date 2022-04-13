import { useContext, useEffect, useState } from "react";
import { JobsContext } from "../Jobs/context";
import EditJob from "./details/editJob";
import AddNewJob from "./details/addJob";
import EditIcon from '@material-ui/icons/Edit';
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
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { colors } from "@material-ui/core";
import JobDetail from "../Jobs/details/detailModal";
import { getUser } from "../../Utils/SessionManager";

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

export default function Employer() {

    const {  getByEmployer, refresh, refreshData } = useContext(JobsContext);
    const [jobs, setJobs] = useState([]);

    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [currJobs, setCurrJobs] = useState([]);
    const [job, setJob] = useState({});
    const [openDetail, setOpenDetail] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit= () => {
        setOpenEdit(!openEdit);
    }
    const [openApply, setOpenApply] = useState(false);
    const [openAddJob, setOpenAddJob] = useState(false);

    const handleOpenDetail = () => {
        setOpenDetail(!openDetail);
    }
    const handleOpenJob = () => {
        setOpenAddJob(!openAddJob);
    }

    const handleOpenApply = () => {
        setOpenApply(!openApply);
    }

    useEffect(async () => {
        const user_id = getUser().user_id;
        const i = await getByEmployer(user_id);
        setJobs(i);
        setCurrJobs(i);
    }, [refresh,openEdit])

    return (
        <div className={classes.root}  >
            <Grid container className="col-lg-8">
                <Grid item className="col-lg-5">
                    <Typography variant="h5">
                        Jobs Posted By You
                    </Typography>
                </Grid>
                <Grid item className="col-lg-4">
                    <QuickSearchToolbar setCurrJobs={setCurrJobs} jobs={jobs} />
                </Grid>
                <Grid item className="col-lg-4">
                    <Button variant="contained" onClick={handleOpenJob}>
                        <Typography variant="body1">
                            Post New Job
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            <Grid container className={classes.root} spacing={4}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={9}>
                        {currJobs.map((job) => (
                            <Grid key={job._id} item>
                                <Paper className={classes.paper}>
                                    <Card className={classes.card}>
                                        <CardHeader
                                            title={job.title.toUpperCase()}
                                            subheader={job.employer[0].fullname}
                                        />
                                        <CardContent>
                                            <Typography variant="body1" >
                                                {job.description.slice(0, 27)}...
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
                                            <IconButton aria-label="share" onClick={() => {
                                                setJob(job);
                                                handleOpenEdit();
                                            }}>
                                                <EditIcon/>
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <div>
                <JobDetail open={openDetail} handleOpen={handleOpenDetail} job={job} />
                <AddNewJob open={openAddJob} handleOpen={handleOpenJob} />
            {job !=={} ? (

                <EditJob open={openEdit} handleOpen={handleOpenEdit} job={job} />
            ) : (<div></div>)}
            </div>
        </div>
    )
}



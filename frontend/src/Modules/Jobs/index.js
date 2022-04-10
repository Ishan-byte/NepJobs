import React, { useState, useContext, useEffect } from "react";
import clsx from 'clsx';

import { SnackbarProvider, useSnackbar } from "notistack";
import Grid from '@material-ui/core/Grid';
import { JobsContext } from "./context";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { colors } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
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
    card:{
        backgroundColor: colors.teal[200],
    }
}));

const JobSingle = ({ job }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Card className={classes.card}>
                <CardHeader
                    title={job.title}
                    subheader={job.description}
                />
                <CardContent>
                    {job.requirements.map((req, i) => {
                        return (
                        <Typography key={i} variant="body1" >
                            -  {req}
                        </Typography>
                        )
                    })}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Paper>
    )
}


const JobsComponent = () => {

    const classes = useStyles();

    const { jobs, refreshData, refresh } = useContext(JobsContext);
    const [currJobs, setCurrJobs] = useState([]);

    useEffect(() => {
        refreshData();
    }, [refresh])
    return (
        <div className={classes.root}  >
            <Typography variant="h2">
                Jobs
            </Typography>
            <Grid container className={classes.root} spacing={4}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={9}>
                        {jobs.map((job) => (
                            <Grid key={job._id} item>
                                <JobSingle job={job} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
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
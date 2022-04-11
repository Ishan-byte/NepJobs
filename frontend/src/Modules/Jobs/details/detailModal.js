import React, { useState, useContext, useEffect } from "react";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Box } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import { Typography } from "@material-ui/core";
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { colors } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from "@material-ui/core";
import { UserContext } from "../context";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        backgroundColor: colors.teal[200],
        padding: theme.spacing(4, 4, 3),
    },
    card:{
        backgroundColor: colors.teal[200],
    }
}));

const JobDetail = ({ job, open, handleOpen }) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();


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
                {open ? (
                    <Grid container className={classes.root} spacing={4}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" spacing={9}>
                                <Grid key={job._id} item>
                                    <Paper elevation={3} className={classes.paper} >
                                        <Card className={classes.card}>
                                            <CardHeader
                                                title={job.title ? 
                                                <Typography variant="h2" >
                                                     {job.title.toUpperCase()}
                                                </Typography>
                                                     : ""}
                                                subheader={job.employer[0].fullname}
                                            />
                                            <CardContent>
                                                <Typography variant="h5" >
                                                    <Box p="1rem" color="grey">Description</Box>
                                                </Typography>
                                                <Typography variant="body1" >
                                                    {job.description}
                                                </Typography>
                                                <Typography variant="h5" >
                                                    <Box p="1rem" color="grey">Requirements</Box>
                                                </Typography>
                                                {job.requirements.map((req, i) => (
                                                            <Typography key={i} variant="body1" >
                                                                -  {req}
                                                            </Typography>
                                                ))}
                                                <br/>
                                                <Typography variant="body1" >
                                                    Salary = {job.salary}$
                                                </Typography>
                                                <Typography variant="body1" >
                                                    Salary {job.salary_negotiable ? "is ": "is not "} negotiable
                                                </Typography>
                                                <Typography variant="body1" >
                                                    Required employees = {job.number_of_employee} 
                                                </Typography>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <Typography variant="body1" >
                                                    {job.employer[0].email}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton aria-label="add to favorites">
                                                    <BookmarkIcon />
                                                </IconButton>
                                                    <Button>
                                                    <Typography variant="button" >
                                                        view employer's profile
                                                    </Typography>
                                                    </Button>
                                            </CardActions>
                                        </Card>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                ) : (
                <div>
                    loading data
                </div>
                )}
            </Fade>
        </Modal>
    );
};


export default JobDetail;

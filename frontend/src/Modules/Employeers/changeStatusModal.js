import React, {useContext} from "react";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Box } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import { Typography } from "@material-ui/core";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { colors } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { pagePath } from "../../Routes/path";
import { ApplyContext} from "../Apply/context";
import { useSnackbar } from "notistack";

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
    card: {
        backgroundColor: colors.teal[200],
    }
}));

const ChangeStatus = ({ apply, open, handleOpen }) => {
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const {refreshData, acceptApplication, rejectApplication} = useContext(ApplyContext)

    async function handleAccept() {
        try{
            await acceptApplication(apply._id);    
            enqueueSnackbar("Application accepted", {variant:"success"})
            handleOpen();
        }catch(err){
            console.log(err)
            enqueueSnackbar(err.response.data.message, {variant:"error"})
        }
    }
    async function handleReject() {
        try{
            await rejectApplication(apply._id);    
            enqueueSnackbar("Application rejected", {variant:"info"})
            handleOpen();
        }catch(err){
            console.log(err)
            enqueueSnackbar(err.response.data.message, {variant:"error"})
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
                {open ? (
                    <Grid container className={classes.root} spacing={4}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" spacing={9}>
                                <Grid key={apply._id} item>
                                    <Paper elevation={3} className={classes.paper} >
                                        <Card className={classes.card}>
                                            <CardHeader
                                                title={apply.title ?
                                                    <Typography variant="h2" >
                                                        {apply.title.toUpperCase()}
                                                    </Typography>
                                                    : ""}
                                            />
                                            <CardContent>
                                                <Typography variant="h5" >
                                                    <Box p="1rem" color="grey">Description</Box>
                                                </Typography>
                                                <Typography variant="body1" >
                                                    FullName: {apply.fullname}
                                                </Typography>
                                                <Typography variant="body1" >
                                                    Status : {apply.status}
                                                </Typography>
                                                <Typography variant="body1" >
                                                    Email : {apply.email}
                                                </Typography>
                                                <br />
                                                <br />
                                                <br />
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton aria-label="add to favorites">
                                                    <BookmarkIcon />
                                                </IconButton>
                                                <Button onClick={async()=>{await handleAccept()}} >
                                                    <Typography variant="button" >
                                                    Accept
                                                    </Typography>
                                                </Button>
                                                <Button onClick={async()=>{await handleReject()}} >
                                                    <Typography variant="button" >
                                                    Reject
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


export default ChangeStatus;
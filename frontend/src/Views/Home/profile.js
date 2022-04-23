import DateFnsUtils from '@date-io/date-fns';
import { useRef } from 'react';
import { useSnackbar } from 'notistack';
import 'date-fns';
import { Button } from '@mui/material';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { Badge} from '@mui/material';
import { Avatar } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { getUser } from "../../Utils/SessionManager";
import { Typography } from "@mui/material";
import { UserContext } from "../../Modules/Users/context";
import { Grid } from "@material-ui/core";
import { TextField } from "@mui/material";

import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


const user = getUser();

const Profile = () => {

  const { getById,editUser } = useContext(UserContext);

  const fileInput = useRef();
  const selectFile = () => {
      fileInput.current.click();
  }

  const [info, setInfo] = useState(undefined);
  const [profilePic, setProfilePic] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [dob, setDob] = useState('');

  const [disabled, setDisabled] = useState(true);

  const handleEdit=async()=>{
    try{
      await editUser(info._id, {fullname: name, email, country, dateOfBirth: dob});
      enqueueSnackbar('user upadted successfully', {variant: 'success'})
      getById(user.user_id).then((res) => {
        console.log(res)
        setInfo(res);
        setName(res.fullname)
        setEmail(res.email)
        setCountry(res.country)
        setDob(res.dateOfBirth)
      });
    }catch(err){
      enqueueSnackbar('failed to update user', {variant: 'error'})
    }
  }

    const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    getById(user.user_id).then((res) => {
      console.log(res)
      setInfo(res);
      setName(res.fullname)
      setEmail(res.email)
      setCountry(res.country)
      setDob(res.dateOfBirth)
    });
  }, [])
  return (
    info !== undefined ? (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <Typography variant="h2">
                Profile
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<AddAPhotoIcon />}
              >
                  <Avatar onClick={selectFile} style={{height:200, width:200}} alt="Travis Howard" src={profilePic} />
                  <input onChange={(e)=>{
                    console.log(e.target.files)
                    setProfilePic(URL.createObjectURL(e.target.files[0]))
                  }} disabled={disabled} type="file" style={{ "display": "none" }} ref={fileInput} />
              </Badge>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h5">Name</Typography>
              <TextField
               InputProps={{
                readOnly: disabled,
              }}
                hiddenLabel
                variant="filled"
                value={name}
                onChange={(e)=>{
                  setName(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Email</Typography>
              <TextField
               InputProps={{
                readOnly: disabled,
              }}
                hiddenLabel
                variant="filled"
                value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Country</Typography>
              <TextField
               InputProps={{
                readOnly: disabled,
              }}
                hiddenLabel
                variant="filled"
                value={country}
                onChange={(e)=>{
                  setCountry(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Date of birth</Typography>
              <TextField
               InputProps={{
                readOnly: disabled,
              }}
                hiddenLabel
                variant="filled"
                type="date"
                value={dob}
                onChange={(e)=>{
                  setDob(e.target.value)
                }}

              />
            </Grid>
          <Grid item xs={6}>
          {disabled?(
            <Button variant='contained' onClick={()=>setDisabled(false)}>Edit</Button>
          ):(
            <div>
            <Button variant='contained' color='secondary' onClick={()=>setDisabled(true)}>Cancel</Button>
            {'  '}
            <Button variant='contained' color='secondary' 
            onClick={()=>{
              handleEdit();
              setDisabled(true);
              }}>Save</Button>
            </div>
          )}
          </Grid>
          </Grid>
        </div>
      </MuiPickersUtilsProvider>
    ) : <div>Loading...</div>
  )
}
export default Profile;
import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { firebase } from '../firebase';
import { useParams } from 'react-router-dom'
import Image from '../components/elements/Image'
import {isMobile} from 'react-device-detect';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const axios = require('axios').default;

const auth = getAuth(firebase)
const db = getDatabase(firebase)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Edit = () => {
  const [width, setWidth] = React.useState(isMobile?'75vw':'50vw')
  const [user, loading, error] = useAuthState(auth);
  const [authorized, setAuthorized] = React.useState(0) //0: false, 1: true
  const [token, setToken] = React.useState("")
  const [errMsg, setErrMsg] = React.useState("This bot does not exist! If you just bought a bot, please try waiting a few seconds then refresh the page.")
  const [modalTitle, setModalTitle] = React.useState("")
  const [modalText, setModalText] = React.useState("")
  const [open, setOpen] = React.useState(false);

  const { uid, name } = useParams()

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  }

  const handleSuccess = (projName) => {
      setModalTitle("Bot Created 🥳")
      setModalText("Congratulations, "+projName+" has been created! Now go to a server with your bot in it and use /help to get to know your new creation!")
      setToken("")
      handleOpen()
  }
  const handleFailure = (msg) => {
      setModalTitle("Something Went Wrong ☹️")
      setModalText(msg)
      handleOpen()
  }

  React.useEffect(()=>{
    const dbRef = ref(db);
    if(user){
        get(child(dbRef, `users/${uid}/${name}`)).then((snapshot) => {
            if(snapshot.exists()){
              console.log("logged in, authorized "+uid)
              setErrMsg("Now Editing "+name)
              let authState = snapshot.val().status==="Active"?3:(snapshot.val().status==="Ready"?4:5) //3 Active, 4 Ready (no token yet), 5 Paused
              setAuthorized(authState)
            }
            else{
              setErrMsg("This bot does not exist! If you just bought a bot, please try waiting a few seconds then refresh the page.")
              setAuthorized(2)
            }
          }).catch((error) => {
            setErrMsg("You are not authorized to make changes to this page.")
            setAuthorized(1)
          });
    }
    else{
      setErrMsg("Stuck on this screen? Make sure you're signed in!")
      setAuthorized(0)
    }
  }, [user, uid, name])

  return (
    <section
    className="illustration-section-edit"
  >
    <div style={{display: 'flex', marginTop:'5vh', justifyContent:'center', alignItems:'center', height: 'auto'}}>
    <div style={{display: 'flex',  justifyContent:'center', flexDirection: 'column', alignItems:'center', height: 'auto', width: width, borderRadius: '15px', paddingLeft: '3vw', paddingRight: '3vw'}}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="black">
            {modalTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="black">
              {modalText}
            </Typography>
            </Box>
        </Modal>
        <Image
        className="has-shadow"
        src={require('./../assets/images/'+((authorized==0||authorized>=3)?'Construction.png':'EditError.png'))}
        alt="Hero"
        width={256}
        height={256} />
        <div style={{width: 'auto'}}>
        <h2 style={{textAlign:'center'}}>
          {authorized===0?"Loading...":(authorized<3?"Sorry!":"Now Editing - "+name)}
        </h2>
        {authorized>=3?<div style={{width: 'auto', height: 'auto'}}>
          <p>Done? Click <a href="#/dashboard" style={{marginBottom: '2vh', color: 'blue', textDecorationLine: 'underline'}}>here</a> to return to your Dashboard.</p>
          {authorized==4?
          <div style={{display: 'flex', height: 'auto', width: 'auto', flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
            <TextField fullWidth style={{marginBottom: '3vh', borderRadius: '15px', backgroundColor: '#d1d1d1', marginRight: '1vw'}} value={token} onChange={(e)=>{setToken(e.target.value)}} label="Set Bot Token" variant="outlined" color="secondary"/>
            <Button color="success" onClick={()=>{
              axios.post('https://discmaker.yinftw.com/bots/birth', {botToken: token, projectName: name, username: uid})
                  .then(() => {
                      let projName=name
                      set(ref(db, 'users/' + uid + "/" + name), {
                          token: token,
                          status: "Active"
                      }).then(()=>{
                        handleSuccess(projName)
                      })
                      }
                  ).catch(err=>{
                      if(name===""||token===""){
                          handleFailure("None of the fields may be blank!")
                      } else{
                          handleFailure("Invalid token or project already exists.")
                      }
                  })
          }} style={{marginBottom: '3vh', }} variant="contained">Start bot</Button>
          </div>
            :<></>}
            {
              authorized===5?
              <div onClick ={()=>{
                if(name.length>0){
                  axios.post('https://discmaker.yinftw.com/pay/create-checkout-session', {subPrice: 499, subQuantity: 1, email: user.email, metadata: {uid: uid},
                    name: '{{CUSTOMER_NAME}}', projName: name})
                    .then(res => {
                      window.location = res.data.url
                      if(res.ok) return res.json()
                      })
                      .catch(err=>{
                        handleFailure(err.message)
                     })
                    }

            }} style={{cursor:'pointer', marginBottom: '5%', display:'flex', flexDirection: 'row', borderRadius: '15px', backgroundColor: '#cc9d78', alignItems: 'center', justifyContent: 'center', width: 'auto', height: 'auto'}}>
                <PlayIcon style={{color: 'black'}}/>
                <h5 style={{ textAlign: 'center', color: 'black'}}>Resume Subscription</h5>
              </div>:
              // PAUSE BUTTON
              <div style={{cursor:'pointer', marginBottom: '5%', display:'flex', flexDirection: 'row', borderRadius: '15px', backgroundColor: '#cc9d78', alignItems: 'center', justifyContent: 'center', width: 'auto', height: 'auto'}}>
                <PauseIcon style={{color: 'black'}}/>
                <h5 style={{ textAlign: 'left', color: 'black'}}>Pause Subscription</h5>
              </div>
              // END PAUSE BUTTON
            }
            {/* PAYMENT BUTTON */}
          <div style={{cursor:'pointer', marginBottom: '5%', display:'flex', flexDirection: 'row', borderRadius: '15px', backgroundColor: '#78bdcc', alignItems: 'center', justifyContent: 'center', width: 'auto', height: 'auto'}}>
           <EditIcon style={{color: 'black'}}/>
            <h5 style={{ textAlign: 'center', color: 'black'}}>Payment Settings</h5>
          </div>
           {/* END PAYMENT BUTTON */}
        </div>:<p style={{textAlign: 'center'}}>{errMsg}</p>}
        </div>
    </div>
    </div>
    </section>
  );
}

export default Edit;
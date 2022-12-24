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
  const [inviteLink, setInviteLink] = React.useState("javascript:void(0)")

  const { uid, name } = useParams()

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  }

  const onCreateBot = (projName, clientId) => {
      const inviteLink="https://discord.com/api/oauth2/authorize?client_id="+clientId+"&permissions=8&scope=applications.commands%20bot"
      setInviteLink(inviteLink)
      setModalTitle("Bot Created 🥳")
      setModalText("Congratulations, "+projName.replaceAll("-", " ")+" has been created! ")
      setToken("")
      handleOpen()
  }
  const handleFailure = (msg) => {
      setModalTitle("Something Went Wrong ☹️")
      setModalText(msg)
      handleOpen()
  }

  const handleSuccess = (msg) => {
    setModalTitle("Success 🥳")
    setModalText(msg)
    handleOpen()
  }

  const botPaidTokenUnset=()=>{
    return (<div>
        <p style={{textAlign:'center'}}>{<a href='https://yin4thewin.gitbook.io/bot-ink/' style={{marginBottom: '2vh', color: 'blue', textDecorationLine: 'underline'}}  target="_blank" rel="noopener noreferrer" >Need help getting your token?</a>}</p>
        <div style={{display: 'flex', height: 'auto', width: 'auto', flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
          <TextField fullWidth style={{marginBottom: '3vh', borderRadius: '15px', backgroundColor: '#d1d1d1', marginRight: '1vw'}} value={token} onChange={(e)=>{setToken(e.target.value)}} label="Set Bot Token" variant="outlined" color="secondary"/>
          <Button color="success" onClick={()=>{
            axios.post('https://botink.franklinyin.com/bots/birth', {botToken: token, projectName: name, username: uid})
                .then((res) => {
                    let projName=name
                    console.log(res)
                    set(ref(db, 'users/' + uid + "/" + name), {
                        token: token,
                        client: res.data.client,
                        status: "Active"
                    }).then(()=>{
                      onCreateBot(projName, res.data.client)
                    })
                    }
                ).catch(err=>{
                  console.log(err)
                  handleFailure(err.response.data.error)
                })
        }} style={{marginBottom: '3vh', }} variant="contained">Start bot</Button>
        </div>
      </div>)
  }

  React.useEffect(()=>{
    const dbRef = ref(db);
    if(user){
        get(child(dbRef, `users/${uid}/${name}`)).then((snapshot) => {
            if(snapshot.exists()){
              console.log("logged in, authorized "+uid)
              setErrMsg("Now Editing "+name.replaceAll("-", " "))
              let authState = snapshot.val().status==="Active"?3:(snapshot.val().status==="Ready"?4:5) //3 Active, 4 Ready (no token yet), 5 Paused
              setAuthorized(authState)
              let inv = snapshot.val().client?"https://discord.com/api/oauth2/authorize?client_id="+snapshot.val().client+"&permissions=8&scope=applications.commands%20bot":"javascript:void(0)"
              setInviteLink(inv)
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
            {modalTitle.includes("Bot Created")?<Typography id="modal-modal-description" sx={{ mt: 2 }} color="black">
              <a style={{color: 'blue'}} href={inviteLink}>Click here</a> to invite your bot to servers, then use its "help" slash command to get to know your own creation!
            </Typography>:<></>}
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
          {authorized===0?"Loading...":(authorized<3?"Sorry!":"Now Editing - "+name.replaceAll("-"," "))}
        </h2>
        {authorized>=3?<div style={{width: 'auto', height: 'auto'}}>
          <p style={{textAlign:'center'}}>Done? <a href="#/dashboard" style={{marginBottom: '2vh', color: 'blue', textDecorationLine: 'underline'}}>Return to your Dashboard.</a></p>
          {authorized==4?
            botPaidTokenUnset()
            :
            (inviteLink==="javascript:void(0)"?<></>:<p style={{textAlign:'center'}}>Or, click {<a href={inviteLink} style={{marginBottom: '2vh', color: 'blue', textDecorationLine: 'underline'}}  target="_blank" rel="noopener noreferrer" >here</a>} to invite your bot to a server.</p>)
          }
            {
              authorized===5?
              <div onClick ={()=>{
                if(name.length>0){
                  axios.post('https://botink.franklinyin.com/pay/subscription-status', {username: uid, projectName: name})
                  .then(res => {
                      if(res.data.status==='paused'){
                        axios.post('https://botink.franklinyin.com/pay/resume-subscription', {uid: uid, projName: name}).then(res=>{
                          handleSuccess("Your billing cycle has been resumed.")
                        }).catch(err=>{
                          handleFailure(err.message)
                        })
                      } else if(res.data.status==='dead'){
                        axios.post('https://botink.franklinyin.com/pay/create-checkout-session', {subPrice: 499, subQuantity: 1, email: user.email, metadata: {uid: uid}, projName: name})
                        .then(res => {
                          window.location = res.data.url
                          if(res.ok) return res.json()
                          })
                          .catch(err=>{
                            handleFailure(err.message)
                         }) 
                      } else{
                        handleFailure("How is this possible... subscription status is "+res.data.status)
                      }
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
              <div onClick ={()=>{
                if(name.length>0){
                  axios.post('https://botink.franklinyin.com/pay/pause-subscription', {uid:uid, projName: name})
                    .then(res => {
                      handleSuccess("Your subscription has been paused! The bot will continue to run until the end of your billing cycle. You may resume any time before then to keep your current billing cycle.")
                      })
                      .catch(err=>{
                        handleFailure("You might be trying to pause too quickly, please wait a few seconds and try again. If the issue persists, please let us know on our support server.")
                     })
                    }
              }} style={{cursor:'pointer', marginBottom: '5%', display:'flex', flexDirection: 'row', borderRadius: '15px', backgroundColor: '#cc9d78', alignItems: 'center', justifyContent: 'center', width: 'auto', height: 'auto'}}>
                <PauseIcon style={{color: 'black'}}/>
                <h5 style={{ textAlign: 'left', color: 'black'}}>Pause Subscription Renewal</h5>
              </div>
              // END PAUSE BUTTON
            }
            {/* PAYMENT BUTTON */}
          <div onClick ={()=>{
            if(name.length>0){
              axios.post('https://botink.franklinyin.com/pay/manage-subscription', {subPrice: 499, subQuantity: 1, email: user.email, metadata: {uid: uid},
                name: '{{CUSTOMER_NAME}}', projName: name})
                .then(res => {
                  window.location = res.data.url
                  if(res.ok) return res.json()
                  })
                  .catch(err=>{
                    handleFailure(err.message)
                 })
                }
          }}style={{cursor:'pointer', marginBottom: '5%', display:'flex', flexDirection: 'row', borderRadius: '15px', backgroundColor: '#78bdcc', alignItems: 'center', justifyContent: 'center', width: 'auto', height: 'auto'}}>
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
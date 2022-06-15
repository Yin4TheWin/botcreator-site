import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { firebase } from '../../firebase';
import { getDatabase, ref, set, get, child } from "firebase/database";
import {isMobile} from 'react-device-detect';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Image from '../elements/Image'
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from "react-router-dom";
const axios = require('axios').default;
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

const Creation = (props) => {
    const [open, setOpen] = React.useState(false);
    const [layout, setLayout] = React.useState(isMobile?"column":"row")
    const [name, setName] = React.useState("")
    const [token, setToken] = React.useState("")
    const [modalTitle, setModalTitle] = React.useState("")
    const [modalText, setModalText] = React.useState("")
    const history = useHistory()
    const [bots, setBots] = React.useState([{name: 'Sample Bot', status: 'Active', bought: false}, {name: 'Another Example', status: 'Paused', bought: false}])
    React.useEffect(()=>{
        const dbRef = ref(db);
        get(child(dbRef, `users/${props.user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
              let names = Object.keys(snapshot.val())
              let list=[]
              names.forEach(name=>{
                  list.push({name: name, status: snapshot.val()[name].status, bought: true})
              })
            setBots(list);
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    }, [props.user.uid])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSuccess = (projName) => {
        setModalTitle("Bot Created 🥳")
        setModalText("Congratulations, "+projName+" has been created! Now go to a server with your bot in it and use /help to get to know your new creation!")
        setName("")
        setToken("")
        handleOpen()
    }
    const handleFailure = (msg) => {
        setModalTitle("Something Went Wrong ☹️")
        setModalText(msg)
        handleOpen()
    }
    return (
        <div style={{display: 'flex',  justifyContent:'center', flexDirection: 'column', alignItems:'center'}}>
            <h1 style={{textAlign: 'center'}}>Welcome back, {props.user.email.split("@")[0]}!</h1>
            <p style={{fontSize: 25}}>What would you like to do today?</p>
            <div style={{display:'flex', flexDirection: layout}}>
                <div style={{display: 'flex',  justifyContent:'center', flexDirection: 'column', alignItems:'center', height: 'auto', width: 'auto', borderRadius: '15px', paddingLeft: '3vw', paddingRight: '3vw'}}>
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
                    <div>
                        <Image
                        className="has-shadow"
                        src={require('./../../assets/images/Create.png')}
                        alt="Hero"
                        width={128}
                        height={128} />
                    </div> 
                    <h2> Create a New Bot </h2>
                    <p onClick={()=>{
                        setModalTitle("Setup Instructions")
                        setModalText(`As you'll soon see, getting your own custom Discord bot is really simple! Just fill out the two fields you see in the box. Really quickly, I'll explain what they are and how to find them: ${"\n"}
                        (insert video here)${"\n"}`)
                        handleOpen()
                    }} style={{marginBottom: '2vh', color: 'blue', textDecorationLine: 'underline'}}>(Need help?)</p>
                    <TextField fullWidth style={{marginBottom: '3vh', borderRadius: '15px', backgroundColor: '#d1d1d1'}} value={name} onChange={(e)=>{setName(e.target.value)}} label="Project Name" variant="outlined" color="secondary"/>
                    <TextField fullWidth style={{marginBottom: '3vh', borderRadius: '15px', backgroundColor: '#d1d1d1'}} value={token} onChange={(e)=>{setToken(e.target.value)}} label="Bot Token" variant="outlined" color="warning" type="password"/>
                    <Button color="success" onClick={()=>{
                        axios.post('https://discmaker.yinftw.com/birth', {botToken: token, projectName: name, username: props.user.uid})
                            .then(() => {
                                let projName=name
                                set(ref(db, 'users/' + props.user.uid + "/" + name), {
                                    token: token
                                });
                                handleSuccess(projName)
                                }
                            ).catch(err=>{
                                if(name===""||token===""){
                                    handleFailure("None of the fields may be blank!")
                                } else{
                                    handleFailure("Invalid token or project already exists.")
                                }
                            })
                    }} style={{marginBottom: '3vh', padding:'3%'}} variant="contained">Continue</Button>
                    <Button color="success" onClick ={()=>{
                        axios.post('https://discmaker.yinftw.com/create-checkout-session', {subPrice: price, subQuantity: quantity, email: props.user.email,
                        name: '{{CUSTOMER_NAME}}',})
                            .then(res => {
                                window.location = res.data.url
                                if(res.ok) return res.json()
                            })
                            .catch(err=>{
                                handleFailure(err.message)
                            })
                    }} style = {{marginBottom: '3vh', padding:'3%'}} variant="contained">Checkout</Button>
                </div>
                <h4 style={{textAlign: 'center', alignSelf: 'center'}}>or..</h4>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems:'center', height: 'auto', width: 'auto', borderRadius: '15px', paddingLeft: '3vw', paddingRight: '3vw'}}>
                    <div>
                        <Image
                        className="has-shadow"
                        src={require('./../../assets/images/Edit.png')}
                        alt="Hero"
                        width={128}
                        height={128} />
                    </div> 
                    <h2>Edit Your Existing Bots</h2>
                    <List style={{maxHeight: '50%', width: '100%', overflow: 'auto', paddingRight: '2%'}}>
                        {bots.map(el=>{
                            return (<ListItem
                            secondaryAction={
                                <IconButton style={{backgroundColor: 'white'}} edge="end" aria-label="edit" onClick={()=>{
                                    if(!el.bought)
                                        alert('Create a bot to see it here and customize it!')
                                    else
                                        history.push('/edit/'+props.user.uid+'/'+el.name)
                                }}>
                                <EditIcon />
                                </IconButton>
                            }
                            >
                            {/* <ListItemAvatar>
                                <Avatar>
                                <FolderIcon />
                                </Avatar>
                            </ListItemAvatar> */}
                            <ListItemText
                                disableTypography
                                primary={<Typography type="body2" style={{ color: '#6f54f7', fontSize:20 }}>{el.name}</Typography>}
                                secondary={<p style={{ color: '#FFFFFF' }}>Status: {el.status}</p>}
                            />
                            </ListItem>)
                        })}
                    </List>
                </div>
            </div>
            <Button color="secondary" variant='contained' style={{padding: '13px'}} onClick={()=>{props.signOut(props.auth).then(()=>{ window.location.reload(false);})}}> Sign Out </Button>
        </div>
    );
}

export default Creation;
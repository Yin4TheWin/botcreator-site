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
import EditIcon from '@mui/icons-material/Edit';

const auth = getAuth(firebase)
const db = getDatabase(firebase)

const Edit = () => {
  const [width, setWidth] = React.useState(isMobile?'75vw':'50vw')
  const [user, loading, error] = useAuthState(auth);
  const [authorized, setAuthorized] = React.useState(0) //0: false, 1: true
  const [errMsg, setErrMsg] = React.useState("This bot does not exist!")
  const { uid, name } = useParams()
  React.useEffect(()=>{
    const dbRef = ref(db);
    if(user){
        get(child(dbRef, `users/${uid}/${name}`)).then((snapshot) => {
            if(snapshot.exists()){
              console.log("logged in, authorized "+uid)
              setErrMsg("Now Editing "+name)
              setAuthorized(3)
            }
            else{
              setErrMsg("This bot does not exist!")
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
    <div style={{display: 'flex',  justifyContent:'center', paddingTop: '5vh', alignItems:'center', height: 'auto'}}>
    <div style={{display: 'flex',  justifyContent:'center', flexDirection: 'column', alignItems:'center', height: 'auto', width: width, borderRadius: '15px', paddingLeft: '3vw', paddingRight: '3vw'}}>
        <Image
        className="has-shadow"
        src={require('./../assets/images/'+((authorized==0||authorized==3)?'Construction.png':'EditError.png'))}
        alt="Hero"
        width={256}
        height={256} />
        <div style={{width: 'auto'}}>
        <h2 style={{textAlign:'center'}}>
          {authorized===0?"Loading...":(authorized<3?"Sorry!":"Now Editing - "+name)}
        </h2>
        {authorized===3?<div style={{width: 'auto', height: 'auto'}}>
          <p>Done? Click <a href="#/dashboard" style={{marginBottom: '2vh', color: 'blue', textDecorationLine: 'underline'}}>here</a> to return to your Dashboard.</p>
          <div style={{marginBottom: '5%', display:'flex', flexDirection: 'row', borderRadius: '15px', backgroundColor: '#cc9d78', alignItems: 'center', justifyContent: 'center', width: 'auto', height: 'auto'}}>
           <PauseIcon style={{color: 'black'}}/>
            <h5 style={{ textAlign: 'center', color: 'black'}}>Pause Subscription</h5>
          </div>
          <div style={{marginBottom: '5%', display:'flex', flexDirection: 'row', borderRadius: '15px', backgroundColor: '#78bdcc', alignItems: 'center', justifyContent: 'center', width: 'auto', height: 'auto'}}>
           <EditIcon style={{color: 'black'}}/>
            <h5 style={{ textAlign: 'center', color: 'black'}}>Payment Settings</h5>
          </div>
        </div>:<p style={{textAlign: 'center'}}>{errMsg}</p>}
        </div>
    </div>
    </div>
  );
}

export default Edit;
import React from 'react';
import Creation from '../components/sections/Creation'
import {useAuthState} from 'react-firebase-hooks/auth';
import { getAuth, sendEmailVerification, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { firebase } from '../firebase';
import Login from '../components/sections/Login'
import Unverified from '../components/sections/Unverified'

const auth = getAuth(firebase)
const db = getDatabase(firebase)

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [loggedIn, setLoggedIn] = React.useState(0) //0: not logged in, 1: logged in but not verified, 2: logged in and verified
  React.useEffect(()=>{
    if(user){
      if(user.emailVerified){
        setLoggedIn(2)
      } else{
        sendEmailVerification(auth.currentUser).then(()=>{
          setLoggedIn(1)
        })
      }
    }
    else{
      setLoggedIn(0)
    }
  }, [user])
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        {loggedIn==2?<Creation user={user} auth={auth} signOut={signOut} changeState={setLoggedIn}/>:(loggedIn==1?<Unverified/>:<Login/>)}
    </div>
  );
}

export default Dashboard;
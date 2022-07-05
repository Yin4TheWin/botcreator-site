import React from 'react';
import Creation from '../components/sections/Creation'
import {useAuthState} from 'react-firebase-hooks/auth';
import { getAuth, sendEmailVerification, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { firebase } from '../firebase';
import Login from '../components/sections/Login'
import Unverified from '../components/sections/Unverified'
import Construction from '../components/sections/Construction'
import classNames from 'classnames';
const auth = getAuth(firebase)
const db = getDatabase(firebase)

const Dashboard = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
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
  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    "illustration-section-01",
  );
  return (
    <section
    {...props}
    className={outerClasses}
  >
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: 'auto'}}>
        {loggedIn==2?<Creation user={user} auth={auth} signOut={signOut} changeState={setLoggedIn}/>:(loggedIn==1?<Unverified auth={auth} signOut={signOut}/>:<Login/>)}
    </div>
    </section>
  );
}

export default Dashboard;
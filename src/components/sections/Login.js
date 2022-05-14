import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { firebase } from '../../firebase';
import { getDatabase, ref, set } from "firebase/database";
import Image from '../elements/Image'
import {isMobile} from 'react-device-detect';

const auth = getAuth(firebase)
const db = getDatabase(firebase)
 
const Login = () => {
    const [login, setLogin] = React.useState(0) //0: Log in, 1: Sign up
    const [loginText, setLoginText] = React.useState("Don't have an account? Sign Up")
    const [email, setEmail] = React.useState("")
    const [pwd, setPwd] = React.useState("")
    const [confirmPwd, setConfirmPwd] = React.useState("")
    const [width, setWidth] = React.useState(isMobile?'75vw':'50vw')

    return (
        <div style={{display: 'flex',  justifyContent:'center', flexDirection: 'column', alignItems:'center', height: 'auto', width: width, borderRadius: '15px', paddingLeft: '3vw', paddingRight: '3vw'}}>
            <div>
                <Image
                className="has-shadow"
                src={login==0?require('./../../assets/images/login.png'):require('./../../assets/images/signup.png')}
                alt="Hero"
                width={128}
                height={128} />
            </div> 
            <h1> {login==0?"Log In":"Sign Up"} </h1>
            <p>{login==0 ? "Welcome back! Inky's excited to see you again. What shall you make today?" : "Inky welcomes you warmly. Your server's future starts here!"}</p>
            <p onClick={()=>{
                setLogin(login==0?1:0)
                setLoginText(loginText.includes("Log In")?"Don't have an account? Sign Up":"Already have an account? Log In")
            }} style={{marginBottom: '2vh', color: 'blue', textDecorationLine: 'underline'}}>{loginText}</p>
            <TextField fullWidth style={{marginBottom: '3vh', backgroundColor: '#d1d1d1', borderRadius: '5px'}} value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Email" variant="outlined" color="secondary"/>
            <TextField fullWidth style={{marginBottom: '3vh', backgroundColor: '#d1d1d1', borderRadius: '5px'}} value={pwd} onChange={(e)=>{setPwd(e.target.value)}} label="Password" variant="outlined" color="warning" type="password"/>
            {login==0 ? 
                <p onClick={()=>{
                    if(email!=="")
                        sendPasswordResetEmail(auth, email).then(()=>{ alert("Password reset email has been sent to "+email) }).catch(()=>{ alert("It seems we do not have your email on file.") })
                    else
                        alert("Please enter your email in the email field!") 
                }} style={{marginBottom: '2vh', color: 'blue', textDecorationLine: 'underline'}}>Forgot Password?</p>:
                <TextField fullWidth style={{marginBottom: '3vh', backgroundColor: '#d1d1d1', borderRadius: '5px'}} value={confirmPwd} onChange={(e)=>{setConfirmPwd(e.target.value)}} label="Confirm Password" variant="outlined" color="warning" type="password"/>
            }
            <Button onClick={()=>{
                if(login==0){
                    signInWithEmailAndPassword(auth, email, pwd).catch(err=>{
                        alert(err.message)
                    })
                } else{
                    if(pwd!==confirmPwd)
                        alert("Passwords must match!")
                    else
                        createUserWithEmailAndPassword(auth, email, pwd).catch(err=>{
                            alert(err.message)
                        })
                }
            }} style={{marginBottom: '3vh'}} color="secondary" variant="contained">{login==0?"Log In":"Sign Up"}</Button>
        </div>
    );
}

export default Login;
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebase } from '../../firebase';
import { getDatabase, ref, set } from "firebase/database";

const auth = getAuth(firebase)
const db = getDatabase(firebase)

const Login = () => {
    const [login, setLogin] = React.useState(0) //0: Log in, 1: Sign up
    const [loginText, setLoginText] = React.useState("Don't have an account? Sign up here")
    const [email, setEmail] = React.useState("")
    const [pwd, setPwd] = React.useState("")
    const [confirmPwd, setConfirmPwd] = React.useState("")

    return (
        <div style={{display: 'flex',  justifyContent:'center', flexDirection: 'column', alignItems:'center', height: 'auto', width: 'auto', borderRadius: '15px', backgroundColor: '#498387', paddingLeft: '3vw', paddingRight: '3vw'}}>
            <h1> {login==0?"Log In":"Sign Up"} </h1>
            <p onClick={()=>{
                setLogin(login==0?1:0)
                setLoginText(loginText.includes("Log in")?"Don't have an account? Sign up here":"Already have an account? Log in here")
            }} style={{marginBottom: '2vh', color: 'blue', textDecorationLine: 'underline'}}>{loginText}</p>
            <TextField fullWidth style={{paddingBottom: '3vh'}} value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Email" variant="outlined" color="secondary"/>
            <TextField fullWidth style={{paddingBottom: '3vh'}} value={pwd} onChange={(e)=>{setPwd(e.target.value)}} label="Password" variant="outlined" color="warning" type="password"/>
            {login==0?<p></p>:<TextField fullWidth style={{paddingBottom: '3vh'}} value={confirmPwd} onChange={(e)=>{setConfirmPwd(e.target.value)}} label="Confirm Password" variant="outlined" color="warning" type="password"/>}
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
            }} style={{marginBottom: '3vh'}} variant="contained">{login==0?"Log In":"Sign Up"}</Button>
        </div>
    );
}

export default Login;
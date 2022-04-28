import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Creation = () => {
    const [name, setName] = React.useState("")
    const [token, setToken] = React.useState("")

    return (
        <div style={{display: 'flex',  justifyContent:'center', flexDirection: 'column', alignItems:'center', height: 'auto', width: 'auto', borderRadius: '15px', backgroundColor: '#498387', paddingLeft: '3vw', paddingRight: '3vw'}}>
            <h1> Verify Your Account </h1>
            <p>We've sent a verification to your email address! Simply click the link in the email, then refresh this page.</p>
        </div>
    );
}

export default Creation;
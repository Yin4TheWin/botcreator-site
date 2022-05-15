import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Image from '../elements/Image'

const Creation = (props) => {
    const [name, setName] = React.useState("")
    const [token, setToken] = React.useState("")

    return (
        <div style={{display: 'flex',  justifyContent:'center', flexDirection: 'column', alignItems:'center', height: 'auto', width: 'auto', borderRadius: '15px', paddingLeft: '3vw', paddingRight: '3vw'}}>
            <h1 style={{textAlign:'center'}}> Verify Your Account </h1>
            <p style={{textAlign:'center'}}>We've sent a verification to your email address! Simply click the link in the email, then refresh this page.</p>
            <div>
                <Image
                className="has-shadow"
                src={require('./../../assets/images/Verify.png')}
                alt="Hero"
                width={256}
                height={256} />
            </div> 
            <h3 style={{textAlign:'center'}}>Not you?</h3>
            <Button variant='contained' onClick={()=>{props.signOut(props.auth).then(()=>{ window.location.reload(false);})}}> Sign Out </Button>
        </div>
    );
}

export default Creation;
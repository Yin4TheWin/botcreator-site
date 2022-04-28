import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import TextField from '@mui/material/TextField';

const Home = () => {

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <div style={{display: 'flex',  justifyContent:'center', flexDirection: 'column', alignItems:'center', height: 'auto', width: 'auto', borderRadius: '5px', backgroundColor: '#498387', paddingLeft: '3vw', paddingRight: '3vw'}}>
            <h1> Create a new bot </h1>
            <TextField fullWidth style={{paddingBottom: '3vh'}} label="Bot Name" variant="outlined" color="secondary"/>
            <TextField fullWidth style={{paddingBottom: '3vh'}} label="Client ID" variant="outlined" color="success"/>
            <TextField fullWidth style={{paddingBottom: '3vh'}} label="Bot Token" variant="outlined" color="warning"/>
        </div>
    </div>
  );
}

export default Home;
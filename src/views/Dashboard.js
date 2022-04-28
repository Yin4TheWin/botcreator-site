import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const Home = () => {

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: 'auto', width: 'auto', borderRadius: '5px', backgroundColor: '#498387', paddingLeft: '3vw', paddingRight: '3vw'}}>
            <h1> Create a new bot </h1>
        </div>
    </div>
  );
}

export default Home;
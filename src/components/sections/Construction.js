import React from 'react';
import Image from '../elements/Image'
import {isMobile} from 'react-device-detect';
import Cta from './Cta';
const Construction = () => {
    const [width, setWidth] = React.useState(isMobile?'75vw':'50vw')
    return (
        <div style={{display: 'flex',  justifyContent:'center', flexDirection: 'column', alignItems:'center', height: 'auto', width: width, borderRadius: '15px', paddingLeft: '3vw', paddingRight: '3vw'}}>
            <div>
                <Image
                className="has-shadow"
                src={require('./../../assets/images/Construction.png')}
                alt="Hero"
                width={256}
                height={256} />
            </div> 
            <h1 style={{textAlign:'center'}}>Under Construction</h1>
            <p style={{textAlign:'center'}}>We're not quite ready to launch yet 😅 However, if you're interested in this project and would like updates, enter your email below and we'll let you know when we're open for business!</p>
            <div style={{width:'auto'}}>
            <Cta split />
            </div>
        </div>
    );
}

export default Construction;
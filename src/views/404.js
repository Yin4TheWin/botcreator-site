import React from 'react';
import Image from '../components/elements/Image'
import {isMobile} from 'react-device-detect';
const NotFound = () => {
    const [width, setWidth] = React.useState(isMobile?'75vw':'50vw')
    return (
        <div style={{display: 'flex',  alignSelf: 'center', justifyContent:'center', flexDirection: 'column', alignItems:'center', height: 'auto', width: width}}>
            <Image
            className="has-shadow"
            src={require('./../assets/images/Construction.png')}
            alt="Hero"
            width={256}
            height={256} />
            <h1 style={{textAlign:'center'}}>Under Construction</h1>
            <p style={{textAlign:'center'}}>We're not quite ready to launch yet 😅 However, if you're interested in this project and would like updates, enter your email below and we'll let you know when we're open for business!</p>
        </div>
    );
}

export default NotFound;
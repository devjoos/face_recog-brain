import React from 'react';
import Tilt from 'react-parallax-tilt';
import Brain from './brain.png'
import './Logo.css';

const Logo = () => {
    return (

        <Tilt className="Tilt ma4 m10 br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3"> <img src={Brain} /> </div>
        </Tilt>

    );
};

export default Logo;
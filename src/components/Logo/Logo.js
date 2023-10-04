import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
  return (
    <div className="ma4 mt0" style={{ height: '200px', width:'200px'}}>
      <Tilt className="Tilt br2 shadow-2">
        <div className="pa3" style={{ height: '200px', width:'200px'}}>
          <img alt='logo' src={logo}/>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo;

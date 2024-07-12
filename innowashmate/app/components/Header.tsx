import React from 'react';
import Image from 'next/image';
import photo from '../assets/logo.svg';
import dash from '../assets/dash.svg';
import home from '../assets/home.svg';
import info from '../assets/info.svg';
import user from '../assets/user.svg';
import { Link } from 'react-router-dom';

import './header.css'

const Header: React.FC = () => {
  return (
    <main>
      <div className='sidebar'>
        <Image src={photo} alt="Logo" width={425.85} height={241} className='logo' />
        <div className='pages'>
          <div className='services'>
            <Image src={dash} alt="dash" width={40} height={40} />
            <h1 className='servicef'>DashBoard</h1>
          </div>
          <Link to="/"><div className='services'>
            <Image src={home} alt="home" width={40} height={40} />
            <h1 className='servicef'>Home</h1>
          </div></Link>
          <Link to="/about">          <div className='services'>
            <Image src={info} alt="info" width={40} height={40} />
            <h1 className='servicef'>About</h1>
          </div></Link>
          <div className='services'>
            <Image src={user} alt="user" width={40} height={40} />
            <h1 className='servicef'>Logout</h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Header;

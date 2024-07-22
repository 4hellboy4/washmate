import React from 'react';
import Image from 'next/image';
import photo from '../../assets/logoh.svg';
import dash from '../../assets/dash.svg';
import home from '../../assets/home.svg';
import info from '../../assets/info.svg';
import user from '../../assets/user.svg';
import smile from '../../assets/smile.svg';
import telegram from '../../assets/telegram.svg';
import {Link, useNavigate} from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig'; // Adjust the path according to your project structure

import PersonalInfo from './PersonalInfo/PersonalInfo';

import './NavBar.css';

const NavBar: React.FC = () => {
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <main>
      <div className="sidebar">
        <div className="picemoji">
          <Image src={smile} alt="smiley Face"></Image>
        </div>
        <PersonalInfo />
        <div className="pages">
          <Link to={'/'}>
            <div className="button">
              <Image src={home} alt="home" className="icon"></Image>
              <h6 className="servicef">Home</h6>
            </div>
          </Link>
          <Link to={'/dashboard'}>
            <div className="button">
              <Image src={dash} alt="dash" className="icon"></Image>
              <h6 className="servicef">Dashboard</h6>
            </div>
          </Link>
          <Link to={'/about'}>
            <div className="button">
              <Image src={info} alt="info" className="icon"></Image>
              <h6 className="servicef">About</h6>
            </div>
          </Link>
          <Link to={'/login'}>
            <div className="button">
              <Image src={info} alt="info" className="icon"></Image>
              <h6 className="servicef">Login</h6>
            </div>
          </Link>
          <Link to={'/signup'}>
            <div className="button">
              <Image src={info} alt="info" className="icon"></Image>
              <h6 className="servicef">Signup</h6>
            </div>
          </Link>
          <div className='logout' onClick={handleLogout}>
            <Image src={user} alt='logout' className='usericon'></Image>
            <h6 className='servicef'>Logout</h6>
          </div>
        </div>
        <Image src={photo} alt="logo" className="logo"></Image>
      </div>
    </main>
  );
};

export default NavBar;

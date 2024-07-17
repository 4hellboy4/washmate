import React from 'react';
import Image from 'next/image';
import photo from '../../assets/logoh.svg';
import dash from '../../assets/dash.svg';
import home from '../../assets/home.svg';
import info from '../../assets/info.svg';
import user from '../../assets/user.svg';
import {Link} from 'react-router-dom';

import './NavBarItems.css'

const NavBarItems: React.FC = () => {
    return (
        <div className='pages'>
            <div className='services'>
                <Image src={dash} alt="dash" width={30} height={30} className="icon"/>
                <h1 className='servicef'>DashBoard</h1>
            </div>
            <Link to="/">
                <div className='services'>
                    <Image src={home} alt="home" width={30} height={30} className="icon"/>
                    <h1 className='servicef'>Home</h1>
                </div>
            </Link>
            <Link to="/about">
                <div className='services'>
                    <Image src={info} alt="info" width={30} height={30} className="icon"/>
                    <h1 className='servicef'>About</h1>
                </div>
            </Link>
            <div className='services'>
                <Image src={user} alt="user" width={30} height={30} className="icon"/>
                <h1 className='servicef'>Logout</h1>
            </div>
        </div>
    );
};

export default NavBarItems;

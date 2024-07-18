import React from 'react';
import Image from 'next/image';
import photo from '../../assets/logoh.svg';
import {Link} from 'react-router-dom';
import NavBarItems from '../NavBarItems/NavBarItems';

import './aside.css'
import UserInfo from "@/app/components/UserInfo/UserInfo";

const Aside: React.FC = () => {
    return (
        <div className='sidebar'>
            <UserInfo  />
            <NavBarItems/>
            <Image src={photo} alt="Logo" width={320.85} height={200} className='logo'/>
        </div>
    );
};

export default Aside;

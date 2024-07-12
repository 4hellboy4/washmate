import React from 'react';
import Image from 'next/image';
import photo from '../assets/logoh.svg';
import './home.css'
const Home: React.FC = () => {
  return (
    <div className='home'>
      <div className='content'>
        <Image src={photo} alt='logo' width={600} height={241} className='logoH' />
        <div>
          <h1 className='servicedesc'>InnoWashMate is Website Created for Innopolis Unveristy students to facilitate and organize Laundry room Usage.</h1>
          <h4 className='credits'>Designed And Developped By
            Innovelopers</h4>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import Image from 'next/image';
import photo from '../assets/logoh.svg';
import './about.css'
const Home: React.FC = () => {
    return (
        <div className='home'>
            <div className='content'>
                <Image src={photo} alt='logo' width={600} height={241} className='logoH' />
                <div>
                    <h1 className='servicedesc'>Here you can Book and see the schedule of the laundry room throughout of all Innopolis Universities Dorms</h1>
                </div>
                <div className='Buttons'>
                    <button className='btn'>Book</button>
                    <button className='btn'> Schedule</button>
                </div>
            </div>
        </div>
    );
};

export default Home;

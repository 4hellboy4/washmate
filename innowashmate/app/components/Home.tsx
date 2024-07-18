import React from 'react';
import Image from 'next/image';
import clock from '../assets/clock.svg';
import notif from '../assets/notfi.svg';
import './home.css'
const Home: React.FC = () => {
  return (
    <div className='home'>
      <div className='Bookings'>
        <div className='bookbox'>
          <p className='timeb'>15:00 - 14:00</p>
          <Image src={clock} alt='clock' className='clock'></Image>
          <div className='machinecont'>
            <h1 className='machine'>Dryer 1</h1>
            <p className='time'>Time Left: 60 min</p>
          </div>
        </div>
        <div className='bookbox'>
          <p className='timeb'>15:00 - 14:00</p>
          <Image src={clock} alt='clock' className='clock'></Image>
          <div className='machinecont'>
            <h1 className='machine'>Dryer 2</h1>
            <p className='time'>Time Left: 60 min</p>
          </div>
        </div>
        <div className='bookbox'>
          <p className='timeb'>15:00 - 14:00</p>
          <Image src={clock} alt='clock' className='clock'></Image>
          <div className='machinecont'>
            <h1 className='machine'>Washer 1</h1>
            <p className='time'>Time Left: 60 min</p>
          </div>
        </div>
        <div className='bookbox'>
          <p className='timeb'>15:00 - 14:00</p>
          <Image src={clock} alt='clock' className='clock'></Image>
          <div className='machinecont'>
            <h1 className='machine'>Washer 2</h1>
            <p className='time'>Time Left: 60 min</p>
          </div>
        </div>
        <div className='bookbtn'>
          <h1 className='book'>BOOK</h1>
        </div>
      </div>
      <div className='actionscont'>
        <div className='btnn'>
          <h1 className='building'>Dorm 7</h1>
        </div>
        <div className='btnn'>
          <h1 className='building'>Floor 11</h1>
        </div>
        <div className='notification'>
          <Image src={notif} alt='notification'></Image>
        </div>
      </div>
    </div>
  );
};

export default Home;

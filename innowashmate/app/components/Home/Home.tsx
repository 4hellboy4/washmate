import React from 'react';
import Image from 'next/image';
import notif from '../../assets/notfi.svg';
import Item from './Item/Item'
import BookBtn from './BookBtn/BookBtn';
import ActionsContext from './ActionContext/ActionsContext';

import './home.css'
const Home: React.FC = () => {
  return (
    <div className='home'>
      <div className='Bookings'>
        <Item interval={"14:00 - 16:00"} machine={"Dryer 1"} left_time={"Time Left: 60 min"} />
        <Item interval={"14:00 - 15:00"} machine={"Dryer 2"} left_time={"Time Left: 60 min"} />
        <Item interval={"14:00 - 16:00"} machine={"Washer 1"} left_time={"Time Left: 60 min"} />
        <Item interval={"14:00 - 16:00"} machine={"Washer 2"} left_time={"Time Left: 60 min"} />
        <BookBtn />
      </div>
      <ActionsContext />
    </div>
  );
};

export default Home;

import React from 'react';
import Image from 'next/image';
import notif from '@/app/assets/notfi.svg';

import './ActionsContext.css';

const ActionsContext: React.FC = () => {
  return (
    <div className="actionscont">
      <div className="btnn">
        <h1 className="building">Dorm 7</h1>
      </div>
      <div className="btnn">
        <h1 className="building">Floor 11</h1>
      </div>
      <div className="notification">
        <Image src={notif} alt="notification"></Image>
      </div>
    </div>
  );
};

export default ActionsContext;

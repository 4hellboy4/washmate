import React from 'react';
import Image from 'next/image';
import './TimeSlotDetails.css';
import clock from '../../assets/clock.svg';

const TimeSlotDetails: React.FC = () => {
  return (
    <div className="home">
      <div className="itemdetails">
        <div className="details">
          <div className="bookbox">
            <Image src={clock} alt="clock" className="clock"></Image>
            <div className="machinecont">
              <h1 className="machine">Dryer 1</h1>
              <p className="time">Time Left: 60 min</p>
            </div>
          </div>
          <div className="btnn">
            <h1 className="building">Dorm 7</h1>
          </div>
          <div className="btnn">
            <h1 className="building">Floor 11</h1>
          </div>
        </div>
        <div className="dboxcont">
          <div className="dbox">
            <h1 className="dboxt">15:00 - 14:00</h1>
          </div>
          <div className="dbox">
            <h1 className="dboxt">60 minutes</h1>
          </div>
          <div className="dbox">
            <h1 className="dboxt">60 min 00 secs</h1>
          </div>
        </div>
        <div className="cancelbtn">
          <h1>CANCEL</h1>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotDetails;

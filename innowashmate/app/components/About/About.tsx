import React from 'react';
import Image from 'next/image';
import './about.css';
import { Link } from 'react-router-dom';
import Home from '../Home/Home';

const About: React.FC = () => {
  return (
    <div className="home">
      <div className="aboutcontent">
        <p className="abouttxt1">
          InnoWashMate is Website Created for Innopolis Unveristy students to
          facilitate and organize Laundry room Usage.
        </p>
        <p className="abouttxt2">
          Here you can Book and see the schedule of the laundry room throughout
          of all Innopolis Universities Dorms
        </p>
        <Link to={'/'}>
          <div className="bookbtna">
            <h1 className="booka">BOOK</h1>
          </div>
        </Link>
        <div className="rules">
          <h1>RULES</h1>
          <ul>
            <li>Do not Book if you will not use it</li>
            <li>Do not make Bookings For someone Else</li>
            <li>Do not Ignore Other People’s Bookings</li>
          </ul>
          <p className="term">
            Any Reports or Violations To our Terms and Conditions will result in
            a Ban from our application.
          </p>
        </div>
        <div className="credits">
          <h1>Designed And Developped By Innovelopers</h1>
        </div>
      </div>
    </div>
  );
};

export default About;

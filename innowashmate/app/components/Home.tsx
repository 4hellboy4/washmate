import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useNavigate } from 'react-router-dom';
import clock from '../assets/clock.svg';
import notif from '../assets/notfi.svg';
import './home.css';

interface BookedMachine {
  id: string;
  name: string;
  startTime: number;
  endTime: number;
  dorm: string;
  floor: string;
  day: string;
}

const Home: React.FC = () => {
  const [bookedMachines, setBookedMachines] = useState<BookedMachine[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookedMachines = JSON.parse(localStorage.getItem('bookedMachines') || '[]');
    setBookedMachines(storedBookedMachines);
    const interval = setInterval(() => {
      const now = Date.now();
      const updatedBookedMachines = storedBookedMachines.filter((machine: BookedMachine) => machine.endTime > now);
      setBookedMachines(updatedBookedMachines);
      localStorage.setItem('bookedMachines', JSON.stringify(updatedBookedMachines));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const formatTimeLeft = (startTime: number, endTime: number) => {
    const now = Date.now();
    if (now < startTime) {
      const timeUntilStart = startTime - now;
      const hours = Math.floor((timeUntilStart / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeUntilStart / (1000 * 60)) % 60);
      const seconds = Math.floor((timeUntilStart / 1000) % 60);
      return `Starts in ${hours}h ${minutes}m ${seconds}s`;
    }

    const timeLeft = endTime - now;
    if (timeLeft <= 0) return 'Time Expired';

    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleBookButtonClick = () => {
    if (bookedMachines.length >= 4) {
      alert('You cannot book any more machines');
    } else {
      navigate('/dashboard');
    }
  };

  const handleMachineClick = (machineId: string) => {
    navigate(`/item/${machineId}`);
  };

  return (
      <div className='home'>
        <div className='Bookings'>
          {bookedMachines.map(machine => (
              <div key={machine.id} className='bookbox' onClick={() => handleMachineClick(machine.id)}>
                <p className='timeb'>{formatTime(machine.startTime)}</p>
                <Image src={clock} alt='clock' className='clock' />
                <div className='machinecont'>
                  <h1 className='machine'>{machine.name}</h1>
                  <p className='time'>Time Left: {formatTimeLeft(machine.startTime, machine.endTime)}</p>
                </div>
              </div>
          ))}
          <div className='bookbtn' onClick={handleBookButtonClick}>
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
            <Image src={notif} alt='notification' />
          </div>
        </div>
      </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useNavigate } from 'react-router-dom';
import clock from '../assets/clock.svg';
import notif from '../assets/notfi.svg';
import './home.css';

interface Machine {
  id: string;
  time?: string;
  name?: string;
  endTime?: number;
}

const placeholderMachines: Machine[] = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
];

const Home: React.FC = () => {
  const [bookedMachines, setBookedMachines] = useState<Machine[]>(placeholderMachines);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookedMachines = localStorage.getItem('bookedMachines');
    let fetchedBookedMachines: Machine[] = [];
    try {
      fetchedBookedMachines = storedBookedMachines ? JSON.parse(storedBookedMachines) : [];
    } catch (e) {
      console.error('Failed to parse booked machines:', e);
    }
    if (Array.isArray(fetchedBookedMachines)) {
      setBookedMachines((prevMachines) =>
          prevMachines.map((machine, index) =>
              fetchedBookedMachines[index] || machine
          )
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBookedMachines((prevMachines) =>
          prevMachines.map((machine) => {
            if (machine.endTime && machine.endTime > Date.now()) {
              const timeLeft = machine.endTime - Date.now();
              const timeString = new Date(timeLeft).toISOString().substr(11, 8);
              return { ...machine, time: timeString };
            } else if (machine.endTime && machine.endTime <= Date.now()) {
              return { ...machine, time: undefined, endTime: undefined, name: undefined };
            } else {
              return machine;
            }
          })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBookButtonClick = () => {
    if (bookedMachines.filter((machine) => machine.time).length >= 4) {
      alert('You cannot book anymore machines');
    } else {
      navigate('/dashboard');
    }
  };

  const handleMachineClick = (machineId: string) => {
    const machine = bookedMachines.find(machine => machine.id === machineId);
    if (machine?.time) {
      navigate(`/item/${machineId}`);
    }
  };

  return (
      <div className='home'>
        <div className='Bookings'>
          {bookedMachines.map((machine) => (
              <div key={machine.id} className='bookbox' onClick={() => handleMachineClick(machine.id)}>
                {machine.time ? (
                    <>
                      <p className='timeb'>{machine.time}</p>
                      <Image src={clock} alt='clock' className='clock' />
                      <div className='machinecont'>
                        <h1 className='machine'>{machine.name}</h1>
                        <p className='time'>Time Left: {machine.time}</p>
                      </div>
                    </>
                ) : (
                    <div className='machinecont'>
                      <h1 className='machine'>No Booked Machines</h1>
                    </div>
                )}
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

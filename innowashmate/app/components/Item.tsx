import React from 'react';
import { useParams } from 'react-router-dom';
import Image from 'next/image';
import clock from '../assets/clock.svg';
import './item.css';

const Item: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const storedBookedMachines = localStorage.getItem('bookedMachines');
    const bookedMachines = storedBookedMachines ? JSON.parse(storedBookedMachines) : {};

    let machineDetails;
    if (id) {
        outerLoop: for (const dorm in bookedMachines) {
            for (const floor in bookedMachines[dorm]) {
                for (const machine in bookedMachines[dorm][floor]) {
                    for (const day in bookedMachines[dorm][floor][machine]) {
                        if (bookedMachines[dorm][floor][machine][day][id]) {
                            machineDetails = {
                                id,
                                name: machine,
                                time: bookedMachines[dorm][floor][machine][day][id],
                                timeLeft: 'N/A' // Adjust as needed
                            };
                            break outerLoop;
                        }
                    }
                }
            }
        }
    }

    if (!machineDetails) {
        return <p>Machine not found</p>;
    }

    return (
        <div className='home'>
            <div className='itemdetails'>
                <div className='details'>
                    <div className='bookbox'>
                        <Image src={clock} alt='clock' className='clock' />
                        <div className='machinecont'>
                            <h1 className='machine'>{machineDetails.name}</h1>
                            <p className='time'>Time Left: {machineDetails.timeLeft}</p>
                        </div>
                    </div>
                    <div className='btnn'>
                        <h1 className='building'>Dorm 7</h1>
                    </div>
                    <div className='btnn'>
                        <h1 className='building'>Floor 11</h1>
                    </div>
                </div>
                <div className='dboxcont'>
                    <div className='dbox'>
                        <h1 className='dboxt'>{machineDetails.time}</h1>
                    </div>
                    <div className='dbox'>
                        <h1 className='dboxt'>{machineDetails.timeLeft}</h1>
                    </div>
                </div>
                <div className='cancelbtn'>
                    <h1>CANCEL</h1>
                </div>
            </div>
        </div>
    );
};

export default Item;

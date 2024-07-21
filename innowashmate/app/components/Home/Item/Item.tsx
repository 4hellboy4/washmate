import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './item.css';

interface BookedMachine {
    id: string;
    name: string;
    startTime: number;
    endTime: number;
    dorm: string;
    floor: string;
    day: string;
}

const Item: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const storedBookedMachines = localStorage.getItem('bookedMachines');
    const bookedMachines: BookedMachine[] = storedBookedMachines ? JSON.parse(storedBookedMachines) : [];

    const machineDetails = bookedMachines.find(machine => machine.id === id);

    if (!machineDetails) {
        return <p>Machine not found</p>;
    }

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

    const handleCancel = () => {
        const now = Date.now();
        if (now >= machineDetails.startTime) {
            alert('Cannot cancel, the booking time has already started.');
            return;
        }

        const updatedMachines = bookedMachines.filter(machine => machine.id !== id);
        localStorage.setItem('bookedMachines', JSON.stringify(updatedMachines));
        alert('Booking cancelled successfully.');
        navigate('/');
    };

    return (
        <div className='home'>
            <div className='itemdetails'>
                <div className='details'>
                    <div className='bookbox'>
                        <div className='machinecont'>
                            <h1 className='machine'>{machineDetails.name}</h1>
                            <p className='time'>Time Left: {formatTimeLeft(machineDetails.startTime, machineDetails.endTime)}</p>
                        </div>
                    </div>
                    <div className='btnn'>
                        <h1 className='building'>{machineDetails.dorm}</h1>
                    </div>
                    <div className='btnn'>
                        <h1 className='building'>{machineDetails.floor}</h1>
                    </div>
                </div>
                <div className='dboxcont'>
                    <div className='dbox'>
                        <h1 className='dboxt'>{new Date(machineDetails.startTime).toLocaleString()}</h1>
                    </div>
                    <div className='dbox'>
                        <h1 className='dboxt'>{new Date(machineDetails.endTime).toLocaleString()}</h1>
                    </div>
                </div>
                <div className='cancelbtn' onClick={handleCancel}>
                    <h1>CANCEL</h1>
                </div>
            </div>
        </div>
    );
};

export default Item;

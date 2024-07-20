import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

interface Schedule {
    [dorm: string]: {
        [floor: string]: {
            [machine: string]: {
                [day: string]: {
                    [hour: string]: string;
                };
            };
        };
    };
}

interface BookedMachine {
    id: string;
    name: string;
    time: string;
    endTime: number;
}

const initialSchedule: Schedule = {
    "Dorm 7": {
        "Floor 11": {
            "Dryer 1": {
                "Today": {},
                "Tomorrow": {},
                "Day After Tomorrow": {}
            },
            "Dryer 2": {
                "Today": {},
                "Tomorrow": {},
                "Day After Tomorrow": {}
            },
            "Washer 1": {
                "Today": {},
                "Tomorrow": {},
                "Day After Tomorrow": {}
            },
            "Washer 2": {
                "Today": {},
                "Tomorrow": {},
                "Day After Tomorrow": {}
            }
        }
    }
};

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

const Dashboard: React.FC = () => {
    const [selectedDorm, setSelectedDorm] = useState("Dorm 7");
    const [selectedFloor, setSelectedFloor] = useState("Floor 11");
    const [selectedMachine, setSelectedMachine] = useState("Dryer 1");
    const [selectedDay, setSelectedDay] = useState("Today");
    const [time, setTime] = useState("00:00");
    const [schedule, setSchedule] = useState<Schedule>(initialSchedule);
    const navigate = useNavigate();

    const handleDormChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDorm(event.target.value);
    };

    const handleFloorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFloor(event.target.value);
    };

    const handleMachineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMachine(event.target.id);
    };

    const handleDayChange = (day: string) => {
        setSelectedDay(day);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTime(event.target.value);
    };

    const handleBooking = () => {
        const newSchedule = { ...schedule };
        if (!newSchedule[selectedDorm]) newSchedule[selectedDorm] = {};
        if (!newSchedule[selectedDorm][selectedFloor]) newSchedule[selectedDorm][selectedFloor] = {};
        if (!newSchedule[selectedDorm][selectedFloor][selectedMachine]) newSchedule[selectedDorm][selectedFloor][selectedMachine] = {};
        if (!newSchedule[selectedDorm][selectedFloor][selectedMachine][selectedDay]) newSchedule[selectedDorm][selectedFloor][selectedMachine][selectedDay] = {};

        if (newSchedule[selectedDorm][selectedFloor][selectedMachine][selectedDay][time]) {
            alert('This machine is already booked for the selected time');
            return;
        }

        newSchedule[selectedDorm][selectedFloor][selectedMachine][selectedDay][time] = "User Name";
        setSchedule(newSchedule);

        const bookedMachines = Object.keys(newSchedule[selectedDorm][selectedFloor]).flatMap((machine) => {
            return Object.keys(newSchedule[selectedDorm][selectedFloor][machine]).flatMap((day) => {
                return Object.keys(newSchedule[selectedDorm][selectedFloor][machine][day]).map((time, index) => {
                    const endTime = Date.now() + 3600000; // 1 hour from now
                    return {
                        id: `${selectedDorm}-${selectedFloor}-${machine}-${day}-${time}-${index + 1}`,
                        name: machine,
                        time: `${day} ${time}`,
                        endTime: endTime
                    };
                });
            });
        });

        localStorage.setItem('bookedMachines', JSON.stringify(bookedMachines));
        alert('Machine booked successfully');
        navigate('/');
    };

    return (
        <div className='home'>
            <div className='centring'>
                <div className='dropselection'>
                    <select name="dorm" className='dchoice' onChange={handleDormChange} value={selectedDorm}>
                        <option value="Dorm 6">Dorm 6</option>
                        <option value="Dorm 7">Dorm 7</option>
                    </select>
                    <select name="floor" className='dchoice' onChange={handleFloorChange} value={selectedFloor}>
                        {Array.from({ length: 13 }, (_, i) => (
                            <option key={i} value={`Floor ${i + 1}`}>{`Floor ${i + 1}`}</option>
                        ))}
                    </select>
                </div>
                <div className='radios'>
                    <div className='radiostyle'>
                        <input type="radio" id="Washer 1" name='machine' onChange={handleMachineChange} />
                        <label htmlFor="Washer 1">Washer 1</label>
                    </div>
                    <div className='radiostyle'>
                        <input type="radio" id="Washer 2" name='machine' onChange={handleMachineChange} />
                        <label htmlFor="Washer 2">Washer 2</label>
                    </div>
                    <div className='radiostyle'>
                        <input type="radio" id="Dryer 1" name='machine' onChange={handleMachineChange} />
                        <label htmlFor="Dryer 1">Dryer 1</label>
                    </div>
                    <div className='radiostyle'>
                        <input type="radio" id="Dryer 2" name='machine' onChange={handleMachineChange} />
                        <label htmlFor="Dryer 2">Dryer 2</label>
                    </div>
                </div>
                <div className='schedule'>
                    <div className='days'>
                        <div className={`daystyle ${selectedDay === "Today" ? "selected" : ""}`} onClick={() => handleDayChange("Today")}>
                            <h1>Today</h1>
                        </div>
                        <div className={`daystyle ${selectedDay === "Tomorrow" ? "selected" : ""}`} onClick={() => handleDayChange("Tomorrow")}>
                            <h1>Tomorrow</h1>
                        </div>
                        <div className={`daystyle ${selectedDay === "Day After Tomorrow" ? "selected" : ""}`} onClick={() => handleDayChange("Day After Tomorrow")}>
                            <h1 className='longday'>Day After Tomorrow</h1>
                        </div>
                    </div>
                    <div className='schedule-table'>
                        {hours.map((hour) => (
                            <div key={hour} className='schedule-row'>
                                <div className='time-slot'>{hour}</div>
                                <div className='booking-info'>
                                    {schedule[selectedDorm] && schedule[selectedDorm][selectedFloor] && schedule[selectedDorm][selectedFloor][selectedMachine] && schedule[selectedDorm][selectedFloor][selectedMachine][selectedDay] && schedule[selectedDorm][selectedFloor][selectedMachine][selectedDay][hour] ?
                                        schedule[selectedDorm][selectedFloor][selectedMachine][selectedDay][hour] : ""}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='time-selection'>
                    <select className='time-choice' onChange={handleTimeChange} value={time}>
                        {hours.map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    <button className='book-button' onClick={handleBooking}>BOOK</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

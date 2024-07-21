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
    startTime: number;
    endTime: number;
    dorm: string;
    floor: string;
    day: string;
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

    const getTimeInMillis = (day: string, time: string) => {
        const now = new Date();
        const [hours, minutes] = time.split(':').map(Number);
        let dayOffset = 0;
        if (day === "Tomorrow") dayOffset = 1;
        if (day === "Day After Tomorrow") dayOffset = 2;
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset, hours, minutes, 0, 0);
        return date.getTime();
    };

    const countBookings = (floor: string) => {
        const machines = schedule[selectedDorm][floor];
        let washerCount = 0;
        let dryerCount = 0;

        Object.keys(machines).forEach(machine => {
            Object.keys(machines[machine]).forEach(day => {
                Object.keys(machines[machine][day]).forEach(hour => {
                    if (machines[machine][day][hour]) {
                        if (machine.includes('Washer')) {
                            washerCount++;
                        } else if (machine.includes('Dryer')) {
                            dryerCount++;
                        }
                    }
                });
            });
        });

        return { washerCount, dryerCount };
    };

    const handleBooking = () => {
        const { washerCount, dryerCount } = countBookings(selectedFloor);

        if (selectedMachine.includes('Washer') && washerCount >= 2) {
            alert('You cannot book any more washers');
            return;
        }

        if (selectedMachine.includes('Dryer') && dryerCount >= 2) {
            alert('You cannot book any more dryers');
            return;
        }

        const newSchedule = { ...schedule };
        if (!newSchedule[selectedDorm]) newSchedule[selectedDorm] = {};
        if (!newSchedule[selectedDorm][selectedFloor]) newSchedule[selectedDorm][selectedFloor] = {};
        if (!newSchedule[selectedDorm][selectedFloor][selectedMachine]) newSchedule[selectedDorm][selectedFloor][selectedMachine] = {};
        if (!newSchedule[selectedDorm][selectedFloor][selectedMachine][selectedDay]) newSchedule[selectedDorm][selectedFloor][selectedMachine][selectedDay] = {};

        if (newSchedule[selectedDorm][selectedFloor][selectedMachine][selectedDay][time]) {
            alert('This machine is already booked for the selected time');
            return;
        }

        const startTime = getTimeInMillis(selectedDay, time);
        if (startTime < Date.now()) {
            alert('You cannot book a time in the past');
            return;
        }

        newSchedule[selectedDorm][selectedFloor][selectedMachine][selectedDay][time] = "User Name";
        setSchedule(newSchedule);

        const bookedMachines = Object.keys(newSchedule[selectedDorm][selectedFloor]).flatMap((machine) => {
            return Object.keys(newSchedule[selectedDorm][selectedFloor][machine]).flatMap((day) => {
                return Object.keys(newSchedule[selectedDorm][selectedFloor][machine][day]).map((time, index) => {
                    const startTime = getTimeInMillis(day, time);
                    const endTime = startTime + 3600000;
                    return {
                        id: `${selectedDorm}-${selectedFloor}-${machine}-${day}-${time}-${index + 1}`,
                        name: machine,
                        startTime,
                        endTime,
                        dorm: selectedDorm,
                        floor: selectedFloor,
                        day
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

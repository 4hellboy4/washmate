import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { FIRESTORE_DB } from '@/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import './dashboard.css';

interface Schedule {
  id: string;
  selectedDay: string;
  selectedMachine: string;
  time: string;
  userName: string;
}

//
// interface Machine {
//     id: string;
//     name: string;
// }

const hours = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, '0')}:00`,
);

const Dashboard: React.FC = () => {
  const [selectedDorm, setSelectedDorm] = useState('Dorm 7');
  const [selectedFloor, setSelectedFloor] = useState('Floor 11');
  const [selectedMachine, setSelectedMachine] = useState('Washer 1');
  const [selectedDay, setSelectedDay] = useState('Today');
  const [time, setTime] = useState('00:00');
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // fetch USERNAME
  useEffect(() => {
    const fetchUserName = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(FIRESTORE_DB, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserName(userSnap.data().name);
        }
      }
    };
    fetchUserName();
  }, []);

  // fetch schedules by dorm, floor, machine type
  useEffect(() => {
    const fetchSchedule = async () => {
      const docRef = doc(
        FIRESTORE_DB,
        'schedules',
        `${selectedDorm}-${selectedFloor}`,
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document Data:', docSnap.data()); // Посмотрите, что возвращает Firestore

        const data = docSnap.data();
        const bookings = data?.['bookings'] as Schedule[]; // Получаем массив бронирований

        console.log('Fetched Bookings:', bookings); // Посмотрите, что вы получаете

        if (Array.isArray(bookings)) {
          setSchedule(bookings); // Устанавливаем массив бронирований в состояние
        } else {
          setSchedule([]); // Если данных нет, устанавливаем пустой массив
        }
      } else {
        setSchedule([]); // Если документ не существует, устанавливаем пустой массив
      }
    };

    fetchSchedule();
  }, [selectedDorm, selectedFloor]);
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
    if (day === 'Tomorrow') dayOffset = 1;
    if (day === 'Day After Tomorrow') dayOffset = 2;
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + dayOffset,
      hours,
      minutes,
      0,
      0,
    );
    return date.getTime();
  };

  const handleBooking = async () => {
    const startTime = getTimeInMillis(selectedDay, time);
    if (startTime < Date.now()) {
      alert('You cannot book a time in the past');
      return;
    }

    const docRef = doc(
      FIRESTORE_DB,
      'schedules',
      `${selectedDorm}-${selectedFloor}`,
    );
    const slotId = `${selectedDorm}-${selectedFloor}-${selectedDay}-${time}`;

    const bookingData = {
      selectedDay,
      time,
      userName,
      selectedMachine,
      id: slotId, // Уникальный ID для временного слота
    };

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        bookings: [bookingData],
      });
    } else {
      const data = docSnap.data();
      const existingBookings = (data?.bookings as Schedule[]) || [];

      if (Array.isArray(existingBookings)) {
        const updatedBookings = existingBookings.filter(
          (booking) => booking.id !== slotId,
        );
        updatedBookings.push(bookingData);

        await updateDoc(docRef, {
          bookings: updatedBookings,
        });
      } else {
        await updateDoc(docRef, {
          bookings: [bookingData],
        });
      }
    }

    alert('Machine booked successfully');
    navigate('/');
  };

  return (
    <div className="home">
      <div className="centring">
        <div className="dropselection">
          <select
            name="dorm"
            className="dchoice"
            onChange={handleDormChange}
            value={selectedDorm}
          >
            <option value="Dorm 6">Dorm 6</option>
            <option value="Dorm 7">Dorm 7</option>
          </select>
          <select
            name="floor"
            className="dchoice"
            onChange={handleFloorChange}
            value={selectedFloor}
          >
            {Array.from({ length: 13 }, (_, i) => (
              <option
                key={i}
                value={`Floor ${i + 1}`}
              >{`Floor ${i + 1}`}</option>
            ))}
          </select>
        </div>
        <div className="radios">
          <div className="radiostyle">
            <input
              type="radio"
              id="Washer 1"
              name="machine"
              onChange={handleMachineChange}
              checked={selectedMachine === 'Washer 1'}
            />
            <label htmlFor="Washer 1">Washer 1</label>
          </div>
          <div className="radiostyle">
            <input
              type="radio"
              id="Washer 2"
              name="machine"
              onChange={handleMachineChange}
              checked={selectedMachine === 'Washer 2'}
            />
            <label htmlFor="Washer 2">Washer 2</label>
          </div>
          <div className="radiostyle">
            <input
              type="radio"
              id="Dryer 1"
              name="machine"
              onChange={handleMachineChange}
              checked={selectedMachine === 'Dryer 1'}
            />
            <label htmlFor="Dryer 1">Dryer 1</label>
          </div>
          <div className="radiostyle">
            <input
              type="radio"
              id="Dryer 2"
              name="machine"
              onChange={handleMachineChange}
              checked={selectedMachine === 'Dryer 2'}
            />
            <label htmlFor="Dryer 2">Dryer 2</label>
          </div>
        </div>
        <div className="schedule">
          <div className="days">
            <div
              className={`daystyle ${selectedDay === 'Today' ? 'selected' : ''}`}
              onClick={() => handleDayChange('Today')}
            >
              <h1>Today</h1>
            </div>
            <div
              className={`daystyle ${selectedDay === 'Tomorrow' ? 'selected' : ''}`}
              onClick={() => handleDayChange('Tomorrow')}
            >
              <h1>Tomorrow</h1>
            </div>
            <div
              className={`daystyle ${selectedDay === 'Day After Tomorrow' ? 'selected' : ''}`}
              onClick={() => handleDayChange('Day After Tomorrow')}
            >
              <h1 className="longday">Day After Tomorrow</h1>
            </div>
          </div>
          <div className="schedule-table">
            {hours.map((hour) => {
              // Фильтруем бронирования для текущего дня и текущего часа
              const bookingForHour = schedule.find(
                (booking) =>
                  booking.selectedDay === selectedDay && booking.time === hour,
              );
              return (
                <div key={hour} className="schedule-row">
                  <div className="time-slot">{hour}</div>
                  <div className="booking-info">
                    {bookingForHour ? (
                      <>
                        {bookingForHour.userName}
                        {bookingForHour.id && ` (ID: ${bookingForHour.id})`}
                      </>
                    ) : (
                      'Available'
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="time-selection">
          <select
            className="time-choice"
            onChange={handleTimeChange}
            value={time}
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <button className="book-buttond" onClick={handleBooking}>
            BOOK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

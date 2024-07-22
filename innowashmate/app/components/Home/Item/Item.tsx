import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/FirebaseConfig';
import './Item.css';
import ReactLoading from 'react-loading';

interface Schedule {
  id: string;
  selectedDay: string;
  selectedMachine: string;
  time: string;
  userName: string;
}
const Item: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [machineDetails, setMachineDetails] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error('No ID provided.');
      setLoading(false);
      return;
    }
    const fetchMachineDetails = async () => {
      try {
        const schedulesCollection = doc(
          FIRESTORE_DB,
          'schedules',
          id.split('-').slice(0, 2).join('-'),
        ); // Получаем ссылку на документ
        const docSnap = await getDoc(schedulesCollection);

        if (!docSnap.exists()) {
          console.error('No such schedule!');
          return;
        }

        const data = docSnap.data();
        const bookings = (data?.bookings as Schedule[]) || [];

        // Ищем нужное бронирование по ID
        const booking = bookings.find((booking) => booking.id === id);
        setMachineDetails(booking || null);
      } catch (error) {
        console.error('Error fetching machine details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachineDetails();
  }, [id]);

  const formatTimeLeft = (time: string) => {
    const now = Date.now();
    const [hours, minutes] = time.split(':').map(Number);
    const bookingTime = new Date();
    bookingTime.setHours(hours, minutes, 0, 0);
    const startTime = bookingTime.getTime();
    const endTime = startTime + 1000 * 60 * 60; // Assuming 1-hour slot for simplicity

    if (now < startTime) {
      const timeUntilStart = startTime - now;
      const hoursLeft = Math.floor((timeUntilStart / (1000 * 60 * 60)) % 24);
      const minutesLeft = Math.floor((timeUntilStart / (1000 * 60)) % 60);
      const secondsLeft = Math.floor((timeUntilStart / 1000) % 60);
      return `Starts in ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    }

    const timeLeft = endTime - now;
    if (timeLeft <= 0) return 'Time Expired';

    const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
    const secondsLeft = Math.floor((timeLeft / 1000) % 60);

    return `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
  };

  const handleCancel = async () => {
    if (!id) {
      console.error('No ID provided.');
      return;
    }
    if (machineDetails) {
      const now = Date.now();
      const [hours, minutes] = machineDetails.time.split(':').map(Number);
      const bookingTime = new Date();
      bookingTime.setHours(hours, minutes, 0, 0);
      const startTime = bookingTime.getTime();

      if (now >= startTime) {
        alert('Cannot cancel, the booking time has already started.');
        return;
      }

      try {
        const docRef = doc(
          FIRESTORE_DB,
          'schedules',
          id.split('-').slice(0, 2).join('-'),
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const existingBookings = (data?.bookings as Schedule[]) || [];
          const updatedBookings = existingBookings.filter(
            (booking) => booking.id !== id,
          );

          await deleteDoc(docRef); // Удаляем старый документ

          await setDoc(docRef, {
            bookings: updatedBookings,
          }); // Сохраняем обновленные данные

          alert('Booking cancelled successfully.');
        }
      } catch (error) {
        console.error('Error cancelling booking:', error);
      }

      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="home">
        <div className="centerloading">
          <ReactLoading type="spin" color="#000" height={225} width={225} />
        </div>
      </div>
    );
  }

  if (!machineDetails) {
    return <p>Machine not found</p>;
  }

  return (
    <div className="home">
      <div className="item-details">
        <h1 className="item-title">{machineDetails.selectedMachine}</h1>
        <p className="item-time-left">
          Time Left: {formatTimeLeft(machineDetails.time)}
        </p>
        <div className="item-info">
          <div className="item-location">
            <h2>{machineDetails.id.split('-')[0]}</h2> {/* Dorm */}
            <h2>{machineDetails.id.split('-')[1]}</h2> {/* Floor */}
          </div>
          <div className="item-dates">
            <p>Day: {machineDetails.selectedDay}</p>
            <p>Time: {machineDetails.time}</p>
          </div>
        </div>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default Item;

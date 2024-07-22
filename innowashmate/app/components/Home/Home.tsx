import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB, FIREBASE_AUTH } from '@/FirebaseConfig';
import './home.module.css';
import ReactLoading from 'react-loading';

interface Schedule {
  id: string;
  selectedDay: string;
  selectedMachine: string;
  time: string;
  userName: string;
}

const Home: React.FC = () => {
  const [bookedSchedules, setBookedSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(
      async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          await fetchBookedSchedules(currentUser.uid);
        } else {
          router.push('/signup'); // Используйте router.push вместо navigate
        }
      },
    );
    return () => unsubscribe();
  }, [router]);

  const fetchBookedSchedules = async (userId: string) => {
    try {
      const userDocRef = doc(FIRESTORE_DB, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.error('No such user!');
        return;
      }

      const userName = userDocSnap.data()?.name;

      const schedulesCollection = collection(FIRESTORE_DB, 'schedules');
      const schedulesSnapshot = await getDocs(schedulesCollection);

      const fetchedBookedSchedules: Schedule[] = [];

      schedulesSnapshot.forEach((docSnap) => {
        const scheduleData = docSnap.data() as { bookings: Schedule[] };

        if (Array.isArray(scheduleData.bookings)) {
          scheduleData.bookings.forEach((booking) => {
            if (booking.userName === userName) {
              fetchedBookedSchedules.push(booking);
            }
          });
        }
      });

      setBookedSchedules(fetchedBookedSchedules);
    } catch (error) {
      console.error('Error fetching booked schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string) => {
    return `${time}`;
  };

  const handleSlotClick = (slotId: string) => {
    router.push(`/item/${slotId}`); // Используйте router.push вместо navigate
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

  return (
    <div className="home">
      <div className="Bookings">
        {bookedSchedules.length > 0 ? (
          bookedSchedules.map(
            ({ id, selectedDay, selectedMachine, time, userName }) => (
              <div
                key={id}
                className="bookbox"
                onClick={() => handleSlotClick(id)}
              >
                <div className="machinecont">
                  <p className="timeb">{formatTime(time)}</p>
                  <h1 className="machine">{selectedMachine}</h1>
                  <p className="user">Booked by: {userName}</p>
                  <p className="slot-id">Slot ID: {id}</p>
                  <p className="day">Day: {selectedDay}</p>
                </div>
              </div>
            ),
          )
        ) : (
          <p>No booked machines found.</p>
        )}
        <button className="bookbtn" onClick={() => router.push('/dashboard')}>
          BOOK
        </button>
      </div>
    </div>
  );
};

export default Home;

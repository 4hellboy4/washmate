import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'next/image'; // You can still use Image from next/image if you need its optimization features
import { getDoc, doc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import telegram from '@/app/assets/telegram.svg';
import './PersonalInfo.css';
import ReactLoading from 'react-loading';

interface UserInfo {
  name: string;
  email: string;
  tg: string;
}

const PersonalInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async (userId: string) => {
      const userDoc = doc(FIRESTORE_DB, 'users', userId);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        setUserInfo(docSnap.data() as UserInfo);
      } else {
        navigate('/signup');
      }
    };

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } else {
        navigate('/signup');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!userInfo) {
    return (
      <div className="centerloading">
        <ReactLoading type="spin" color="#000" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className="info">
      <h1 className="Name">{userInfo.name}</h1>
      <h3 className="email">{userInfo.email}</h3>
      <div className="telegram">
        {/*<Image src={telegram} alt='telegram' />*/}
        <h5 className="telegramtag">{userInfo.tg}</h5>
      </div>
    </div>
  );
};

export default PersonalInfo;

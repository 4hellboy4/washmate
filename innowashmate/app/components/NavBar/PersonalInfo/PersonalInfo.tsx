import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "next/image"; // You can still use Image from next/image if you need its optimization features
import { getDoc, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import telegram from "@/app/assets/telegram.svg";
import './PersonalInfo.css';

interface UserInfo {
    name: string;
    email: string;
    tg: string;
}

const PersonalInfo: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('fetchin info....')
        const fetchUserInfo = async (userId: string) => {
            try {
                const userDoc = doc(FIRESTORE_DB, "users", userId);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    setUserInfo(docSnap.data() as UserInfo);
                } else {
                    navigate('/signup');
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
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
        return <div>Loading...</div>;
    }

    return (
        <div className='info'>
            <h1 className='Name'>{userInfo.name}</h1>
            <h3 className='email'>{userInfo.email}</h3>
            <div className='telegram'>
                <Image src={telegram} alt='telegram' />
                <h5 className='telegramtag'>{userInfo.tg}</h5>
            </div>
        </div>
    );
}

export default PersonalInfo;

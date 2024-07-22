import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD85pS7GqTPUgmCeoKJqkbNnkT3vmoP970',
  authDomain: 'washmate-75b3d.firebaseapp.com',
  projectId: 'washmate-75b3d',
  storageBucket: 'washmate-75b3d.appspot.com',
  messagingSenderId: '867476615498',
  appId: '1:867476615498:web:248356543778bfd18b51b3',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

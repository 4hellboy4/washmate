// components/Auth/Signup/Signup.tsx
import React, { useState } from 'react';
import AuthInputField from '../AuthInputField/AuthInputField';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import '../Auth.css';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/FirebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
  FullName: string;
  TgAlias: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    FullName: '',
    TgAlias: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;

      // Get user token
      const token = await user.getIdToken();

      // Create document in Firestore
      await setDoc(doc(FIRESTORE_DB, 'users', user.uid), {
        name: formData.FullName,
        email: formData.email,
        tg: formData.TgAlias,
        token: token,
      });
      navigate('/');
      console.log('REGISTER Form submitted:', formData);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <AuthInputField
          label="Full Name"
          name="FullName"
          value={formData.FullName}
          placeholder="Enter your full name"
          onChange={handleChange}
        />
        <AuthInputField
          label="TgAlias"
          name="TgAlias"
          value={formData.TgAlias}
          placeholder="Enter your Tg Alias"
          onChange={handleChange}
        />
        <AuthInputField
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <AuthInputField
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <button type="submit">Signup</button>
      </form>
      <Link to={'/signup'}>If already registered - Login.</Link>
    </div>
  );
};

export default Signup;

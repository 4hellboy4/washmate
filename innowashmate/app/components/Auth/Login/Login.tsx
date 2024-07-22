// components/Auth/Login/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthInputField from '../AuthInputField/AuthInputField';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { Link } from 'react-router-dom';
import '../Auth.css';
import { useRouter } from 'next/router';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
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
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;
      console.log('Login Form submitted:', formData);
      navigate('/');
    } catch (error) {
      console.error('assdfsdf', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <Link to={'/signup'}>If not registered - Signup.</Link>
    </div>
  );
};

export default Login;

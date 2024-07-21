import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "../components/NavBar/NavBar"
import Home from "../components/Home/Home"
import About from "../components/About/About"
import Dashboard from "../components/Dashboard/Dashboard"
import Auth from '../components/Auth/Auth'
import Login from '@/app/components/Auth/Login/Login';
import Signup from '@/app/components/Auth/Signup/Signup';
import './app.css'
import AuthInputField from "@/app/components/Auth/AuthInputField/AuthInputField";

const App: React.FC = () => {
  Signup
  return (
    <Router>
      <div className='layout'>
        <NavBar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Auth><Signup /></Auth>} />
          <Route path="/login" element={<Auth><Login /></Auth>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "../components/NavBar/NavBar"
import Home from "../components/Home/Home"
import About from "../components/About/About"
import Dashboard from "../components/Dashboard/Dashboard"
import Auth from '../components/Auth/Auth'
import './app.css'

const App: React.FC = () => {
  return (
    <Router>
      <div className='layout'>
        {/*<NavBar />*/}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

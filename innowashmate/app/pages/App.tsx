import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "../components/Header"
import Home from "../components/Home"
import About from "../components/About"
import Dashboard from "../components/Dashboard"
import Item from "../components/Item"
import './app.css'

const App: React.FC = () => {
  return (
    <Router>
      <div className='layout'>
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

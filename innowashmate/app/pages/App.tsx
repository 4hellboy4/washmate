import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Aside from '../components/Aside/Aside'
import Home from "../components/Home/Home"
import About from "../components/About/About"

const App: React.FC = () => {
  return (
    <Router>
      <Aside/>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

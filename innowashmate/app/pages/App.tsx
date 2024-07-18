import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "../components/Header"
import Home from "../components/Home"
import About from "../components/About"

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

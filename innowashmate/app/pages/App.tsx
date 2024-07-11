import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "../components/Header"
import Home from "../components/Home"

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/*<Route path="/dashbord" element={<About />} />*/}
        {/*<Route path="/about" element={<Comic />} />*/}
        {/*<Route path="/logout" element={<Projects />} />*/}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

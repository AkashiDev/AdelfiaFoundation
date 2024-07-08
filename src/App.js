import './App.css';
import Missions from './components/Mission';
import About from './components/AboutUs';
import Donate from './components/Donate';
import Admin from './components/Admin';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Header from './components/Header';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    const handleLogin = () => {
    setIsAdminLoggedIn(true);
  };


 return (
    <Router>
         <Header />
         <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/admin" element={isAdminLoggedIn ? <Admin /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  ); 
};


export default App;
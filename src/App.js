import './App.css';
import Missions from './components/Mission';
import About from './components/AboutUs';
import Donate from './components/Donate';
import Admin from './components/Admin';
import HomePage from './components/HomePage';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 const App = () => {
 return (
    <Router>
         <Header />
         <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  ); 
};


export default App;

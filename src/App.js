import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login'
import Journal from './components/Home/Journal'
import NewEntry from './components/Home/NewEntry'
import Inspiration from './components/Home/Inspiration'
import Layout from './components/Home/Layout';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/journal" element={<Journal />} />
            <Route path="/new-entry" element={<NewEntry />} />
            <Route path="/inspiration" element={<Inspiration />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;






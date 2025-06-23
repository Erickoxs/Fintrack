import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import AddTransaction from './views/AddTransacion';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/addTransaction" element={<AddTransaction/>}/>
      </Routes>
    </Router>
  );
}

export default App

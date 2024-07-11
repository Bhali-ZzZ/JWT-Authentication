import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './Pages/Registeration/Registeration';
import Login from './Pages/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer/>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

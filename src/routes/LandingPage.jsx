// src/App.jsx
import React from 'react';
import QRCodePrinter from '../Admindashboard/QRCodePrinter'; // Import the QRCodePrinter component
import Home from '../pages/Home';
import {BrowserRouter , Routes, Route}  from 'react-router-dom';
import Navbar from "../components/Navbar"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import About from '../pages/About';
import Footer from '../pages/Footer';
import ServicesSection from '../pages/ServicesSection';
import Menu from '../pages/Menu';
import LoginPage from '../pages/LoginPage';




function LandingPage() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/service' element={<ServicesSection/>}></Route>
    <Route path='/menu' element={<Menu/>}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
   
    </Routes>
  
    <Footer/>
    </BrowserRouter>
  );
}

export default LandingPage;
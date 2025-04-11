import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from './pages/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ServicesSection from './pages/ServicesSection';
import Menu from './pages/Menu';
import LoginPage from './pages/LoginPage';
import Dashboard from './Admindashboard/Dashboard';
import UserMenu from './User/UserMenu';
import OrderConfirm from './User/OrderConfirm';
import LoadWithAnimation from './components/LoadWithAnimation'; // 👈 Import loader wrapper

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin-dashboard");
  const isUserTablePage = location.pathname.startsWith("/table/");
  const hideFooter = isAdminPage || isUserTablePage;

  return (
    <>
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<ServicesSection />} />
        <Route path="/menu" element={<Menu />} />

        {/* With loader animation 👇 */}
        <Route
          path="/login"
          element={
            <LoadWithAnimation>
              <LoginPage />
            </LoadWithAnimation>
          }
        />
        <Route
          path="/table/:tableId"
          element={
              <UserMenu />
          }
        />
        <Route path="/table/:tableId/confirm" element={<OrderConfirm />} />

        <Route path="/admin-dashboard/*" element={
          <LoadWithAnimation>
            <Dashboard />
          </LoadWithAnimation>} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

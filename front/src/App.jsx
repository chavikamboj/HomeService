import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Login from "./pages/Login";
import ServiceDetail from "./pages/ServiceDetail";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import ContactUs from "./pages/ContactUs";

import Register from "./pages/Register";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
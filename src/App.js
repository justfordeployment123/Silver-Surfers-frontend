import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Success from './pages/Success';
import Checkout from './pages/Checkout';
import Subscription from './pages/Subscription';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import AcceptTeamInvite from './pages/AcceptTeamInvite';
import Login from './pages/Login';
import Register from './pages/Register';
import ResendVerification from './pages/ResendVerification';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminBlog from './pages/AdminBlog';
import AdminServices from './pages/AdminServices';
import AdminFaqs from './pages/AdminFaqs';
import AdminContentManager from './pages/AdminContentManager';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<ProtectedRoute><Navigate to="/admin/content" replace /></ProtectedRoute>} />
            <Route path="/admin/content" element={<ProtectedRoute><AdminContentManager /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
            <Route path="/admin/faqs" element={<ProtectedRoute><AdminFaqs /></ProtectedRoute>} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/success" element={<Success />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
            <Route path="/subscription-success" element={<SubscriptionSuccess />} />
            <Route path="/team/accept" element={<AcceptTeamInvite />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/resend-verification" element={<ResendVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

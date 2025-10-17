import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getMe, logout as apiLogout } from '../api';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load current user from token
    (async () => {
      const res = await getMe();
      if (res && res.user) setUser(res.user);
      else setUser(null);
    })();
  }, [location.pathname]);

  // Close user menu on outside click or route change
  useEffect(() => {
    const onDocClick = (e) => {
      if (!isUserMenuOpen) return;
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [isUserMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    apiLogout();
    setUser(null);
    navigate('/', { replace: true });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-purple-100' 
        : 'bg-white/10 backdrop-blur-xl border-b border-white/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group" onClick={closeMobileMenu}>
          <div className="relative">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              <img 
                src="/Logo.png" 
                alt="Silver Surfers Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-xl transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              <span className="font-light">Silver</span>
              <span className="font-bold">Surfers</span>
            </span>
            <div className="h-0.5 w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 rounded-full"></div>
          </div>
        </Link>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/') 
                  ? (isScrolled ? 'text-green-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/services') 
                  ? (isScrolled ? 'text-green-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/about') 
                  ? (isScrolled ? 'text-green-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/contact') 
                  ? (isScrolled ? 'text-green-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              Contact
            </Link>
            {user && (
              <Link 
                to="/subscription" 
                className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                  isActive('/subscription') 
                    ? (isScrolled ? 'text-green-600' : 'text-white font-semibold') 
                    : (isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-gray-200 hover:text-white')
                }`}
              >
                Subscription
              </Link>
            )}
            <Link 
              to="/faq" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/faq') 
                  ? (isScrolled ? 'text-green-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              FAQ
            </Link>
            <Link 
              to="/blog" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/blog') 
                  ? (isScrolled ? 'text-green-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* Header CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              to="/services" 
              className="px-6 py-3 bg-gradient-to-r from-blue-500 via-green-600 to-teal-500 hover:from-blue-600 hover:via-green-700 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Your Audit
            </Link>
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen((s) => !s)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-full border transition ${isScrolled ? 'border-gray-300 hover:bg-gray-100' : 'border-white/30 hover:bg-white/10'} `}
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 via-green-600 to-teal-500 text-white flex items-center justify-center font-semibold">
                  {user?.email ? user.email.charAt(0).toUpperCase() : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  )}
                </div>
                <svg className={`w-4 h-4 ${isScrolled ? 'text-gray-800' : 'text-white'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
              </button>
              {isUserMenuOpen && (
                <div role="menu" className={`absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-xl ${isScrolled ? 'bg-white border border-gray-200' : 'bg-gray-900/95 border border-white/10'} backdrop-blur`}> 
                  {user ? (
                    <div className="py-1">
                      <div className={`px-4 py-2 text-xs ${isScrolled ? 'text-gray-600' : 'text-gray-300'}`}>{user.email}</div>
                      {user.role === 'admin' && (
                        <Link to="/admin/dashboard" onClick={() => setIsUserMenuOpen(false)} className={`block px-4 py-2 text-sm ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10'}`}>Switch to Admin Dashboard</Link>
                      )}
                      <Link to="/account" onClick={() => setIsUserMenuOpen(false)} className={`block px-4 py-2 text-sm ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10'}`}>Account</Link>
                      <button onClick={() => { setIsUserMenuOpen(false); handleLogout(); }} className={`w-full text-left px-4 py-2 text-sm ${isScrolled ? 'text-red-600 hover:bg-red-50' : 'text-red-400 hover:bg-red-500/10'}`}>Logout</button>
                    </div>
                  ) : (
                    <div className="py-1">
                      <Link to="/login" onClick={() => setIsUserMenuOpen(false)} className={`block px-4 py-2 text-sm ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10'}`}>Login</Link>
                      <Link to="/signup" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-500 via-green-600 to-teal-500 hover:from-blue-600 hover:via-green-700 hover:to-teal-600 rounded-none">Get Started</Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile quick actions */}
          <div className="flex lg:hidden items-center gap-2">
            <Link to="/services" className={`px-3 py-1.5 rounded-md text-xs font-medium ${isScrolled ? 'bg-green-600 text-white' : 'bg-white/20 text-white'} transition`}>
              Get Audit
            </Link>
            {/* Mobile Menu Button */}
            <button 
              className="p-2 rounded-lg transition-colors duration-300"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-gray-700' : 'bg-white'
                } ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-gray-700' : 'bg-white'
                } ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-gray-700' : 'bg-white'
                } ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}>
          <div className="pt-4 space-y-4">
            <Link 
              to="/" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/') 
                  ? 'bg-blue-100 text-green-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/services') 
                  ? 'bg-blue-100 text-green-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/about') 
                  ? 'bg-blue-100 text-green-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/contact') 
                  ? 'bg-blue-100 text-green-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            {user && (
              <Link 
                to="/subscription" 
                className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                  isActive('/subscription') 
                    ? 'bg-blue-100 text-green-600' 
                    : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
                }`}
                onClick={closeMobileMenu}
              >
                Subscription
              </Link>
            )}
            <Link 
              to="/faq" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/faq') 
                  ? 'bg-blue-100 text-green-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              FAQ
            </Link>
            <Link 
              to="/blog" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/blog') 
                  ? 'bg-blue-100 text-green-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <div className="pt-4 space-y-3">
              <Link to="/services" className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-500 via-green-600 to-teal-500 text-white font-semibold rounded-xl" onClick={closeMobileMenu}>Get Your Audit</Link>
              {user ? (
                <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="block w-full text-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl">Logout</button>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" onClick={closeMobileMenu} className="flex-1 text-center px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-xl">Login</Link>
                  <Link to="/register" onClick={closeMobileMenu} className="flex-1 text-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl">Register</Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
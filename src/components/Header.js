import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getMe, logout as apiLogout } from '../api';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-green-600 to-teal-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                <span className="font-light">Silver</span><span className="font-bold">Surfers</span>
              </span>
              <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-green-600 to-teal-600 rounded-full"></div>
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
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 hover:from-blue-700 hover:via-green-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Your Audit
            </Link>
            {user ? (
              <>
                <span className={isScrolled ? 'text-gray-800' : 'text-white'}>
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border border-transparent hover:border-red-500 text-red-600 hover:text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`px-4 py-2 rounded-lg ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/20'} transition`}>Login</Link>
                <Link to="/register" className="px-4 py-2 rounded-lg bg-gray-900/80 text-white hover:bg-gray-900 transition">Register</Link>
              </>
            )}
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
                  ? 'bg-green-100 text-green-600' 
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
                  ? 'bg-green-100 text-green-600' 
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
                  ? 'bg-green-100 text-green-600' 
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
                  ? 'bg-green-100 text-green-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            <Link 
              to="/faq" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/faq') 
                  ? 'bg-green-100 text-green-600' 
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
                  ? 'bg-green-100 text-green-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <div className="pt-4 space-y-3">
              <Link to="/services" className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 text-white font-semibold rounded-xl" onClick={closeMobileMenu}>Get Your Audit</Link>
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
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Add a small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-900/50 backdrop-blur-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://raw.githubusercontent.com/djl10886/image-hosting/refs/heads/main/processed_logo_black_on_transparent.png"
                alt="Clankr Intelligence Logo"
                className="w-6 h-6 brightness-0 invert mr-2"
              />
              <span className="text-white font-bold text-lg md:text-xl">Clankr Intelligence</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => scrollToSection('home')}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
            >
              About
            </button>
            <div className="relative group">
              <button
                onClick={() => scrollToSection('products')}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors flex items-center"
              >
                Products
                <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/docs/framework"
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  Framework Docs
                </Link>
                <Link
                  to="/docs/unrealengine"
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  UE Plugin Docs
                </Link>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
            >
              Products
            </button>
            <Link
              to="/docs/framework"
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 transition-colors pl-6"
              onClick={() => setIsOpen(false)}
            >
              Framework Docs
            </Link>
            <Link
              to="/docs/unrealengine"
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 transition-colors pl-6"
              onClick={() => setIsOpen(false)}
            >
              UE Plugin Docs
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
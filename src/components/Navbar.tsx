import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-900/50 backdrop-blur-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <img 
                src="https://raw.githubusercontent.com/djl10886/image-hosting/refs/heads/main/processed_logo_black_on_transparent.png"
                alt="Clankr Intelligence Logo"
                className="w-6 h-6 brightness-0 invert mr-2"
              />
              <span className="text-white font-bold text-xl">Clankr Intelligence</span>
            </NavLink>
          </div>
          <div className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-400 bg-slate-800'
                    : 'text-gray-300 hover:text-blue-400'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-400 bg-slate-800'
                    : 'text-gray-300 hover:text-blue-400'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-400 bg-slate-800'
                    : 'text-gray-300 hover:text-blue-400'
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-400 bg-slate-800'
                    : 'text-gray-300 hover:text-blue-400'
                }`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
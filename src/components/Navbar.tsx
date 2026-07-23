import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoWhite from '../assets/clankr-logo-white.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className="fixed w-full z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(7, 13, 26, 0.92)'
          : 'rgba(7, 13, 26, 0.6)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)' }}
            >
              <img src={logoWhite} alt="" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-white font-semibold text-base tracking-tight">
              Clankr Intelligence
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {/* Docs dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/5">
                Docs
                <ChevronDown size={14} className="opacity-60 group-hover:opacity-100 transition-all group-hover:rotate-180" />
              </button>
              <div
                className="absolute top-full left-0 mt-2 w-52 rounded-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150"
                style={{ background: '#0d1525', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
              >
                <Link
                  to="/docs/unrealengine/introduction"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Introduction
                </Link>
                <Link
                  to="/docs/unrealengine/quickstart"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Quick Start
                </Link>
                <Link
                  to="/docs/unrealengine/changelog"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Changelog
                </Link>
              </div>
            </div>

            <Link
              to="/download"
              className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              Download
            </Link>
            <button
              onClick={() => scrollToSection('products')}
              className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              Demo
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              Contact
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/docs/unrealengine"
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all"
              style={{
                background: 'rgba(6,182,212,0.15)',
                border: '1px solid rgba(6,182,212,0.4)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.25)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.15)';
              }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="px-4 py-3 space-y-1" style={{ background: 'rgba(7,13,26,0.98)' }}>
          <Link
            to="/docs/unrealengine"
            className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Documentation
          </Link>
          <Link
            to="/download"
            className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Download
          </Link>
          <button
            onClick={() => scrollToSection('products')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Demo
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Contact
          </button>
          <div className="pt-2 pb-1">
            <Link
              to="/docs/unrealengine"
              className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
              style={{ background: 'rgba(6,182,212,0.2)', border: '1px solid rgba(6,182,212,0.4)' }}
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

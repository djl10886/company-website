import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function FrameworkDocsNavigation() {
  const location = useLocation();
  const isCorePage = location.pathname === '/docs/framework/core-components';
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (!isCorePage) return;

      const sections = [
        'memory-module',
        'perception',
        'npc-profile',
        'runtime-context',
        'task-generation',
        'task-decomposition',
        'communication'
      ];
      
      let currentSection = '';
      
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + viewportHeight;
      const isAtBottom = scrollPosition >= documentHeight - 50;

      if (isAtBottom) {
        currentSection = 'communication';
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= viewportHeight * 0.4) {
              currentSection = section;
            }
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCorePage]);

  return (
    <nav className="w-64 bg-slate-800/50 backdrop-blur-sm h-[calc(100vh-4rem)] fixed top-16 left-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Framework</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/docs/framework/introduction"
              className={({ isActive }) =>
                `block text-sm ${
                  isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                } transition-colors`
              }
            >
              Introduction
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/docs/framework/terminology"
              className={({ isActive }) =>
                `block text-sm ${
                  isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                } transition-colors`
              }
            >
              Terminology
            </NavLink>
          </li>
          <li>
            <div>
              <NavLink
                to="/docs/framework/core-components"
                className={({ isActive }) =>
                  `block text-sm ${
                    isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  } transition-colors`
                }
              >
                Core Components
              </NavLink>
              {isCorePage && (
                <ul className="mt-2 ml-4 space-y-2">
                  <li>
                    <a
                      href="#memory-module"
                      className={`block text-sm ${
                        activeSection === 'memory-module' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      Memory Module
                    </a>
                  </li>
                  <li>
                    <a
                      href="#perception"
                      className={`block text-sm ${
                        activeSection === 'perception' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      Perception
                    </a>
                  </li>
                  <li>
                    <a
                      href="#npc-profile"
                      className={`block text-sm ${
                        activeSection === 'npc-profile' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      NPC Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#runtime-context"
                      className={`block text-sm ${
                        activeSection === 'runtime-context' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      Runtime Context
                    </a>
                  </li>
                  <li>
                    <a
                      href="#task-generation"
                      className={`block text-sm ${
                        activeSection === 'task-generation' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      Task Generation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#task-decomposition"
                      className={`block text-sm ${
                        activeSection === 'task-decomposition' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      Task Decomposition
                    </a>
                  </li>
                  <li>
                    <a
                      href="#communication"
                      className={`block text-sm ${
                        activeSection === 'communication' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      Communication
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li>
            <NavLink
              to="/docs/framework/architecture"
              className={({ isActive }) =>
                `block text-sm ${
                  isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                } transition-colors`
              }
            >
              Architecture
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
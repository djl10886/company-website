import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function UnrealDocsNavigation() {
  const location = useLocation();
  const isAuthoringGuidePage = location.pathname === '/docs/unrealengine/authoring-guide';
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (!isAuthoringGuidePage) return;

      const sections = [
        'core-npc-setup',
        'actions-and-movement',
        'spatial-authoring',
        'perception',
        'memory-and-persistence',
        'api-reference'
      ];
      
      let currentSection = '';
      
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + viewportHeight;
      const isAtBottom = scrollPosition >= documentHeight - 50;

      if (isAtBottom) {
        currentSection = sections[sections.length - 1];
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
  }, [isAuthoringGuidePage]);

  return (
    <nav className="w-64 bg-slate-800/50 backdrop-blur-sm h-[calc(100vh-4rem)] fixed top-16 left-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Unreal Engine Plugin</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/docs/unrealengine/introduction"
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
              to="/docs/unrealengine/changelog"
              className={({ isActive }) =>
                `block text-sm ${
                  isActive || location.pathname.startsWith('/docs/unrealengine/changelog') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                } transition-colors`
              }
            >
              Changelog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/docs/unrealengine/quickstart"
              className={({ isActive }) =>
                `block text-sm ${
                  isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                } transition-colors`
              }
            >
              Quick Start Guide
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/docs/unrealengine/setup"
              className={({ isActive }) =>
                `block text-sm ${
                  isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                } transition-colors`
              }
            >
              Setup
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/docs/unrealengine/configuration"
              className={({ isActive }) =>
                `block text-sm ${
                  isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                } transition-colors`
              }
            >
              Configuration
            </NavLink>
          </li>
          <li>
            <div>
              <NavLink
                to="/docs/unrealengine/authoring-guide"
                className={({ isActive }) =>
                  `block text-sm ${
                    isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  } transition-colors`
                }
              >
                Authoring Guide
              </NavLink>
              {isAuthoringGuidePage && (
                <ul className="mt-2 ml-4 space-y-2">
                  <li>
                    <a
                      href="#core-npc-setup"
                      className={`block text-sm ${
                        activeSection === 'core-npc-setup' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      Core NPC Setup
                    </a>
                  </li>
                  <li>
                    <a
                      href="#actions-and-movement"
                      className={`block text-sm ${
                        activeSection === 'actions-and-movement' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      Actions and Movement
                    </a>
                  </li>
                  <li>
                    <a
                      href="#spatial-authoring"
                      className={`block text-sm ${
                        activeSection === 'spatial-authoring' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      Spatial Authoring
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
                      href="#memory-and-persistence"
                      className={`block text-sm ${
                        activeSection === 'memory-and-persistence' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      Memory and Persistence
                    </a>
                  </li>
                  <li>
                    <a
                      href="#api-reference"
                      className={`block text-sm ${
                        activeSection === 'api-reference' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      API Reference
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

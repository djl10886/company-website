import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function UnrealDocsNavigation() {
  const location = useLocation();
  const isClassesPage = location.pathname === '/docs/unrealengine/classes';
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (!isClassesPage) return;

      const sections = [
        'configmanager',
        'rnpcsutilities',
        'worldactor',
        'environmentcomponent',
        'basecharacter',
        'basenpc',
        'basenpccontroller'
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
  }, [isClassesPage]);

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
              to="/docs/unrealengine/terminology"
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
                to="/docs/unrealengine/classes"
                className={({ isActive }) =>
                  `block text-sm ${
                    isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  } transition-colors`
                }
              >
                Classes
              </NavLink>
              {isClassesPage && (
                <ul className="mt-2 ml-4 space-y-2">
                  <li>
                    <a
                      href="#configmanager"
                      className={`block text-sm ${
                        activeSection === 'configmanager' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      ConfigManager
                    </a>
                  </li>
                  <li>
                    <a
                      href="#rnpcsutilities"
                      className={`block text-sm ${
                        activeSection === 'rnpcsutilities' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      RNPCsUtilities
                    </a>
                  </li>
                  <li>
                    <a
                      href="#worldactor"
                      className={`block text-sm ${
                        activeSection === 'worldactor' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      WorldActor
                    </a>
                  </li>
                  <li>
                    <a
                      href="#environmentcomponent"
                      className={`block text-sm ${
                        activeSection === 'environmentcomponent' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      EnvironmentComponent
                    </a>
                  </li>
                  <li>
                    <a
                      href="#basecharacter"
                      className={`block text-sm ${
                        activeSection === 'basecharacter' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      BaseCharacter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#basenpc"
                      className={`block text-sm ${
                        activeSection === 'basenpc' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      BaseNPC
                    </a>
                  </li>
                  <li>
                    <a
                      href="#basenpccontroller"
                      className={`block text-sm ${
                        activeSection === 'basenpccontroller' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      } transition-colors`}
                    >
                      BaseNPCController
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
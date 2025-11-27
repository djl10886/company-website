import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';

export default function Introduction() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="top" className="relative min-h-screen pt-16">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="fixed inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }}></div>
      <UnrealDocsNavigation />
      <div className="relative ml-64">
        <div className="mx-auto px-[8%] py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Unreal Engine Documentation
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <div className="space-y-6 text-left">
              <p className="text-gray-300 text-xl">
                Our Unreal Engine plugin provides an implementation of the <Link to="/docs/framework" className="text-blue-400 hover:text-blue-300 transition-colors">RealisticNPCs framework</Link>, allowing developers to easily create intelligent NPCs in their Unreal Engine projects. The plugin handles all the complexities of integrating with language models, managing NPC states, and coordinating behavior generation, letting developers focus on creating engaging gameplay experiences.
              </p>
              <p className="text-gray-300 text-xl">
                This documentation will focus on the technical details of how to use the plugin. For a more conceptual description of the framework itself, we recommend taking a look at the framework documentation (link above). Note that the plugin is currently in an alpha phase so there may be major changes without advanced warning.
              </p>
              <div className="pt-4">
                <Link
                  to="/changelog"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-lg"
                >
                  View Changelog →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
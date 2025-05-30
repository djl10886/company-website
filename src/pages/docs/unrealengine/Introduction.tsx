import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';

export default function Introduction() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="top" className="pt-16">
      <UnrealDocsNavigation />
      <div className="ml-64">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Unreal Engine Documentation
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-gray-300 text-xl leading-relaxed">
                Our Unreal Engine plugin provides an implementation of the <Link to="/docs/framework" className="text-blue-400 hover:text-blue-300 transition-colors">RealisticNPCs framework</Link>, allowing developers to easily create intelligent NPCs in their Unreal Engine projects. The plugin handles all the complexities of integrating with language models, managing NPC states, and coordinating behavior generation, letting developers focus on creating engaging gameplay experiences.
              </p>
              <p className="text-gray-300 text-xl leading-relaxed">
                This documentation will focus on the technical details of how to use the plugin. For a more conceptual description of the framework itself, we recommend taking a look at the framework documentation (link above). Note that the plugin is currently in an alpha phase so there may be major changes without advanced warning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
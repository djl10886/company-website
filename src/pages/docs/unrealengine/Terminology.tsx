import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';

export default function Terminology() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="top" className="pt-16">
      <UnrealDocsNavigation />
      <div className="ml-64">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terminology
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-gray-300 text-xl leading-relaxed">
              This plugin documentation uses standard Unreal Engine terminology and concepts where possible to maintain familiarity for developers. Any framework-specific terms are consistent with those defined in the framework documentation's <Link to="/docs/framework/terminology" className="text-blue-400 hover:text-blue-300 transition-colors">terminology</Link> page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
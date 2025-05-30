import React, { useEffect } from 'react';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';
import { Copy, Check } from 'lucide-react';
import RNPCsUtilitiesDocs from '../../../components/docs/RNPCsUtilitiesDocs';
import BaseCharacterDocs from '../../../components/docs/BaseCharacterDocs';
import BaseNPCDocs from '../../../components/docs/BaseNPCDocs';
import BaseNPCControllerDocs from '../../../components/docs/BaseNPCControllerDocs';
import ConfigManagerDocs from '../../../components/docs/ConfigManagerDocs';
import WorldActorDocs from '../../../components/docs/WorldActorDocs';
import EnvironmentComponentDocs from '../../../components/docs/EnvironmentComponentDocs';

export default function Classes() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div id="top" className="pt-16">
      <UnrealDocsNavigation />
      <div className="ml-64">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Classes
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div id="configmanager">
              <ConfigManagerDocs />
            </div>
            <div id="rnpcsutilities">
              <RNPCsUtilitiesDocs />
            </div>
            <div id="worldactor">
              <WorldActorDocs />
            </div>
            <div id="environmentcomponent">
              <EnvironmentComponentDocs />
            </div>
            <div id="basecharacter">
              <BaseCharacterDocs />
            </div>
            <div id="basenpc">
              <BaseNPCDocs />
            </div>
            <div id="basenpccontroller">
              <BaseNPCControllerDocs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
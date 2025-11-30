import React, { useEffect } from 'react';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';
import { Copy, Check } from 'lucide-react';
import RNPCsUtilitiesDocs from '../../../components/docs/RNPCsUtilitiesDocs';
import BaseCharacterDocs from '../../../components/docs/BaseCharacterDocs';
import BaseNPCDocs from '../../../components/docs/BaseNPCDocs';
import BaseNPCControllerDocs from '../../../components/docs/BaseNPCControllerDocs';
import BaseCalendarDocs from '../../../components/docs/BaseCalendarDocs';
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
              Classes
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          <div className="space-y-20">
            <div id="rnpcsutilities" className="scroll-mt-24">
              <RNPCsUtilitiesDocs />
            </div>
            <div id="worldactor" className="scroll-mt-24">
              <WorldActorDocs />
            </div>
            <div id="environmentcomponent" className="scroll-mt-24">
              <EnvironmentComponentDocs />
            </div>
            <div id="basecalendar" className="scroll-mt-24">
              <BaseCalendarDocs />
            </div>
            <div id="basecharacter" className="scroll-mt-24">
              <BaseCharacterDocs />
            </div>
            <div id="basenpc" className="scroll-mt-24">
              <BaseNPCDocs />
            </div>
            <div id="basenpccontroller" className="scroll-mt-24">
              <BaseNPCControllerDocs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
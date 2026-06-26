import React from 'react';
import { ArrowRight } from 'lucide-react';

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
      <span className="text-gray-400 text-base leading-relaxed">{text}</span>
    </div>
  );
}

export default function About() {
  return (
    <div className="relative py-24 px-6" style={{ background: '#070c18' }}>
      <div className="max-w-6xl mx-auto space-y-24">

        {/* Our Approach */}
        <section>
          <div className="mb-8">
            <span className="text-xs text-cyan-400 font-semibold tracking-widest uppercase">01 / Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">How it works</h2>
          </div>
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-lg text-gray-400 leading-relaxed">
              Our framework is designed to be flexible and to easily integrate into existing workflows. Developers
              customize an NPC using natural language descriptions — background, personality, and goals. NPC actions
              are implemented in standard code and registered with a clear natural language description. The framework
              then handles interfacing with the language model of choice to generate and execute behavior according to
              each NPC's specifications. Whether you're creating a vast open world or a focused narrative experience,
              Clankr brings your NPCs to life.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section>
          <div className="mb-10">
            <span className="text-xs text-cyan-400 font-semibold tracking-widest uppercase">02 / Potential Benefits</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Why it matters</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Players */}
            <div
              className="rounded-2xl p-8"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(6,182,212,0.15)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.3)' }}>P</span>
                For Players
              </h3>
              <div className="space-y-4">
                <BenefitItem text="Enhanced immersion from NPCs that actively participate in the world, making it feel alive and organic" />
                <BenefitItem text="Increased replay value as NPC interactions create unique scenarios each playthrough" />
                <BenefitItem text="More unpredictable experiences as NPC actions can influence the narrative in nondeterministic ways" />
                <BenefitItem text="Deeper engagement through more complex and meaningful NPC relationships" />
              </div>
            </div>

            {/* Developers */}
            <div
              className="rounded-2xl p-8"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }}>D</span>
                For Developers
              </h3>
              <div className="space-y-4">
                <BenefitItem text="Reduced development time for complex NPC behaviors through our AI-driven framework" />
                <BenefitItem text="Dynamic and emergent storytelling possibilities without manually scripting every interaction" />
                <BenefitItem text="Scalable NPC systems that adapt to different game themes, genres, and requirements" />
                <BenefitItem text="Easier maintenance and updates through self-sustaining AI behavior" />
              </div>
            </div>
          </div>
        </section>

        {/* Inspiration */}
        <section>
          <div className="mb-8">
            <span className="text-xs text-cyan-400 font-semibold tracking-widest uppercase">03 / Our Inspiration</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">What drives us</h2>
          </div>
          <div className="space-y-6 max-w-4xl">
            <p className="text-lg text-gray-400 leading-relaxed">
              As passionate gamers, we've spent countless hours exploring virtual worlds and interacting with NPCs.
              While these characters have come a long way, we've always dreamed of NPCs that could truly participate
              in shaping the world around them — not just as quest givers or merchants, but as dynamic entities with
              their own goals and agency.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Imagine a merchant who doesn't just stand behind a counter, but actively responds to market changes,
              forms relationships with other traders, and expands their business. Or a village guard who remembers
              past interactions, develops rivalries, and makes decisions based on personal history with the player.
              This vision of truly dynamic NPCs is what drives our innovation at Clankr Intelligence.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

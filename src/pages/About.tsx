import React from 'react';
import { Lightbulb, Target, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Potential Benefits Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Award className="text-blue-400 w-12 h-12 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Potential Benefits
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto space-y-12">
              {/* Player Benefits */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  From the Player Perspective
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  NPCs built with our approach can provide an enhanced gaming experience through several key benefits:
                </p>
                <ul className="text-gray-300 text-lg leading-relaxed space-y-6">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-4 mt-1.5">•</span>
                    <span>Enhanced immersion from NPCs actively participating in the game world, making the world feel more alive and organic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-4 mt-1.5">•</span>
                    <span>Increased replay value as NPC interactions and behaviors can create unique scenarios each playthrough</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-4 mt-1.5">•</span>
                    <span>More unpredictable playthroughs as NPC actions can influence the narrative in nondeterministic ways</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-4 mt-1.5">•</span>
                    <span>Deeper player engagement through more complex and meaningful NPC relationships</span>
                  </li>
                </ul>
              </div>

              {/* Developer Benefits */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  From the Developer Perspective
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Our framework offers game developers powerful tools and advantages:
                </p>
                <ul className="text-gray-300 text-lg leading-relaxed space-y-6">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-4 mt-1.5">•</span>
                    <span>Reduced development time for creating complex NPC behaviors through our AI-driven framework</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-4 mt-1.5">•</span>
                    <span>More dynamic and emergent storytelling possibilities without manually scripting every interaction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-4 mt-1.5">•</span>
                    <span>Scalable NPC systems that can adapt to different game themes, genres, and requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-4 mt-1.5">•</span>
                    <span>Easier maintenance and updates through self-sustaining AI behavior</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Target className="text-blue-400 w-12 h-12 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Approach
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto space-y-8">
              <p className="text-gray-300 text-lg leading-relaxed">
                We are looking at leveraging the processing ability of large language models by having them take the role of an NPC's "brain". The language model would allow the NPC to process various information about itself and then generate corresponding responses. The responses can then be translated into various in-game operations. Executing those operations produces updated information, which is fed back in to the language model. This repeating cycle would be what breathes life into NPCs.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                The process is also very straightforward from a technical perspective. Developers provide a natural language description on various aspects of a NPC, such as their background, personality, goals, etc. NPC actions can be coded as usual, and then provided to the framework with a corresponding description of that action. The framework handles the rest.
              </p>
            </div>
          </div>
        </section>

        {/* Our Inspiration Section */}
        <section>
          <div className="text-center mb-12">
            <Lightbulb className="text-blue-400 w-12 h-12 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Inspiration
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We are also avid enjoyers of open world and role-playing games, and in particular, the immersive world component. To that end, we believe that more dynamic NPCs can help further increase the immersion factor for such games. More dynamic NPCs could potentially even open all new playstyles not previously possible.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Current NPCs can have some dynamic behavior, but we feel like they could contribute more actively to the world they are part of. Instead of just representing an aspect of the game and/or world (such as a store or the start of a quest), what if NPCs could participate in events that happen in the world, interact with the characters in the world, or maybe even alter certain aspects of the world itself?
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
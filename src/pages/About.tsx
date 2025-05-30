import React from 'react';
import { Lightbulb, Target, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
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
                Our framework is designed to be flexible and to easily integrate into existing workflows. Developers can customize an NPC with natural language descriptions on various aspects of an NPC, such as their background, personality, and goals. NPC actions can be implemented using standard code and then integrated into the framework with a clear natural language description of their purposes. The framework handles interfacing with the language models of choice to generate and then execute behavior according to the NPC's specifications. Whether you're creating a vast open world or a focused narrative experience, our framework can help bring your NPCs to life.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                {/* Space for new paragraph */}
              </p>
            </div>
          </div>
        </section>

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
                As passionate gamers, we've spent countless hours exploring virtual worlds and interacting with NPCs. While these digital characters have come a long way, we've always dreamed of NPCs that could truly participate in shaping the world around them – not just as quest givers or merchants, but as dynamic entities with their own goals and agency.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Imagine a merchant who doesn't just stand behind their counter, but actively responds to market changes, forms relationships with other traders, and even expands their business. Or a village guard who remembers past interactions, develops rivalries, and makes decisions based on their personal history with the player. This vision of truly dynamic NPCs that can meaningfully impact their world is what drives our innovation at Clankr Intelligence.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
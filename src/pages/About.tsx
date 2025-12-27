import React from 'react';

export default function About() {
  return (
    <div className="relative min-h-screen pt-16">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 -z-10"></div>
      <div className="fixed inset-0 opacity-30 -z-10" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }}></div>

      <div className="px-6 py-32">
        <div className="max-w-6xl mx-auto">
          {/* Our Approach Section */}
          <section className="mb-32 text-center">
            <div className="space-y-6 mb-16">
              <div className="text-5xl font-bold text-white/10">01</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our Approach
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                Our framework is designed to be flexible and to easily integrate into existing workflows. Developers can customize an NPC with natural language descriptions on various aspects of an NPC, such as their background, personality, and goals. NPC actions can be implemented using standard code and then integrated into the framework with a clear natural language description of their purposes. The framework handles interfacing with the language models of choice to generate and then execute behavior according to the NPC's specifications. Whether you're creating a vast open world or a focused narrative experience, our framework can help bring your NPCs to life.
              </p>
            </div>
          </section>

          {/* Potential Benefits Section */}
          <section className="mb-32 text-center">
            <div className="space-y-6 mb-16">
              <div className="text-5xl font-bold text-white/10">02</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Potential Benefits
              </h2>
            </div>

            <div className="space-y-20">
              {/* Player Benefits */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-8">
                  From the Player Perspective
                </h3>
                <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-4xl mx-auto">
                  NPCs built with our approach can provide an enhanced gaming experience through several key benefits:
                </p>
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-white/20 mr-3 mt-1 text-2xl">→</span>
                      <span className="text-lg text-gray-400">Enhanced immersion from NPCs actively participating in the game world, making the world feel more alive and organic</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-white/20 mr-3 mt-1 text-2xl">→</span>
                      <span className="text-lg text-gray-400">Increased replay value as NPC interactions and behaviors can create unique scenarios each playthrough</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-white/20 mr-3 mt-1 text-2xl">→</span>
                      <span className="text-lg text-gray-400">More unpredictable playthroughs as NPC actions can influence the narrative in nondeterministic ways</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-white/20 mr-3 mt-1 text-2xl">→</span>
                      <span className="text-lg text-gray-400">Deeper player engagement through more complex and meaningful NPC relationships</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer Benefits */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-8">
                  From the Developer Perspective
                </h3>
                <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-4xl mx-auto">
                  Our framework offers game developers powerful tools and advantages:
                </p>
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-white/20 mr-3 mt-1 text-2xl">→</span>
                      <span className="text-lg text-gray-400">Reduced development time for creating complex NPC behaviors through our AI-driven framework</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-white/20 mr-3 mt-1 text-2xl">→</span>
                      <span className="text-lg text-gray-400">More dynamic and emergent storytelling possibilities without manually scripting every interaction</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-white/20 mr-3 mt-1 text-2xl">→</span>
                      <span className="text-lg text-gray-400">Scalable NPC systems that can adapt to different game themes, genres, and requirements</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-white/20 mr-3 mt-1 text-2xl">→</span>
                      <span className="text-lg text-gray-400">Easier maintenance and updates through self-sustaining AI behavior</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Inspiration Section */}
          <section className="text-center">
            <div className="space-y-6 mb-16">
              <div className="text-5xl font-bold text-white/10">03</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our Inspiration
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                As passionate gamers, we've spent countless hours exploring virtual worlds and interacting with NPCs. While these digital characters have come a long way, we've always dreamed of NPCs that could truly participate in shaping the world around them – not just as quest givers or merchants, but as dynamic entities with their own goals and agency.
              </p>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                Imagine a merchant who doesn't just stand behind their counter, but actively responds to market changes, forms relationships with other traders, and even expands their business. Or a village guard who remembers past interactions, develops rivalries, and makes decisions based on their personal history with the player. This vision of truly dynamic NPCs that can meaningfully impact their world is what drives our innovation at Clankr Intelligence.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
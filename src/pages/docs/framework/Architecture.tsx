import React, { useEffect } from 'react';
import FrameworkDocsNavigation from '../../../components/FrameworkDocsNavigation';

export default function Architecture() {
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
      <FrameworkDocsNavigation />
      <div className="relative ml-64">
        <div className="mx-auto px-[8%] py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Architecture
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          <div className="space-y-20">
            {/* Framework Overview Section */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Framework Overview</h2>
              <div className="space-y-8">
                <p className="text-gray-300 text-lg leading-relaxed">The following provides an overview of the framework's architecture:</p>
                <div className="flex justify-center my-12">
                  <img 
                    src="https://raw.githubusercontent.com/djl10886/image-hosting/refs/heads/main/Architecture%20diagram.jpg"
                    alt="Framework Architecture Diagram"
                    className="max-w-full rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Component Interactions Section */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Component Interactions</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Starting from the top of the diagram, an NPC can interact with and perceive the game environment through the perception component, which results in new memories being formulated and stored into the memory module. The interactions and perceptions of the game environment can also be used to update the characteristics in the NPC profile. Besides just storing memories and providing retrieval of those memories, the memories in the memory module can be processed in various ways, such as by filtering inconsequential memories or formulating higher-level or more abstract thoughts that build on and then take the place of previously individual memories. This processing could also have a corresponding effect on the characteristics in the NPC profile.
                </p>
                <p>
                  The task generation component can retrieve memories from the memory module along with NPC profile characteristics and runtime context information to generate tasks for the NPC to complete. The task decomposition component decomposes the generated tasks into executable actions which, when executed by the NPC, can influence and cause changes to the game environment. The NPC interacts and perceives those changes to the game environment, resulting in new memory formulation and, consequently, forming a loop for continuous and emergent NPC behavior.
                </p>
                <p>
                  Separately, the communication component allows an NPC to communicate by exchanging messages with other characters in the game environment, both other NPCs and player characters. The communication component can draw information from a variety of sources (e.g., memories from the memory module, NPC profile characteristics, runtime context information, generated tasks) to ensure that an NPC's communication remains consistent and coherent with the rest of the NPC's behavior and experiences.
                </p>
                <p>
                  More generally, the framework allows each of the components to be extended with more functionality than what is currently described while still offering implementation flexibility. The architecture itself can also be extended with more components or interactions between components to better reflect other aspects of human behavior to further bolster the framework.
                </p>
              </div>
            </div>

            {/* NPC Structure Section */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">NPC Structure</h2>
              <div className="space-y-8">
                <p className="text-gray-300 text-lg leading-relaxed">The following provides another way to conceptualize the NPC structure:</p>
                <div className="flex justify-center my-12">
                  <img 
                    src="https://raw.githubusercontent.com/djl10886/image-hosting/refs/heads/main/NPC%20structure%20diagram.jpg"
                    alt="NPC Structure Diagram"
                    className="max-w-full rounded-xl shadow-2xl"
                  />
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  A single runtime context can be shared across all NPCs, but each NPC can have their own instance of the other components, which interact with one another to generate the behavior for the NPC. The communication component for a particular NPC can interact with the other components for that NPC to ensure that the communication for that NPC remains consistent and coherent with that NPC's behavior and experiences, while also interacting with the communication component of other NPCs to facilitate inter-NPC communication.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  It should be noted that although the diagram shows NPCs and components in a composition relationship, implementations don't need to strictly follow that structure and can adapt to fit the paradigms of different engines. The main idea is that the components and their associated functionality can be individualized to different NPCs so they can all have their own independent behavior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect } from 'react';
import FrameworkDocsNavigation from '../../../components/FrameworkDocsNavigation';

export default function CoreComponents() {
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
              Core Components
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <p className="text-gray-300 text-xl">
              The RealisticNPCs framework consists of various components that handle different aspects of NPC functionality and work together to create dynamic, coherent, and realistic behavior patterns.
            </p>
          </div>

          <div className="space-y-20">
            <div id="memory-module" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Memory</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Like humans, NPC behavior shouldn't be determined in a vacuum, but based on their interactions with their environment and their past experiences. The memory module stores such information for an NPC, which the NPC can then subsequently draw on to generate behavior that is in line with their experiences, helping NPC behavior to maintain longer-term coherence.
                </p>
                <p>
                  Each NPC in a game environment can have their own memory module with the relevant memories for a given NPC provided to a language model as needed. This removes the need for the language model itself (or the associated architecture from a model provider) to maintain all the memories for all the NPCs in a game while also needing to figure out which memories to use for every generation request. This helps to greatly reduce inference costs (both in terms of latency and token quantity) which then translates to smoother NPC behaviors.
                </p>
                <p>
                  As NPCs continue to operate in the game environment, the quantity of memories in the memory module will continue to grow since the NPCs continue to formulate new memories. At some point, the sheer number of memories can start having negative effects both on the cost of memory retrieval as well as the cost of model inferences that rely on those memories. To mitigate this drawback, the memory module can periodically process existing memories to reduce the raw quantity of memories while maintaining the information stored in those memories.
                </p>
                <p>
                  One thing to note is that the memory module will need to be constantly accessed, both for storing new memories and retrieving existing memories. Thus, while any storage method could theoretically be used for the memory module, implementations should consider approaches that support quick access times to prevent excessive lag in NPC behaviors.
                </p>
              </div>
            </div>

            <div id="perception" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Perception</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  NPCs should be equipped with some way of perceiving the game environment to allow them to interact with that environment and use those interactions to influence their subsequent behavior. The particular perception method can be dependent on particular game requirements, and multiple perception methods can be added if needed. The NPC perception should generate observations that can either have an immediate effect on the NPC's behavior, or be added to the memory module as a new memory which can influence later behavior.
                </p>
              </div>
            </div>

            <div id="npc-profile" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">NPC Profile</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  An NPC profile is used to store various characteristics for a particular NPC. These characteristics can include an NPC's personality, their background, their relationships, their goals, their quirks/habits, etc., and can provide additional information for a language model to further tailor the generated behavior for the NPC. This information can also be combined with other components (such as the memories in the memory module). The characteristics in the NPC profile can also be dynamically updated as NPCs perform tasks and execute actions in the game environment, forming a feedback loop where the updated characteristics then influence later behavior.
                </p>
              </div>
            </div>

            <div id="runtime-context" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Runtime Context</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  The runtime context should provide information that is shared across all NPCs in a game environment to help their behavior remain grounded in that specific environment. Such information could include a world description (to prevent one NPC behaving as if they are in a low-fantasy environment while another NPC behaves as if they are in a high-fantasy environment) or a world time (to prevent one NPC thinking it's midnight while another NPC thinks it's high noon, assuming no in-game time zones, of course).
                </p>
              </div>
            </div>

            <div id="task-generation" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Task Generation</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  NPC tasks should be generated by drawing on information about an NPC from the other components so that the generated tasks maintain the NPC's behavioral consistency and reflect the NPC's current state/condition. Task generation should be done automatically without needing to be triggered manually by either a developer or a player. Task generation should also be done continuously, where a new task is generated once a previous task is completed, also without needing to be triggered manually by a developer or player.
                </p>
              </div>
            </div>

            <div id="task-decomposition" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Task Decomposition</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  For an NPC to actually perform a generated task, the task should be decomposed into one or more actions, which are the actual executable units of behavior. After decomposing the task into executable actions, the framework should handle actually having the NPC execute those actions. Similar to task generation, the task decomposition (including having the NPC execute the actions) should be done automatically without needing to be triggered manually by a developer or player. A user should be able to define the specific set of NPC actions that a task can be decomposed into since each game environment is different, so the set of actions appropriate for each game environment would also likely be different.
                </p>
              </div>
            </div>

            <div id="communication" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Communication</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  An NPC should be able to communicate with the other characters in a game, both other NPCs and player characters. This includes being able to transmit outgoing messages and receiving (and then processing) incoming messages. Communication between NPCs should not require human/player intervention and should proceed automatically between just the involved NPCs. The communication should remain coherent with the rest of the NPC's behavior and persona and thus should draw from other components as appropriate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
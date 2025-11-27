import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';

export default function QuickStart() {
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
      <UnrealDocsNavigation />
      <div className="relative ml-64">
        <div className="mx-auto px-[8%] py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Quick Start Guide
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          <div className="space-y-20">
            <div id="installation" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">1. Plugin Installation</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  First, follow the <Link to="/docs/unrealengine/setup" className="text-blue-400 hover:text-blue-300 transition-colors">setup instructions</Link> to install the plugin in your project.
                </p>
              </div>
            </div>

            <div id="project-settings" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">2. Configure Project Settings</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Open <strong>Project Settings → RealisticNPCs</strong> to configure the plugin:
                </p>

                <h3 className="text-xl font-semibold text-white mt-8">Language Model Configuration</h3>
                <p>
                  Create a file named <code className="bg-white/20 px-2 py-1 rounded">RealisticNPCsConfig.json</code> in your project's <code className="bg-white/20 px-2 py-1 rounded">Config</code> folder, then set the path in Project Settings. The file must include:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Service provider label (e.g., OpenAI)</li>
                  <li>API endpoint and key</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">default_heavy_target</code> - for expensive reasoning (daily plans, conversations)</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">default_light_target</code> - for cheaper tasks (memory retrieval, summaries)</li>
                </ul>
                <p>
                  See the <Link to="/docs/unrealengine/configuration" className="text-blue-400 hover:text-blue-300 transition-colors">configuration guide</Link> for the complete file format.
                </p>

                <h3 className="text-xl font-semibold text-white mt-8">World Description</h3>
                <p>
                  You can provide the world description in two ways (if both are provided, the inline description takes precedence):
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li><strong>InlineWorldDescription</strong> - Enter the description directly in Project Settings</li>
                  <li><strong>WorldDescriptionFilePath</strong> - Set a path to a text file containing the description</li>
                </ul>
                <p>
                  Your world description should include:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Setting and time period</li>
                  <li>Cultural norms and customs</li>
                  <li>Economic systems</li>
                  <li>Technology level</li>
                  <li>Important rules or constraints</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-8">Initial Game Time</h3>
                <p>
                  Set the <strong>Initial Game Start Time</strong> to specify when the in-game clock begins (e.g., Day 1, Month 1, Year 2000, 08:00). The plugin uses a global time system to ensure all NPCs maintain a unified sense of time.
                </p>
                <p className="mt-4 text-sm text-gray-400">
                  Note: The plugin automatically loads these configurations on startup. No manual loading code is required.
                </p>
              </div>
            </div>

            <div id="physical-locations" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">3. Setting Up Physical Locations</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>Create locations that NPCs can interact with:</p>
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>
                    Create a Blueprint class that inherits from <Link to="/docs/unrealengine/classes#worldactor" className="text-blue-400 hover:text-blue-300 transition-colors">WorldActor</Link>
                    <ul className="list-disc list-inside pl-8 mt-2 space-y-2">
                      <li>Name it appropriately (e.g., BP_House)</li>
                      <li>Set the WorldActorOwner if applicable</li>
                    </ul>
                  </li>
                  <li>
                    Add <Link to="/docs/unrealengine/classes#environmentcomponent" className="text-blue-400 hover:text-blue-300 transition-colors">EnvironmentComponent</Link> instances to define specific areas
                    <ul className="list-disc list-inside pl-8 mt-2 space-y-2">
                      <li>Set descriptive ComponentName (e.g., "Alice's house - kitchen")</li>
                    </ul>
                  </li>
                  <li>Place the WorldActor Blueprint in your level</li>
                </ol>
              </div>
            </div>

            <div id="creating-npcs" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">4. Creating NPCs</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <h3 className="text-xl font-semibold text-white">A. Create NPC Character Class</h3>
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>Create a custom class inheriting from <Link to="/docs/unrealengine/classes#basenpc" className="text-blue-400 hover:text-blue-300 transition-colors">BaseNPC</Link></li>
                  <li>
                    In the class Blueprint, configure NPC settings in the Details panel:
                    <ul className="list-disc list-inside pl-8 mt-2 space-y-2">
                      <li>Set CharacterName (e.g., "Alice Smith")</li>
                      <li>Write a detailed Background description</li>
                      <li>Define ShortTermGoal</li>
                      <li>Add Relationships with other characters</li>
                      <li>Add KnownActorsAndLocations (WorldActor references)</li>
                      <li>Optional: Define ActionLibrary (available actions)</li>
                    </ul>
                  </li>
                  <li>Override <code className="bg-white/20 px-2 py-1 rounded">ReceiveMessage</code> to customize how the NPC handles receiving a conversation message from another character. Refer to the <Link to="/docs/unrealengine/classes#basecharacter" className="text-blue-400 hover:text-blue-300 transition-colors">BaseCharacter</Link> documentation for more details on the function definition.</li>
                </ol>

                <h3 className="text-xl font-semibold text-white mt-8">B. Create NPC Controller Class</h3>
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>Create a custom class inheriting from <Link to="/docs/unrealengine/classes#basenpccontroller" className="text-blue-400 hover:text-blue-300 transition-colors">BaseNPCController</Link></li>
                  <li>
                    Define NPC actions using standard Unreal Engine code and logic. When registering actions, specify:
                    <ul className="list-disc list-inside pl-8 mt-2 space-y-2">
                      <li>
                        <strong>Completion Mode:</strong>
                        <ul className="list-disc list-inside pl-12 mt-1 space-y-1">
                          <li><code className="bg-white/20 px-2 py-1 rounded">Until_Complete</code> - Action runs until completion (e.g., walk to location). Must call <code className="bg-white/20 px-2 py-1 rounded">FinishNPCAction()</code> when done.</li>
                          <li><code className="bg-white/20 px-2 py-1 rounded">Duration</code> - Action runs for a dynamic duration determined by the plugin. Do NOT call <code className="bg-white/20 px-2 py-1 rounded">FinishNPCAction()</code>.</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Usage Flag:</strong>
                        <ul className="list-disc list-inside pl-12 mt-1 space-y-1">
                          <li><code className="bg-white/20 px-2 py-1 rounded">Primary</code> - Core actions for executing NPC plans</li>
                          <li><code className="bg-white/20 px-2 py-1 rounded">Filler</code> - Simple actions for downtime (e.g., "lean on railing", "look around")</li>
                          <li><code className="bg-white/20 px-2 py-1 rounded">Primary | Filler</code> - Actions that can serve both roles</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    In Event BeginPlay or OnPossess:
                    <ul className="list-disc list-inside pl-8 mt-2 space-y-2">
                      <li>Register NPC actions using <code className="bg-white/20 px-2 py-1 rounded">RegisterNPCAction</code> with completion mode and usage flag</li>
                      <li>Set up a perception system (e.g., AI Perception component) and use <code className="bg-white/20 px-2 py-1 rounded">UpdatePerception</code> to inform the plugin of NPC perception updates</li>
                      <li>Call <code className="bg-white/20 px-2 py-1 rounded">StartNPC()</code> to begin NPC behavior (daily planning, scheduling, execution)</li>
                    </ul>
                  </li>
                  <li>
                    Optional: Override <code className="bg-white/20 px-2 py-1 rounded">OnNPCActionFinished()</code> to customize cleanup behavior that runs after every action completes
                  </li>
                </ol>
              </div>
            </div>

            <div id="player-character" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">5. Setting Up Player Character</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>Create a custom class inheriting from <Link to="/docs/unrealengine/classes#basecharacter" className="text-blue-400 hover:text-blue-300 transition-colors">BaseCharacter</Link></li>
                  <li>In the class Blueprint, set the CharacterName in the Details panel</li>
                  <li>
                    Override conversation-related functions:
                    <ul className="list-disc list-inside pl-8 mt-2 space-y-2">
                      <li><code className="bg-white/20 px-2 py-1 rounded">ReceiveMessage</code> - Customize how the player character handles receiving a conversation message from an NPC</li>
                      <li><code className="bg-white/20 px-2 py-1 rounded">FinishConvo</code> - Customize how the player character handles finishing a conversation with an NPC</li>
                    </ul>
                  </li>
                  <li>
                    When initiating conversations with NPCs:
                    <ul className="list-disc list-inside pl-8 mt-2 space-y-2">
                      <li>Call <code className="bg-white/20 px-2 py-1 rounded">RequestConversation(ABaseCharacter* Partner)</code> first to request the NPC's attention</li>
                      <li>Only send messages if the request returns <code className="bg-white/20 px-2 py-1 rounded">true</code> (NPC accepted)</li>
                      <li>Use <code className="bg-white/20 px-2 py-1 rounded">ForceEndConversation()</code> if you need to abort a conversation early</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>

            <div id="testing" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">6. Testing Your Setup</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Place your NPCs and WorldActors in the level. Each NPC should automatically:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Generate a daily plan with tasks based on their background and goals</li>
                  <li>Schedule and execute plans throughout the day</li>
                  <li>Break down high-level tasks into sequences of executable actions</li>
                  <li>Interact with WorldActors and other characters</li>
                  <li>Form memories of their experiences</li>
                  <li>Engage in conversations when appropriate</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-8">Debugging Tips</h3>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Enable <code className="bg-white/20 px-2 py-1 rounded">bLogTasks</code> on an NPC to see their complete thinking process (daily plans, expansions, action sequences)</li>
                  <li>Warning: Task logging is very verbose - only enable for one or a few NPCs at a time to avoid flooding the console</li>
                  <li>Use <code className="bg-white/20 px-2 py-1 rounded">bNPCEnabled</code> to disable autonomous behavior for specific NPCs (they will still engage in conversations)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
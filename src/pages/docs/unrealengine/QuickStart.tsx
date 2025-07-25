import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';

export default function QuickStart() {
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
              Quick Start Guide
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Installation */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">1. Plugin Installation</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  First, follow the <Link to="/docs/unrealengine/setup" className="text-blue-400 hover:text-blue-300 transition-colors">setup instructions</Link> to install the plugin in your project. Once installed, enable the plugin in your project settings and restart the editor.
                </p>
              </div>
            </div>

            {/* Configuration */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">2. Language Model Configuration</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Create a file named <code className="bg-white/20 px-2 py-1 rounded">RealisticNPCsConfig.json</code> in your project's <code className="bg-white/20 px-2 py-1 rounded">Config</code> folder. This file specifies which language model(s) the plugin will use. At minimum, include:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Service provider details (e.g., OpenAI)</li>
                  <li>API endpoint</li>
                  <li>API key</li>
                  <li>Default model target</li>
                </ul>
                <p>
                  See the <Link to="/docs/unrealengine/configuration" className="text-blue-400 hover:text-blue-300 transition-colors">configuration guide</Link> and <Link to="/docs/unrealengine/classes#configmanager" className="text-blue-400 hover:text-blue-300 transition-colors">ConfigManager class documentation</Link> for more details.
                </p>
              </div>
            </div>

            {/* World Description */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">3. World Description Setup</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Create a text file containing your game world's description. This provides context for NPC behavior. Include:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Setting and time period</li>
                  <li>Cultural norms and customs</li>
                  <li>Economic systems</li>
                  <li>Technology level</li>
                  <li>Important rules or constraints</li>
                </ul>
                <p className="mt-4">
                  In your game instance's <code className="bg-white/20 px-2 py-1 rounded">Init()</code> function, load the world description using the <Link to="/docs/unrealengine/classes#rnpcsutilities" className="text-blue-400 hover:text-blue-300 transition-colors">RNPCsUtilities</Link> class:
                </p>
                <pre className="bg-slate-800/50 p-4 rounded-lg mt-2 overflow-x-auto">
                  <code className="text-sm text-gray-300">RNPCsUtilities::LoadWorldDescription(TEXT("/Game/Config/WorldDescription.txt"));</code>
                </pre>
              </div>
            </div>

            {/* Physical Locations */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">4. Setting Up Physical Locations</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
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
                      <li>Set appropriate ComponentAccessLevel (Public/Private)</li>
                    </ul>
                  </li>
                  <li>Place the WorldActor Blueprint in your level</li>
                </ol>
              </div>
            </div>

            {/* NPC Setup */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">5. Creating NPCs</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <h3 className="text-xl font-semibold text-white mb-4">A. Create NPC Character Class</h3>
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>Create a Blueprint class inheriting from <Link to="/docs/unrealengine/classes#basenpc" className="text-blue-400 hover:text-blue-300 transition-colors">BaseNPC</Link></li>
                  <li>
                    Configure NPC settings in the Details panel:
                    <ul className="list-disc list-inside pl-8 mt-2 space-y-2">
                      <li>Set CharacterName (e.g., "Alice Smith")</li>
                      <li>Write a detailed Background description</li>
                      <li>Define ShortTermGoal</li>
                      <li>Add Relationships with other characters</li>
                      <li>Add KnownActorsAndLocations (WorldActor references)</li>
                      <li>Optional: Define ActionLibrary (available actions)</li>
                    </ul>
                  </li>
                </ol>

                <h3 className="text-xl font-semibold text-white mt-8 mb-4">B. Create NPC Controller Class</h3>
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>Create a Blueprint class inheriting from <Link to="/docs/unrealengine/classes#basenpccontroller" className="text-blue-400 hover:text-blue-300 transition-colors">BaseNPCController</Link></li>
                  <li>Define your own NPC actions (using standard Unreal Engine logic) with a FinishNPCAction function call at the end of each action</li>
                  <li>
                    In the Event BeginPlay or OnPossess:
                    <ul className="list-disc list-inside pl-8 mt-2 space-y-2">
                      <li>Register NPC actions using RegisterNPCAction</li>
                      <li>Set up a perception system (e.g., AI Perception component)</li>
                      <li>Call StartNPCTask to begin behavior generation</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>

            {/* Player Character */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">6. Setting Up Player Character</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>Create a Blueprint class inheriting from <Link to="/docs/unrealengine/classes#basecharacter" className="text-blue-400 hover:text-blue-300 transition-colors">BaseCharacter</Link></li>
                  <li>Set the CharacterName in the Details panel</li>
                  <li>Add any custom functionality needed for player interaction</li>
                </ol>
              </div>
            </div>

            {/* Testing */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">7. Testing Your Setup</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Place your NPCs and WorldActors in the level. Each NPC should automatically:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Generate tasks based on their background and goals</li>
                  <li>Break down tasks into executable actions</li>
                  <li>Interact with WorldActors and other characters</li>
                  <li>Form memories of their experiences</li>
                  <li>Engage in conversations when appropriate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
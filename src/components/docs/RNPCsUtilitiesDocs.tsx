import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function RNPCsUtilitiesDocs() {
  const [copied, setCopied] = useState(false);
  const worldDescription = `Aeldenvale is a land of untamed wilderness, where civilizations cling to ancient traditions and fragile alliances. Feudal lords rule fractured kingdoms, their power barely extending beyond the trade roads. The Old Ways, tied to nature and ancient deities, clash with the Church of the Eternal Flame, which seeks to unify the people under one faith. Rural villages uphold ancient customs, while cities embrace the Church's vision of progress.

Thornwharf, a hamlet on the River Wold, houses about a hundred souls in timber cottages amid fields and ancient woods. The self-sufficient village revolves around shared traditions, agrarian life, and reverence for the land. The villagers follow the Old Ways, leaving offerings to honor spirits of harvest and hearth, and speak in a lilting dialect filled with agrarian proverbs. Children learn skills like plowing and weaving through imitation.`;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6">RNPCsUtilities</h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          A class that provides various utilities for the plugin.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Functions</h3>

        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">LoadWorldDescription</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">static void LoadWorldDescription(FString Filepath)</code>
            </p>
            <p className="mb-4">
              This function reads a world description from a given file path and stores it for use throughout the plugin. The world description should provide context about the world/environment that NPCs will operate in. This might include the general setting information (e.g., time period or technology level), cultural norms and customs, economic systems, notable rules or constraints, etc. The following is a sample world description file:
            </p>

            <div className="relative">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(worldDescription);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                title="Copy world description"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-300" />}
              </button>
              <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">{worldDescription}</pre>
              </div>
            </div>

            <p className="mb-4">
              Although the more detailed the world description the more contextually accurate NPC behavior will be, note that because this description will be used often, inference time and monetary costs will both suffer if the description becomes too long. Just as a reference, our initial tests found that a world description around 6-7 sentences can be sufficient for NPC behavior to maintain the correct context.
            </p>
            <p className="mb-4">
              This function is meant to be called at the very start of play before any NPC behavior is generated, such as in the Init() function of your custom game instance.
            </p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">Filepath</code>: The full path to the world description file.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">SetDayLength</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">static void SetDayLength(float NewDayLength)</code>
            </p>
            <p className="mb-4">
              This function sets the length, in seconds, of a single in-game day. By default, the plugin uses a length of 900 seconds, or 15 minutes. The concept of time is to help maintain time cohesion between NPCs, so there aren't scenarios where one NPC operates thinking it is midnight while another NPC operates thinking it is high noon.
            </p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">NewDayLength</code>: The length of a single in-game day, in seconds.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">BeginTime</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">static void BeginTime(UWorld* World)</code>
            </p>
            <p className="mb-4">
              This function begins the time tracking for the plugin. This function is meant to be called at the start of play before any NPC behavior. By default, this function will be called right before the very first NPC behavior starts.
            </p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">World</code>: The current UWorld instance that is loaded.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';

export default function RNPCsUtilitiesDocs() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">RNPCsUtilities</h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          A class that provides various utilities for the plugin.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Functions</h3>

        <div className="space-y-8">
          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">LoadWorldDescription</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">static void LoadWorldDescription(FString Filepath)</code>
              </p>
              <p className="mb-4">
                This function reads a world description from a given file path and stores it for use throughout the plugin. The world description should provide context about the world/environment that NPCs will operate in. This might include the general setting information (e.g., time period or technology level), cultural norms and customs, economic systems, notable rules or constraints, etc.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Filepath</code>: The full path to the world description file.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
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
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
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
    </>
  );
}
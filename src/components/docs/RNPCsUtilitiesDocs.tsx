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
                <code className="bg-white/20 px-2 py-1 rounded">SetGameWorldTime</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">static void SetGameWorldTime(UWorld* World, FGameDateTime NewTime)</code>
              </p>
              <p className="mb-4">
                Sets the game time of the given world to the specified FGameDateTime value.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">World</code>: The UWorld instance to set the time for.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">NewTime</code>: The new FGameDateTime value to set as the current game time.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">SetGameWorldTime</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">static void SetGameWorldTime(UWorld* World, int64 NewTimeInTicks)</code>
              </p>
              <p className="mb-4">
                Sets the game time of the given world to the specified tick value.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">World</code>: The UWorld instance to set the time for.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">NewTimeInTicks</code>: The new time value in ticks to set as the current game time.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import React from 'react';

export default function ConfigManagerDocs() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">ConfigManager</h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          A class that is responsible for loading and managing the language model configurations that the plugin will use for NPC behavior generation.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Functions</h3>
        <div className="space-y-8">
          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">LoadConfig</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">static bool LoadConfig()</code>
              </p>
              <p className="mb-4">
                Loads the configuration settings from the RealisticNPCsConfig.json file. This function is meant to be called at the start of play before any NPC behavior generation begins, such as in the Init() function of your custom game instance. By default, the plugin will read in the configuration (if it hasn't already been read in) right before the first NPC controller begins generating tasks for an NPC.
              </p>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>True if the RealisticNPCsConfig.json file was successfully loaded; false otherwise.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
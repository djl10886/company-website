import React, { useEffect } from 'react';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';
import { LOCAL_DEPLOYMENT_SCOPE } from '../../../data/localRelease';

export default function Setup() {
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
              Setup Instructions
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          <div className="space-y-8">
            <p className="text-gray-300 text-xl leading-relaxed">
              Close the Unreal Editor, then extract the downloaded product ZIP. The archive root contains release documents and one <code className="bg-white/20 px-2 py-1 rounded">RealisticNPCs</code> plugin directory. Install that complete directory—not the archive root or only its <code className="bg-white/20 px-2 py-1 rounded">Source</code> folder—and do not rearrange its contents or mix files from different releases.
            </p>
            <p className="text-gray-300 text-xl leading-relaxed">
              For the recommended project-specific installation, create <code className="bg-white/20 px-2 py-1 rounded">&lt;Project&gt;/Plugins</code> if it does not exist, then copy the extracted plugin directory so its descriptor is located at <code className="bg-white/20 px-2 py-1 rounded">&lt;Project&gt;/Plugins/RealisticNPCs/RealisticNPCs.uplugin</code>.
            </p>
            <p className="text-gray-300 text-xl leading-relaxed">
              For an optional engine-wide installation, copy the complete plugin directory to <code className="bg-white/20 px-2 py-1 rounded">&lt;Unreal Engine&gt;/Engine/Plugins/Marketplace/RealisticNPCs</code>. This makes it available to compatible projects using that Unreal Engine installation.
            </p>
            <p className="text-gray-300 text-xl leading-relaxed">
              After copying the plugin, regenerate project files when required by your Unreal workflow and compile the project. Open the editor, verify that RealisticNPCs is enabled under <strong>Edit -&gt; Plugins</strong>, enable it if necessary, and restart when prompted.
            </p>
            <p className="text-gray-300 text-xl leading-relaxed">
              The complete plugin directory already includes the bundled Win64 daemon at <code className="bg-white/20 px-2 py-1 rounded">RealisticNPCs/Binaries/ThirdParty/RealisticNPCsDaemon/Win64/rnpc-daemon.exe</code>. Leave it in that location. Unreal finds, starts, monitors, and stops it automatically; do not download, copy, or launch the daemon separately.
            </p>
            <p className="text-gray-300 text-xl leading-relaxed">
              If your project uses plugin classes from C++, add "RealisticNPCs" to the appropriate dependency list in your module's Build.cs file. Use PublicDependencyModuleNames when public headers expose plugin types, or PrivateDependencyModuleNames when the dependency is only used inside your module implementation.
            </p>
            <p className="text-gray-300 text-xl leading-relaxed">
              After enabling the plugin, open <strong>Window -&gt; RealisticNPCs Daemon Config</strong> to configure services, securely store API keys, assign model targets, save the profile, and validate it. Unreal starts and stops the managed daemon automatically; you do not launch or connect it manually.
            </p>
            <div
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-5 text-amber-100"
              role="note"
            >
              <p className="text-xl leading-relaxed">
                <strong className="text-amber-200">Deployment scope:</strong>{' '}
                {LOCAL_DEPLOYMENT_SCOPE}
              </p>
            </div>
            <p className="text-gray-300 text-xl leading-relaxed">
              If the bundled Win64 daemon is missing, incompatible, or cannot use the saved profile, NPC behavior remains inactive instead of falling back to a separate local implementation. Check the Unreal Output Log for the startup milestone or actionable failure message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

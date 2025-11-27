import React, { useEffect } from 'react';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';

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
              After downloading the plugin, you'll find a folder named "RealisticNPCs" - this is the plugin's root directory. Note that if downloading the plugin as a zip file, the top level folder name contains a "-main" suffix - make sure to remove the suffix from the folder name. You have two options for installing the plugin: as an engine-wide plugin available to all projects, or as a project-specific plugin. Both methods are explained below.
            </p>
            <p className="text-gray-300 text-xl leading-relaxed">
              For an engine-wide installation, navigate to your Unreal Engine installation directory and locate the "Plugins" folder. Copy the entire "RealisticNPCs" folder into this directory. Launch the Unreal Editor, open the Plugins window (Edit → Plugins), find the "RealisticNPCs" plugin, and enable it. Restart the editor for the changes to take effect.
            </p>
            <p className="text-gray-300 text-xl leading-relaxed">
              For a project-specific installation, locate your project's root directory (where your .uproject file is) and create a "Plugins" folder if it doesn't exist. Copy the "RealisticNPCs" folder into this new "Plugins" folder. Right-click your .uproject file and select "Generate Visual Studio project files", then build the project. When you launch the editor, the plugin should be automatically enabled and ready to use.
            </p>
            <p className="text-gray-300 text-xl leading-relaxed">
              Remember to include "RealisticNPCs" in the PublicDependencyModuleNames of your project's Build.cs file so the plugin's headers are visible to your project's files.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
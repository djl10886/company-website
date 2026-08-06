import React from 'react';
import { Release } from './types';

export const v0_4_0: Release = {
  version: 'v0.4.0',
  date: 'July 2026',
  summary: 'Moved NPC cognition to the managed RealisticNPCs Core daemon, introduced editor-based model configuration, and added save-game continuity integration',
  highlights: [
    'NPC cognition now runs through an automatically managed local daemon while Unreal remains the authoring and gameplay integration layer',
    'Model services, usage targets, and secure API keys are configured through the new RealisticNPCs Daemon Config panel',
    'Added continuity workflows for creating, saving, and resuming persistent NPC histories',
    'Existing NPC, action, perception, relationship, and spatial authoring workflows remain largely unchanged',
  ],
  content: (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">1. High-Level Overview</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            RealisticNPCs now runs NPC cognition in the managed RealisticNPCs Core daemon. The Unreal plugin remains responsible for authoring, perception, live-world validation, navigation, and gameplay action execution.
          </li>
          <li>
            This is primarily an architectural and configuration release rather than a new authoring-system release. Existing NPC profiles, relationships, action sets, perception setup, and spatial authoring continue to use the same core concepts introduced in v0.3.0.
          </li>
          <li>
            Planning, intentions, behavior policies, memory, identity development, and conversation cognition now share one persistent engine-agnostic runtime outside Unreal.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">2. Managed Core Daemon</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            The plugin automatically launches and connects to the matching local daemon when a world containing enabled NPCs starts. Authors no longer select a cognition backend or configure a local transport endpoint.
          </li>
          <li>
            Unreal continues to validate every daemon command against the live game world before executing movement, conversation, or a registered gameplay action.
          </li>
          <li>
            There is no Unreal-native cognition fallback. If the daemon cannot start or synchronize, affected NPCs remain inactive and Unreal reports an actionable startup error instead of silently switching behavior systems.
          </li>
        </ul>
        <p className="text-white mt-4">
          For normal authoring and PIE use, daemon startup and shutdown are managed by the plugin. Packaged projects use the native daemon supplied for their target platform.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">3. New Model Configuration Workflow</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Model services and usage targets are now configured through <strong className="text-white">Window &gt; RealisticNPCs Daemon Config</strong> in the Unreal Editor.
          </li>
          <li>
            The panel saves the canonical <code className="bg-slate-800/50 px-2 py-1 rounded">Config/RealisticNPCsDaemonProfile.json</code> profile and can validate it directly with the daemon.
          </li>
          <li>
            API keys are stored outside project files in the platform credential store and authorized for the configured provider origin. The profile contains only secure key references rather than plaintext credentials.
          </li>
          <li>
            The previous <code className="bg-slate-800/50 px-2 py-1 rounded">RealisticNPCsConfig.json</code>, <code className="bg-slate-800/50 px-2 py-1 rounded">LLMConfigFile</code> setting, and Unreal vector-store selector are no longer used.
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          Upgrading an existing project
        </p>
        <ol className="list-decimal space-y-3 text-white ml-6">
          <li>Open the RealisticNPCs Daemon Config panel.</li>
          <li>Configure the required model services and usage targets.</li>
          <li>Store or replace each required API key through the panel.</li>
          <li>Save the daemon profile and use Validate with Daemon before starting PIE.</li>
        </ol>
        <p className="text-white mt-4">
          Legacy configuration files, plaintext keys, and earlier unscoped credential entries are not imported automatically.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">4. Save-Game Continuity and Upgrade Notes</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            New continuity APIs support starting a fresh persistent history, resuming a saved history, running an ephemeral session, and coordinating daemon checkpoints with the game's save flow.
          </li>
          <li>
            The daemon is now the sole persistence authority for evolved NPC identity, memory, relationships, planning state, and behavioral continuity.
          </li>
          <li>
            Persisted memory, evolved identity, and vector data created by the older Unreal-native runtime are not migrated. Projects upgrading from v0.3.0 should begin with a fresh v0.4.0 continuity history.
          </li>
          <li>
            Authored NPC backgrounds, goals, self-assessments, relationships, action sets, perception settings, and spatial knowledge remain part of the Unreal authoring workflow and can be carried forward normally. Calendar settings use the new workflow below.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">5. Calendar Authoring</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            The previous <code className="bg-slate-800/50 px-2 py-1 rounded">DefaultCalendar</code> setting and bundled preset assets have been replaced by configurable Simple and Gregorian calendars in Project Settings.
          </li>
          <li>
            Built-in calendars no longer require a Data Asset. Simple exposes day length, month lengths, and optional month names; Gregorian exposes day length and optional month names while retaining standard Gregorian arithmetic.
          </li>
          <li>
            Advanced projects can still select a project-owned Custom Calendar Asset derived from <code className="bg-slate-800/50 px-2 py-1 rounded">UBaseCalendar</code>.
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          Upgrading an existing project
        </p>
        <p className="text-white">
          Earlier calendar selections are not migrated automatically. Select the new Calendar Source, configure it in Project Settings, and begin a fresh continuity after upgrading. Future changes to calendar source or date structure likewise require fresh continuity, while changes only to day speed or month names do not.
        </p>
      </div>
    </div>
  ),
};

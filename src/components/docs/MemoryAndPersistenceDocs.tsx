import React from 'react';

export default function MemoryAndPersistenceDocs() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">Memory, Continuity, and Persistence</h2>
      <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
        <p>
          The managed runtime records, retrieves, reflects on, and persists the experiences that shape an NPC over time. Authors influence that history through character profiles, relationships, perception, gameplay actions, conversations, and starting spatial knowledge rather than configuring a separate memory backend in Unreal.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">Remembered Experience</h3>
            <p>
              Observations, conversations, behavior outcomes, and other meaningful events can become relevant context for later decisions.
            </p>
          </div>
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">Developing Identity</h3>
            <p>
              Relationships, goals, self-assessment, and subjective spatial knowledge can develop from play while remaining grounded in the authored character.
            </p>
          </div>
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">Continuity</h3>
            <p>
              A continuity identifies the persistent NPC timeline that should be created, resumed, saved, or intentionally kept ephemeral.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Authoring for Useful Memory</h3>
          <p>
            Most projects do not need per-NPC memory setup. Configure the required Embedding target in the RealisticNPCs Daemon Config panel, then provide clear in-world information through the normal authoring surfaces.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 mt-4">
            <li>Write meaningful background, goal, self-assessment, and relationship context.</li>
            <li>Expose changing world state through perceivable facts and one-off stimuli.</li>
            <li>Register concrete actions whose outcomes clearly describe what happened.</li>
            <li>Seed only the places and spatial relationships the NPC should initially know.</li>
            <li>Use stable character and place identities so knowledge remains grounded across sessions.</li>
          </ul>
          <p className="mt-4">
            Retrieval, reflection, relationship maintenance, and evolved identity persistence are handled automatically by the managed runtime. They should not be duplicated in project SaveGame fields.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Automatic Continuity in PIE</h3>
          <p>
            PIE continuity is automatic. The first run for a project and starting persistent map creates a new persistent timeline. Later PIE runs resume the latest saved head for that timeline, so NPC memory and identity can continue across editor sessions.
          </p>
          <p className="mt-4">
            Normal map travel within the same game instance stays on the active continuity. If a test must begin from a clean state, use <code className="bg-white/20 px-2 py-1 rounded">Reset Persistent State on Startup</code> for one startup, then turn it off again before testing persistence.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Starting Continuity in a Packaged Game</h3>
          <p>
            Outside PIE, choose the timeline explicitly near the start of the game. The continuity subsystem and its asynchronous Blueprint nodes provide three author-facing choices:
          </p>
          <div className="space-y-4 mt-4">
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">Create New Continuity</code>
              <p className="mt-2">Starts a new persistent NPC timeline for a new game.</p>
            </div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">Resume Continuity</code>
              <p className="mt-2">Resumes the persistent timeline identified by a saved <code className="bg-white/20 px-2 py-1 rounded">FRNPCContinuityToken</code>.</p>
            </div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">Start Ephemeral Continuity</code>
              <p className="mt-2">Starts a temporary timeline for sessions that should not create a persistent checkpoint.</p>
            </div>
          </div>
          <p className="mt-4">
            Ephemeral continuity cannot be used with the persistent save-checkpoint flow below.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Saving a Persistent Continuity</h3>
          <p>
            Coordinate the NPC checkpoint with the project's own SaveGame operation so both represent the same point in play.
          </p>
          <ol className="list-decimal list-inside space-y-3 mt-4">
            <li>Call <code className="bg-white/20 px-2 py-1 rounded">Prepare Continuity Save</code> while a persistent continuity is active.</li>
            <li>Keep the returned <code className="bg-white/20 px-2 py-1 rounded">FRNPCPreparedContinuitySave</code> in memory until the game save finishes.</li>
            <li>Store <code className="bg-white/20 px-2 py-1 rounded">PreparedSave.Token</code> in the project's SaveGame data.</li>
            <li>Write the project's SaveGame.</li>
            <li>Always call <code className="bg-white/20 px-2 py-1 rounded">Finish Continuity Save</code> with the same in-memory prepared value and the actual success or failure result of the game save.</li>
          </ol>
          <p className="mt-4">
            Finishing the operation releases the save barrier and lets NPC activity continue. Call it promptly on both success and failure. Only the token is needed for a later load; pass that token to <code className="bg-white/20 px-2 py-1 rounded">Resume Continuity</code> when loading the SaveGame.
          </p>
          <p className="mt-4">
            Resuming an older checkpoint may fork the NPC timeline. The operation result reports when that occurs; projects can normally continue using the returned active continuity without managing branch details themselves.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">World Time and Save Coordination</h3>
          <p>
            Persisted world time is restored before the configured initial time. If no saved time exists and <code className="bg-white/20 px-2 py-1 rounded">Auto Apply Initial Time</code> is enabled, the plugin applies the Initial Time from Project Settings.
          </p>
          <p className="mt-4">
            During <code className="bg-white/20 px-2 py-1 rounded">Prepare Continuity Save</code>, the plugin pauses new NPC command intake and briefly allows active work to settle before taking the checkpoint. This coordination is automatic and requires no project setting.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Clean-Slate Development Runs</h3>
          <p>
            <code className="bg-white/20 px-2 py-1 rounded">Reset Persistent State on Startup</code> is a development aid. While enabled, startup clears saved world time, managed-runtime persistence, and automatic PIE continuity handles. It preserves the daemon executable, project configuration, stored provider credentials, and the project's own SaveGame files.
          </p>
          <p className="mt-4">
            Enable it for one clean startup or PIE run, then disable it. Leaving it enabled intentionally starts fresh every time.
          </p>
        </div>

        <div className="bg-amber-500/10 border border-amber-400/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Upgrading from v0.3</h3>
          <p>
            Memory and evolved identity created by the previous Unreal-native runtime are not imported into v0.4 continuity. Begin a fresh continuity after upgrading, while retaining authored NPC profiles, relationships, actions, perception, and spatial setup.
          </p>
        </div>

        <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Authoring Checklist</h3>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>Configure and validate the required Embedding target in the daemon configuration panel.</li>
            <li>Use automatic PIE continuity for normal editor iteration.</li>
            <li>Choose new, resumed, or ephemeral continuity explicitly in packaged games.</li>
            <li>Pair every prepared persistent checkpoint with a matching finish call.</li>
            <li>Store the continuity token with the project's SaveGame and resume it on load.</li>
            <li>Use the reset setting only when a deliberately clean development run is required.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

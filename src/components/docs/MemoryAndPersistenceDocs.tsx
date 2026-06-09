import React from 'react';

export default function MemoryAndPersistenceDocs() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">Memory and Persistence</h2>
      <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
        <p>
          Memory is mostly managed by the plugin. Authors shape what NPCs remember by authoring spatial knowledge, exposing perceivable facts, emitting stimuli, defining action outcomes, and writing character context. The plugin then records, retrieves, and persists relevant episodic and spatial context for behavior and conversation.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">Episodic Memory</h3>
            <p>
              Stores remembered experiences, observations, conversation summaries, intention outcomes, scheduled-event history, and other event-like context.
            </p>
          </div>
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">Spatial Memory</h3>
            <p>
              Stores an NPC's subjective knowledge of places, areas, routes, containment, discovered spaces, and authored starting spatial knowledge.
            </p>
          </div>
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">Persistence</h3>
            <p>
              Local memory, spatial graph state, pending vector writes, and world time can persist across play sessions so repeated tests continue from prior state.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">What Authors Need to Configure</h3>
          <p>
            Most memory behavior works without per-NPC memory setup. The main required configuration is the embedding target used for semantic retrieval.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 mt-4">
            <li>Define <code className="bg-white/20 px-2 py-1 rounded">embed_target</code> in the LLM JSON configuration.</li>
            <li>Leave <code className="bg-white/20 px-2 py-1 rounded">VectorStoreProvider</code> on <code className="bg-white/20 px-2 py-1 rounded">SQLite Local</code> unless the project needs an external vector database.</li>
            <li>Do not add a <code className="bg-white/20 px-2 py-1 rounded">vector_store</code> block for the default SQLite workflow.</li>
            <li>Add Qdrant configuration only after switching the project setting to <code className="bg-white/20 px-2 py-1 rounded">Qdrant (REST)</code>.</li>
            <li>Use <code className="bg-white/20 px-2 py-1 rounded">bResetPersistentStateOnStartup</code> only for clean-slate development runs.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Episodic Memory Behavior</h3>
          <p>
            Episodic memory is the NPC's remembered stream of experiences. The plugin records many memory entries automatically from perception, conversations, behavior outcomes, intention outcomes, and schedule history. When a gameplay event should matter to an NPC later, expose it through stimuli, perceivable facts, action outcomes, or authored character context so the plugin can record it naturally.
          </p>
          <p className="mt-4">
            Write author-facing context and perceptual facts as clear in-world facts, not debug notes. For example, <code className="bg-white/20 px-2 py-1 rounded">Mara saw the forge door left open after sunset.</code> is more useful than <code className="bg-white/20 px-2 py-1 rounded">DoorState changed.</code>
          </p>
          <p className="mt-4">
            When the NPC needs context, the plugin retrieves relevant memories by combining semantic similarity with time-aware memory strength, recency, importance, and confidence. Authors generally do not call retrieval directly; behavior, conversation, planning, and reflection use it as needed.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Spatial Memory Behavior</h3>
          <p>
            Spatial memory is the NPC's subjective knowledge of the world. It starts from authored spatial knowledge presets and packet assignments, then grows from spatial perception, containment, movement completion, discovered places, and heard or inferred location labels.
          </p>
          <p className="mt-4">
            Spatial memory stores both top-level places and spatial areas. This lets behavior reason about where the NPC is, which places it knows, where it can move, and which location references can be safely used as action targets.
          </p>
          <p className="mt-4">
            The spatial graph is persisted per NPC and per world. This means learned location knowledge can survive between play sessions, but it also means stale persisted state can influence later tests after spatial authoring changes. Use a clean-slate reset when validating a new spatial setup from scratch.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Semantic Retrieval</h3>
          <p>
            Semantic retrieval lets NPCs recall relevant memories and locations by meaning instead of only by exact IDs or labels. Both episodic memory and spatial memory use embeddings so relevant remembered events, known places, and location references can be retrieved for the current behavior context.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 mt-4">
            <li>Episodic retrieval supplies relevant remembered experiences for planning, conversation, reflection, and behavior.</li>
            <li>Spatial retrieval supplies relevant <code className="bg-white/20 px-2 py-1 rounded">LocationRef</code> targets for behavior policies and movement.</li>
            <li>The embedding service comes from the required <code className="bg-white/20 px-2 py-1 rounded">embed_target</code> configuration.</li>
            <li>The vector store backend is selected by the <code className="bg-white/20 px-2 py-1 rounded">VectorStoreProvider</code> developer setting.</li>
          </ul>
          <p className="mt-4">
            Keep authored names, action descriptions, perception facts, and event text semantically meaningful. Retrieval quality depends on the text the plugin has available to embed and search.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">SQLite and Qdrant Defaults</h3>
          <p>
            The default backend is local SQLite vector storage. It works out of the box once <code className="bg-white/20 px-2 py-1 rounded">embed_target</code> is configured, and it does not require a running external database.
          </p>
          <div className="space-y-4 mt-4">
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">SQLite Local</code>
              <p className="mt-2">
                The recommended default. The plugin stores vector-backed memory locally under the project's Saved directory. Leave <code className="bg-white/20 px-2 py-1 rounded">vector_store</code> out of the JSON config unless intentionally overriding the local collection prefix.
              </p>
            </div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">Qdrant (REST)</code>
              <p className="mt-2">
                Optional external vector storage. Use this when the project needs a separately hosted vector database. Switch <code className="bg-white/20 px-2 py-1 rounded">VectorStoreProvider</code> to Qdrant, then provide a <code className="bg-white/20 px-2 py-1 rounded">vector_store</code> block with a collection and endpoint or service reference.
              </p>
            </div>
          </div>
          <p className="mt-4">
            If remote vector fields are present while the provider is SQLite, the plugin ignores those remote fields and logs a warning. Startup reset only deletes local persistence; it does not delete remote Qdrant collections.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Persisted Time</h3>
          <p>
            The game time subsystem persists the current world time locally. On startup, it restores saved world time first. If no saved time exists and <code className="bg-white/20 px-2 py-1 rounded">bAutoApplyInitialTime</code> is enabled, it uses the configured initial time from project settings.
          </p>
          <p className="mt-4">
            Persisted time matters because memory timestamps, scheduled events, recency, decay, and time-aware behavior all use the game calendar. Repeated play tests may therefore continue from the previous in-game time instead of restarting from the configured initial time.
          </p>
          <p className="mt-4">
            Use <code className="bg-white/20 px-2 py-1 rounded">RNPCsUtilities::SetGameWorldTime(...)</code> when gameplay needs to set the world time explicitly. Use <code className="bg-white/20 px-2 py-1 rounded">bResetPersistentStateOnStartup</code> when a development test needs to start from a fresh initial time and empty local memory.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Clean-Slate Testing</h3>
          <p>
            Persistent memory is useful for continuity but can make iteration confusing when previous runs influence current behavior. For tests that must start fresh, enable <code className="bg-white/20 px-2 py-1 rounded">bResetPersistentStateOnStartup</code>, start the game once, then disable it before testing persistence again.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 mt-4">
            <li>The reset clears local RealisticNPCs persistence, including saved world time and spatial memory.</li>
            <li>The reset clears local SQLite vector memory when SQLite is the selected backend.</li>
            <li>The reset clears local queued vector writes.</li>
            <li>The reset does not delete remote Qdrant collections.</li>
          </ul>
        </div>

        <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Authoring Checklist</h3>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>Configure <code className="bg-white/20 px-2 py-1 rounded">embed_target</code> before relying on semantic memory retrieval.</li>
            <li>Use the default SQLite backend unless the project specifically needs Qdrant.</li>
            <li>Author meaningful place names, area labels, perception facts, and action descriptions so semantic retrieval has useful text to work with.</li>
            <li>Expose important gameplay events through stimuli, perceivable facts, action outcomes, or authored context rather than debug-only state.</li>
            <li>Expect memory and world time to persist between sessions unless local persistent state is reset.</li>
            <li>Reset local persistent state before tests that must ignore previous NPC experiences or learned locations.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

import React from 'react';
import { Release } from './types';

export const v0_3_0: Release = {
  version: 'v0.3.0',
  date: 'May 2026',
  summary: 'Introduced a BDI-inspired behavior pipeline, spatial authoring workflow, persistent memory, and richer perception',
  highlights: [
    'Replaced the daily-plan architecture with intention-driven behavior and more adaptive short-term decisions',
    'Added semantic spatial authoring for places, areas, discovery cues, and initial NPC spatial knowledge',
    'Expanded memory persistence and recall for events, relationships, commitments, schedules, and places',
    'Improved perception through perceivable facts, event stimuli, public activity state, and spatial discovery',
  ],
  content: (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">1. High-Level Overview</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            The daily-plan behavior architecture has been replaced with a BDI-inspired pipeline built around intentions, short-term behavior choices, grounded actions, and ongoing re-evaluation.
          </li>
          <li>
            The daily-plan model improved long-term coherence, but could make NPCs feel too rigid or schedule-bound. The new system is designed to keep continuity while allowing NPCs to respond more naturally to current context, perception, memory, social opportunities, and action outcomes.
          </li>
          <li>
            This release also introduces a much larger author-facing spatial workflow, more persistent memory, richer perception inputs, and typed action grounding.
          </li>
        </ul>
        <p className="text-white mt-4">
          Users still primarily work through <code className="bg-slate-800/50 px-2 py-1 rounded">BaseNPC</code>, <code className="bg-slate-800/50 px-2 py-1 rounded">BaseNPCController</code>, project settings, and authored assets. The internal behavior, memory, and perception systems are meant to coordinate the NPC's cognition without requiring users to orchestrate every step manually.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">2. New BDI-Based Behavior Architecture</h2>
        <p className="text-white font-semibold mb-3">
          What changed
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            <strong className="text-white">Previous:</strong> NPC behavior centered around daily plans and scheduled task blocks.
          </li>
          <li>
            <strong className="text-white">New:</strong> NPCs use a BDI-inspired flow where they select committed intentions, make adaptive short-term behavior choices, and execute grounded actions.
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>An intention is a meaningful current commitment: a work block, social aim, obligation, safety response, orientation purpose, or ordinary human behavior the NPC is trying to carry through.</li>
              <li>Rolling policies translate the current intention into immediate behavior while still allowing the NPC to adapt as context changes.</li>
              <li>Primitive actions are grounded against the NPC's available actions, known people, current context, and locations the NPC can actually reach.</li>
            </ul>
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          User-facing impact
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>NPCs should feel less locked into a prewritten daily schedule and more responsive to what is happening around them.</li>
          <li>Behavior can recover from failed or blocked actions without forcing users to manually handle every fallback path.</li>
          <li>Users should continue to focus on good NPC profiles, world descriptions, available actions, and authored world context rather than manually building behavior plans.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">3. Spatial Authoring and Location Grounding</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            This version introduces a new semantic spatial authoring workflow for defining the places and areas that NPCs can know about, discover, reason about, and move through.
          </li>
          <li>
            The main author-facing spatial concepts are:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">SemanticPlaceComponent</code> for top-level places.</li>
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">SpatialAreaComponent</code> for areas within or around places.</li>
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">SpatialPlaceDiscoveryComponent</code> for visual discovery cues.</li>
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">SpatialPlaceAnchorActor</code> as a convenience actor for placing authored locations.</li>
            </ul>
          </li>
          <li>
            NPCs can now remember places, understand relationships between places, notice nearby or visible locations, and move only to grounded reachable targets.
          </li>
          <li>
            Movement is now grounded through stable location references instead of relying on freeform location names.
          </li>
          <li>
            Initial spatial knowledge can be authored so different NPCs start with different known places, known area relationships, and usable movement context.
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          User-facing impact
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Projects using the older location workflow should migrate toward semantic places, spatial areas, discovery components, seed presets, and packet libraries.</li>
          <li>Authors can define not just where a location exists, but how NPCs discover it, what it contains, how it relates to other locations, and which NPCs initially know about it.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">4. Memory, Persistence, and Retrieval</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            NPC memory has been expanded so characters can persist and recall events, relationships, commitments, schedules, and places.
          </li>
          <li>
            Episodic memory and spatial memory can now persist across play sessions, allowing NPCs to retain both remembered experiences and learned location knowledge.
          </li>
          <li>
            Semantic retrieval is supported for both episodic and spatial memory, so relevant remembered events, known places, and spatial context can be recalled for behavior, conversation, planning, and reflection.
          </li>
          <li>
            The plugin includes local SQLite-backed vector storage out of the box, with Qdrant-backed vector storage available for projects that want an external vector database.
          </li>
          <li>
            Plugin-owned persistence also includes saved in-game time, allowing repeated play sessions to maintain time continuity for memory, schedules, and behavior.
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          User-facing impact
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Authors can expect NPC behavior to make more use of remembered events, relationships, known places, and prior spatial discoveries.</li>
          <li>Authors can use persistent, semantic memory retrieval with the default local SQLite backend without standing up an external vector database.</li>
          <li>For testing, authors should be aware that local persisted memory and saved in-game time can affect repeated runs unless persistent state is reset.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">5. Improved Perception System</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            The perception model now exposes richer observable game state to NPCs.
          </li>
          <li>
            Actors can expose perceivable facts through:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Reflected properties marked as perceivable.</li>
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">PerceivableFactsComponent</code> staged facts.</li>
              <li>Explicit emitted stimuli for events such as hearing or damage.</li>
            </ul>
          </li>
          <li>
            Reflected properties are best for continuously available actor state that already lives on the actor, while staged facts are best for explicit current facts that need to be set or cleared at runtime.
          </li>
          <li>
            One-off perception moments, such as sounds, damage events, or custom momentary signals, should be emitted as stimuli rather than staged as ongoing facts.
          </li>
          <li>
            NPCs can also perceive spatial discovery cues from semantic places and spatial areas, allowing them to learn about locations from what they can currently see.
          </li>
          <li>
            NPC activity can be published as public-facing perceivable facts, so other NPCs can observe what a character appears to be doing.
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          User-facing impact
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Authors have more control over what NPCs can observe without needing to hard-code every observation into behavior logic.</li>
          <li>Perception now contributes more readily and richly to behavior, memory, social opportunities, and spatial discovery.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">6. NPC Action Registration and Built-In Primitive Actions</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Action registration now supports typed parameters and stronger validation before the behavior system is allowed to invoke an action.
          </li>
          <li>
            Supported action parameter types include strings, booleans, integers, floats, named choices, character references, and location references.
          </li>
          <li>
            The plugin checks action names, required parameters, parameter types, choices, numeric bounds, valid character references, resolvable location references, and routeable targets for plugin-owned movement before invoking an action.
          </li>
          <li>
            The plugin includes plugin-owned primitive actions such as:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">move_to_location</code></li>
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">talk_to_nearby</code></li>
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">seek_conversation_at_location</code></li>
            </ul>
          </li>
          <li>
            Authors are no longer expected to register a generic custom movement action just so NPCs can travel between authored locations. Movement decisions are handled by the plugin through grounded spatial targets, the built-in <code className="bg-slate-800/50 px-2 py-1 rounded">move_to_location</code> primitive, and controller movement helpers for location, character, and actor targets.
          </li>
          <li>
            Custom movement-related behavior should be added through the movement lifecycle API and controller hooks rather than by replacing the core movement primitive.
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          User-facing impact
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Custom actions should be registered with clear descriptions and typed parameter metadata so the behavior system can use them safely.</li>
          <li>Authors should not register or disable plugin-owned primitive actions manually.</li>
          <li>Custom action libraries can focus on meaningful gameplay behavior instead of carrying the burden of generic NPC travel.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">7. Editor Authoring Improvements</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Editor support has been added for the new authoring workflow so users can create and validate plugin content directly in Unreal Editor.
          </li>
          <li>
            New asset authoring support includes:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Spatial Knowledge Packet assets.</li>
              <li>Spatial Knowledge Seed Preset assets.</li>
              <li>NPC Action Set assets.</li>
            </ul>
          </li>
          <li>
            Spatial Knowledge Packet assets and Spatial Knowledge Seed Preset assets provide an editor-facing workflow for preloading NPC spatial knowledge, including known places, area templates, place relations, packet assignments, and per-NPC starting context.
          </li>
          <li>
            NPC Action Set assets can be used to author groups of enabled actions and assign them through NPC configuration.
          </li>
          <li>
            New Details panel customizations summarize authored spatial knowledge, action sets, packet assignments, discovery source bindings, and validation issues.
          </li>
          <li>
            Validation flows help catch common authoring mistakes such as empty references, duplicate or ambiguous place ids, invalid packet grounding, unsupported action ids, and discovery components that cannot bind cleanly to a semantic place.
          </li>
          <li>
            The editor module adds placement support for RealisticNPCs actors and visualizers for semantic place containment and spatial area bounds.
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          User-facing impact
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Authors can build spatial knowledge and NPC action configuration through assets instead of encoding everything directly in code.</li>
          <li>Validation summaries should make invalid or ambiguous authored references easier to catch before runtime.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">8. Configuration and Developer Settings</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            LLM configuration now includes both chat/completion targets and embedding configuration for memory retrieval.
          </li>
          <li>
            An <code className="bg-slate-800/50 px-2 py-1 rounded">embed_target</code> is required because semantic memory retrieval uses embeddings.
          </li>
          <li>
            The configuration uses newer role-specific target names for planning, behavior generation, conversation replies, memory reflection, and short-horizon reasoning. Examples include:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">agenda_generation_target</code></li>
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">behavior_compile_target</code></li>
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">conversation_reply_target</code></li>
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">memory_reflection_target</code></li>
              <li><code className="bg-slate-800/50 px-2 py-1 rounded">short_horizon_reasoning_target</code></li>
            </ul>
          </li>
          <li>
            Vector store backend configuration is optional for the default workflow. The plugin uses local SQLite storage out of the box, and projects only need to configure Qdrant when they want an external vector database.
          </li>
          <li>
            Developer settings now expose plugin-level controls for persistence and vector storage, including the vector store provider and a reset-on-startup option for clean test runs.
          </li>
          <li>
            The <code className="bg-slate-800/50 px-2 py-1 rounded">bResetPersistentStateOnStartup</code> setting clears local RealisticNPCs persisted state at startup, including saved world time, local SQLite vector memory, spatial memory, and queued local vector writes.
          </li>
          <li>
            When saved world time exists, play tests can resume from that persisted time instead of always starting from the configured initial time.
          </li>
          <li>
            Persistent state reset is local-only. Remote Qdrant collections are not deleted by this setting.
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          User-facing impact
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Projects upgrading from the previous release should review their <code className="bg-slate-800/50 px-2 py-1 rounded">RealisticNPCsConfig.json</code> file.</li>
          <li>Older optional target names should be replaced with the current role-specific target names.</li>
          <li>Projects should define an <code className="bg-slate-800/50 px-2 py-1 rounded">embed_target</code>, but can leave vector storage on the default SQLite backend unless they want to use Qdrant.</li>
          <li>Authors can enable startup reset while iterating on tests that need clean memory or a fresh initial time, but should leave it disabled when validating persistence behavior.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">9. Migration Notes</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Review NPC behavior expectations. NPCs are no longer driven primarily by a rigid daily-plan pipeline, so behavior may react more dynamically to perception, memory, and current intent.
          </li>
          <li>
            Migrate location authoring to the new semantic spatial workflow:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Create semantic places and spatial areas for important locations.</li>
              <li>Add discovery components where NPCs should visually discover places.</li>
              <li>Use seed presets and packet assignments for locations an NPC should know at the start of play.</li>
            </ul>
          </li>
          <li>
            Review custom action registration and action set assets to make sure actions expose typed parameters and do not conflict with plugin-owned primitive actions.
          </li>
          <li>
            Remove generic custom movement actions that only existed to move NPCs between known places. Use the plugin's grounded movement path and movement lifecycle hooks for movement-related customization.
          </li>
          <li>
            Update LLM and memory configuration to include an <code className="bg-slate-800/50 px-2 py-1 rounded">embed_target</code>. Add vector-store settings only when using Qdrant or intentionally overriding the local SQLite collection prefix.
          </li>
          <li>
            Decide how persistent memory should behave during development and testing. If previous persisted state should not influence a test run, reset local persistent state before testing.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">10. Miscellaneous Changes</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Behavior logging is now oriented around the new behavior pipeline rather than the old daily-plan/task breakdown.
          </li>
          <li>
            Additional validation has been added around spatial authoring, action registration, action set configuration, and packet grounding.
          </li>
          <li>
            The plugin includes more durable local state handling for memory, spatial knowledge, and world time.
          </li>
          <li>
            The documentation should treat the older location and behavior guidance as outdated and replace it with guidance for the new authoring model.
          </li>
        </ul>
      </div>
    </div>
  ),
};

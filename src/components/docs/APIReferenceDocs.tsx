import React from 'react';

const codeClassName = 'bg-white/20 px-2 py-1 rounded';
const entryClassName = 'border-l-4 border-blue-500/50 pl-6';

function ApiEntry({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className={entryClassName}>
      <code className={codeClassName}>{name}</code>
      <div className="mt-2 space-y-2">
        {children}
      </div>
    </div>
  );
}

function ApiSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mt-8 mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

export default function APIReferenceDocs() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">API Reference</h2>
      <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
        <p>
          This is a compact lookup for the author-facing classes, assets, components, and structs used by the workflow sections above. It is not intended to document every internal runtime type.
        </p>

        <ApiSection title="Core Characters">
          <ApiEntry name="ABaseCharacter">
            <p>
              Required base class for character actors the plugin should identify, perceive as characters, remember, reference in relationships, or include in conversations. Use it for player characters, companions, scripted characters, and other participating character actors.
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Key fields and functions: <code className={codeClassName}>CharacterName</code>, <code className={codeClassName}>GetOrCreateCharacterGuid()</code>, <code className={codeClassName}>SetCharacterGuid()</code>, <code className={codeClassName}>GetPerceivableFactsComponent()</code>, <code className={codeClassName}>StartDirectedConversationWith()</code>.</li>
              <li>Use <code className={codeClassName}>GetOrCreateCharacterGuid()</code> for stable character identity. <code className={codeClassName}>SetCharacterGuid()</code> is intended for save-restore workflows.</li>
              <li>Conversation reactions: <code className={codeClassName}>bIsInConversation</code>, <code className={codeClassName}>OnConversationEntered</code>, <code className={codeClassName}>OnConversationEnded</code>.</li>
            </ul>
          </ApiEntry>

          <ApiEntry name="FConversationView">
            <p>
              Blueprint-facing conversation snapshot sent through conversation lifecycle events. Use it to inspect the episode id, mode, primary target, participants, and current speaker.
            </p>
            <p>
              The documented authoring path is currently directed conversation. Do not assume broader or open-audience modes are the primary supported authoring workflow unless they are documented separately.
            </p>
          </ApiEntry>

          <ApiEntry name="ABaseNPC">
            <p>
              Autonomous NPC actor class. Authors configure identity, behavior flags, relationships, starting spatial knowledge, spatial perception settings, and action access here.
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Identity fields: <code className={codeClassName}>Background</code>, <code className={codeClassName}>ShortTermGoal</code>, <code className={codeClassName}>SelfAssessment</code>, <code className={codeClassName}>Relationships</code>, <code className={codeClassName}>IdentityDevelopmentPolicy</code>.</li>
              <li>Spatial/action authoring fields: <code className={codeClassName}>InitialKnowledgePresets</code>, <code className={codeClassName}>InitialPlaceOverrides</code>, <code className={codeClassName}>InitialPacketAssignmentOverrides</code>, <code className={codeClassName}>ActionSetPresets</code>, <code className={codeClassName}>AddedActionIds</code>, <code className={codeClassName}>RemovedActionIds</code>.</li>
              <li>Validation helpers: <code className={codeClassName}>ValidateInitialPacketAssignments()</code> and <code className={codeClassName}>ValidateEnabledActions()</code>.</li>
            </ul>
          </ApiEntry>

          <ApiEntry name="ABaseNPCController">
            <p>
              AI controller base for NPC behavior startup, action registration, action execution, plugin-owned movement, conversation routing, and movement lifecycle events.
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Override <code className={codeClassName}>RegisterNPCActions()</code> to register custom gameplay actions.</li>
              <li>Call the protected <code className={codeClassName}>StartNPC()</code> helper from your controller subclass when the possessed NPC is ready to run autonomous behavior.</li>
              <li>Use <code className={codeClassName}>MoveToLocation()</code> and <code className={codeClassName}>MoveToCharacter()</code> from custom gameplay code when movement should use plugin-resolved targets. <code className={codeClassName}>MoveToCharacter()</code> expects a valid current character reference; it is not a policy-level shortcut for finding arbitrary characters.</li>
              <li>React to movement through <code className={codeClassName}>OnNPCMoveLifecycleEvent</code>.</li>
            </ul>
          </ApiEntry>
        </ApiSection>

        <ApiSection title="Actions and Movement">
          <ApiEntry name="FNPCActionRegistrar">
            <p>
              Registration helper passed to <code className={codeClassName}>ABaseNPCController::RegisterNPCActions()</code>. Use <code className={codeClassName}>RegisterAction()</code>, <code className={codeClassName}>RegisterInstantAction()</code>, or <code className={codeClassName}>RegisterDurationAction()</code> depending on the action lifecycle.
            </p>
          </ApiEntry>

          <ApiEntry name="FNPCActionSpec">
            <p>
              Author-facing action definition. <code className={codeClassName}>ActionId</code> is the stable id, <code className={codeClassName}>ActionDescription</code> is prompt-facing, <code className={codeClassName}>Parameters</code> defines typed inputs, and <code className={codeClassName}>Lifecycle</code> controls completion semantics.
            </p>
          </ApiEntry>

          <ApiEntry name="ENPCActionLifecycle">
            <p>
              Action completion mode. <code className={codeClassName}>UntilComplete</code> actions complete when gameplay signals completion, while <code className={codeClassName}>Duration</code> actions represent lived activity time and are completed by the plugin timing system.
            </p>
          </ApiEntry>

          <ApiEntry name="FNPCActionParamSpec">
            <p>
              Parameter definition for an action. Use clear <code className={codeClassName}>Name</code> and <code className={codeClassName}>Description</code> values, choose the correct <code className={codeClassName}>Type</code>, set requiredness, and provide numeric bounds or allowed choices when applicable.
            </p>
          </ApiEntry>

          <ApiEntry name="FNPCActionInvocation">
            <p>
              Runtime action call data. Typed registration usually extracts parameters for you; use this directly only when an action needs manual parameter lookup or access to the current controller.
            </p>
          </ApiEntry>

          <ApiEntry name="ENPCActionParamType">
            <p>
              Supported action parameter kinds: <code className={codeClassName}>String</code>, <code className={codeClassName}>Bool</code>, <code className={codeClassName}>Int32</code>, <code className={codeClassName}>Float</code>, <code className={codeClassName}>Choice</code>, <code className={codeClassName}>CharacterRef</code>, and <code className={codeClassName}>LocationRef</code>.
            </p>
          </ApiEntry>

          <ApiEntry name="UNPCActionSetAsset">
            <p>
              Reusable data asset containing action ids enabled for an NPC role. Assign these through <code className={codeClassName}>ABaseNPC::ActionSetPresets</code>, then use per-NPC additions or removals for exceptions.
            </p>
          </ApiEntry>

          <ApiEntry name="FCharacterRef">
            <p>
              Identity-backed character reference used by action parameters. The stable id is canonical; the actor pointer is optional and only valid when the character is spawned and loaded.
            </p>
          </ApiEntry>

          <ApiEntry name="FLocationRef">
            <p>
              Identity-backed location reference used by behavior and movement. A valid reference may still be ungrounded; movement requires a grounded objective target.
            </p>
          </ApiEntry>

          <ApiEntry name="FNPCMoveLifecycleEvent">
            <p>
              Blueprint-facing movement lifecycle payload emitted through <code className={codeClassName}>OnNPCMoveLifecycleEvent</code>. Use it for animation, UI, VFX, or gameplay reactions to plugin-controlled movement.
            </p>
          </ApiEntry>
        </ApiSection>

        <ApiSection title="Spatial Authoring">
          <ApiEntry name="ASpatialPlaceAnchorActor">
            <p>
              Placeable actor for one top-level place identity plus an optional discovery region. Use it for fuzzy exterior places such as villages, roads, districts, plazas, courtyards, or fields.
            </p>
          </ApiEntry>

          <ApiEntry name="USemanticPlaceComponent">
            <p>
              Component that defines a top-level place identity on an actor. Use one per actor when a building, room cluster, object, or other actor should be known as a place.
            </p>
          </ApiEntry>

          <ApiEntry name="USpatialAreaComponent">
            <p>
              Component for a grounded sub-area inside or around a place. It provides packet grounding, movement targets, runtime containment, and optional live perception for specific areas.
            </p>
          </ApiEntry>

          <ApiEntry name="USpatialPlaceDiscoveryComponent">
            <p>
              Perception geometry that lets NPCs discover a top-level place from sight. For place anchors, prefer editing the anchor actor's region fields instead of editing the internal discovery component directly.
            </p>
          </ApiEntry>

          <ApiEntry name="USpatialKnowledgePacketAsset">
            <p>
              Reusable data asset that describes spatial knowledge packets. Packets define area templates and relations that can be seeded into an NPC's spatial memory for specific target places.
            </p>
          </ApiEntry>

          <ApiEntry name="FSpatialKnowledgePacketAuthoringDef">
            <p>
              Main editable packet definition stored inside a packet asset. It contains the packet id, display text, area templates, and authored relations between those templates.
            </p>
          </ApiEntry>

          <ApiEntry name="USpatialKnowledgeSeedPresetAsset">
            <p>
              Reusable data asset for starting spatial knowledge. Use presets for shared roles, then use per-NPC overrides only for exceptions.
            </p>
          </ApiEntry>

          <ApiEntry name="FSpatialKnowledgeSeedAuthoringProfile">
            <p>
              Main editable profile stored inside a seed preset asset. It combines starting places, top-level place relations, and packet assignments.
            </p>
          </ApiEntry>

          <ApiEntry name="ASpatialKnowledgePacketLibraryActor">
            <p>
              Placeable world actor that registers packet assets for the current world. Packet assignments can only seed packets that are available through the world library.
            </p>
          </ApiEntry>

          <ApiEntry name="FSpatialKnowledgePacketAssignmentAuthoring">
            <p>
              Authoring entry used by seed presets and per-NPC overrides to assign a packet id to explicit target places.
            </p>
          </ApiEntry>

          <ApiEntry name="FSpatialAuthoredPlaceReference">
            <p>
              Author-facing reference to an authored place in the current world. Use this when assigning starting place knowledge through presets or per-NPC overrides.
            </p>
          </ApiEntry>

          <ApiEntry name="FSpatialPerceptionAuthoringSettings">
            <p>
              Per-NPC settings for authored spatial perception sampling. Configure this on <code className={codeClassName}>ABaseNPC</code> when an NPC needs custom spatial perception behavior.
            </p>
          </ApiEntry>
        </ApiSection>

        <ApiSection title="Perception">
          <ApiEntry name="UPerceivableFactsComponent">
            <p>
              Component for staged state facts about an actor. Use <code className={codeClassName}>SetFact()</code>, <code className={codeClassName}>RemoveFact()</code>, and <code className={codeClassName}>ClearFacts()</code> for current facts that are true until changed.
            </p>
          </ApiEntry>

          <ApiEntry name="FPerceivableStagedFact">
            <p>
              Blueprint-friendly value container for staged facts. Includes the value type, typed value fields, importance, confidence, and observable-by mask.
            </p>
          </ApiEntry>

          <ApiEntry name="UPerceivableIdComponent">
            <p>
              Stable identity component for non-character actors such as doors, props, and interactables. Character actors that participate in the plugin should derive from <code className={codeClassName}>ABaseCharacter</code> instead.
            </p>
          </ApiEntry>

          <ApiEntry name="UNPCStimulusSubsystem">
            <p>
              World subsystem for emitting one-off perception events. Use <code className={codeClassName}>EmitStimulus()</code> for discrete events such as sounds, impacts, shouts, or damage.
            </p>
          </ApiEntry>

          <ApiEntry name="FRNPCStimulusEmitSpec">
            <p>
              Blueprint-friendly event emission spec. It defines the stimulus channel, event key/value, source or location, range, strength, TTL, and optional directed target.
            </p>
          </ApiEntry>

          <ApiEntry name="Reflected Property Metadata">
            <p>
              Use metadata such as <code className={codeClassName}>RNPC_Perceivable</code>, <code className={codeClassName}>RNPC_Key</code>, <code className={codeClassName}>RNPC_Importance</code>, <code className={codeClassName}>RNPC_Confidence</code>, and <code className={codeClassName}>RNPC_ObservableBy</code> to expose continuous reflected state directly from actor properties.
            </p>
          </ApiEntry>
        </ApiSection>

        <ApiSection title="Memory, Time, and Configuration">
          <ApiEntry name="URNPCsDeveloperSettings">
            <p>
              Project settings for plugin-wide configuration. Author-facing settings include calendar selection, initial time, persistence reset, LLM config file, world description, and vector store provider.
            </p>
          </ApiEntry>

          <ApiEntry name="EVectorStoreProvider">
            <p>
              Selects the memory vector backend. Use <code className={codeClassName}>SQLiteVec_Local</code> by default, or <code className={codeClassName}>Qdrant_REST</code> when the project intentionally uses an external Qdrant service.
            </p>
          </ApiEntry>

          <ApiEntry name="FInitialGameTime">
            <p>
              Project-settings value for the initial in-game date and time. It is used when no persisted world time exists or when persistent state is reset for a clean development run.
            </p>
          </ApiEntry>

          <ApiEntry name="UBaseCalendar">
            <p>
              Calendar data asset base class. Use the built-in simple or Gregorian calendar assets, or subclass this when the project needs a custom calendar and time conversion model.
            </p>
          </ApiEntry>

          <ApiEntry name="FGameDateTime">
            <p>
              In-game date/time value used by calendars, initial time, persisted world time, schedules, and memory timestamps.
            </p>
          </ApiEntry>

          <ApiEntry name="UGameTimeSubsystem">
            <p>
              World subsystem that tracks current in-game time using the configured calendar. Most projects configure it through settings and only read or set time from gameplay when needed.
            </p>
          </ApiEntry>

          <ApiEntry name="RNPCsUtilities">
            <p>
              Utility class for world description loading, character lookup by GUID, game time updates, and lower-level LLM transport helpers. Most authoring workflows only need <code className={codeClassName}>SetGameWorldTime()</code> for explicit gameplay time changes.
            </p>
          </ApiEntry>
        </ApiSection>
      </div>
    </>
  );
}

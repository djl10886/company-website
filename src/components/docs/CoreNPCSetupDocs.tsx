import React from 'react';

export default function CoreNPCSetupDocs() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">Core NPC Setup</h2>
      <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
        <p>
          This section covers the core setup required for an authored character to participate in the RealisticNPCs system. It focuses on the classes and properties authors need to configure before moving on to spatial authoring, perception, memory, actions, or conversation-specific behavior.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">BaseCharacter</h3>
            <p>
              Any character actor intended to participate in the plugin should derive from <code className="bg-white/20 px-2 py-1 rounded">ABaseCharacter</code>, including characters that should be perceived, remembered, referenced by relationships, or included in conversations.
            </p>
          </div>
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">BaseNPC</h3>
            <p>
              Use <code className="bg-white/20 px-2 py-1 rounded">ABaseNPC</code> for autonomous NPCs. This is where authors configure the NPC's identity, starting knowledge, action access, and behavior flags.
            </p>
          </div>
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">BaseNPCController</h3>
            <p>
              Use an <code className="bg-white/20 px-2 py-1 rounded">ABaseNPCController</code> subclass as the NPC's AI controller. This is where gameplay action implementations and movement lifecycle hooks belong.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Recommended Setup Flow</h3>
          <ol className="list-decimal list-inside space-y-3">
            <li>Create or update character classes that should participate in the plugin to derive from <code className="bg-white/20 px-2 py-1 rounded">ABaseCharacter</code>.</li>
            <li>Create your NPC class from <code className="bg-white/20 px-2 py-1 rounded">ABaseNPC</code>, either in C++ or Blueprint.</li>
            <li>Create an AI controller class from <code className="bg-white/20 px-2 py-1 rounded">ABaseNPCController</code> and assign it as the NPC's AI controller class.</li>
            <li>Fill the NPC's core profile fields, including background, short-term goal, self-assessment, and authored relationships.</li>
            <li>Assign starting spatial knowledge and action sets only as needed for the NPC's role.</li>
            <li>Run the available validation actions in the editor before testing behavior.</li>
            <li>Possess the enabled NPC with its assigned controller. Registration and autonomous behavior startup happen automatically.</li>
          </ol>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">BaseCharacter Setup</h3>
          <p>
            <code className="bg-white/20 px-2 py-1 rounded">ABaseCharacter</code> is the shared base class for character actors the plugin can identify and interact with. Player characters, companion characters, scripted characters, and other non-autonomous character actors should derive from this base when NPCs need to perceive them, converse with them, remember them, or store relationship information about them.
          </p>
          <div className="space-y-4 mt-4">
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">CharacterName</code>
              <p className="mt-2">
                The authored display name used by the NPC system when referring to the character. Use clear, stable names for characters that NPCs will talk about or remember.
              </p>
            </div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">GetPerceivableFactsComponent()</code>
              <p className="mt-2">
                Returns the character's perceivable facts component. Use this when gameplay code needs to expose character state that nearby NPCs should perceive.
              </p>
            </div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">StartDirectedConversationWith()</code>
              <p className="mt-2">
                Starts a directed conversation from this character to another <code className="bg-white/20 px-2 py-1 rounded">ABaseCharacter</code>. Use the conversation lifecycle delegates for UI, animation, or gameplay reactions when a character enters or leaves a conversation.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Conversation Setup</h3>
          <p>
            Conversations are built around <code className="bg-white/20 px-2 py-1 rounded">ABaseCharacter</code> participants. NPCs already inherit this through <code className="bg-white/20 px-2 py-1 rounded">ABaseNPC</code>; any other character actor that needs to participate in plugin conversations should also derive from <code className="bg-white/20 px-2 py-1 rounded">ABaseCharacter</code>.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 mt-3">
            <li>Use stable <code className="bg-white/20 px-2 py-1 rounded">CharacterName</code> values so conversations, memory, and relationship context can refer to characters clearly.</li>
            <li>Use <code className="bg-white/20 px-2 py-1 rounded">Relationships</code> on <code className="bg-white/20 px-2 py-1 rounded">ABaseNPC</code> to seed authored relationship context before runtime experience develops.</li>
            <li>Call <code className="bg-white/20 px-2 py-1 rounded">StartDirectedConversationWith(Target)</code> on the initiating character, or use <code className="bg-white/20 px-2 py-1 rounded">StartDirectedConversation(Target)</code> when working directly with an <code className="bg-white/20 px-2 py-1 rounded">ABaseNPC</code> or its controller.</li>
            <li>When gameplay needs to forcibly end an active conversation, route that through the involved <code className="bg-white/20 px-2 py-1 rounded">ABaseNPC</code>, <code className="bg-white/20 px-2 py-1 rounded">ABaseNPCController</code>, or a project-level conversation coordinator.</li>
            <li>Use <code className="bg-white/20 px-2 py-1 rounded">bIsInConversation</code>, <code className="bg-white/20 px-2 py-1 rounded">OnConversationEntered</code>, and <code className="bg-white/20 px-2 py-1 rounded">OnConversationEnded</code> for UI, animation, camera, quest, or interaction-state reactions.</li>
          </ul>
          <p className="mt-3">
            Ordinary NPC behavior pauses and resumes around active conversations automatically. Authors usually only need to start conversations from gameplay code and react to the conversation lifecycle; custom inbound message handling through <code className="bg-white/20 px-2 py-1 rounded">ReceiveConversationMessage()</code> is mainly for custom player or scripted character subclasses.
          </p>
          <p className="mt-3">
            The plugin manages conversation lifecycle cleanup for NPCs, but each project decides its own forced-end conditions, such as player cancel, distance, combat, cutscenes, or quest state.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">BaseNPC Setup</h3>
          <p>
            <code className="bg-white/20 px-2 py-1 rounded">ABaseNPC</code> contains the main author-facing configuration for an autonomous NPC. Treat these fields as the NPC's starting authored state; they are synchronized with the managed runtime, which develops the NPC's behavior and persistent knowledge as play continues.
          </p>

          <div className="space-y-6 mt-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-3">Behavior Controls</h4>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><code className="bg-white/20 px-2 py-1 rounded">bNPCEnabled</code> controls whether the NPC registers for autonomous behavior and plugin-routed conversation handling.</li>
                <li><code className="bg-white/20 px-2 py-1 rounded">bLogBehavior</code> enables concise behavior logging for debugging intention changes, policy steps, actions, conversations, and stalls.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-3">Core Profile</h4>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><code className="bg-white/20 px-2 py-1 rounded">Background</code> describes the NPC's stable authored origin, personality, role, and other long-term identity context.</li>
                <li><code className="bg-white/20 px-2 py-1 rounded">ShortTermGoal</code> describes what the NPC is currently trying to pursue or prioritize.</li>
                <li><code className="bg-white/20 px-2 py-1 rounded">SelfAssessment</code> describes the NPC's current view of their own situation.</li>
                <li><code className="bg-white/20 px-2 py-1 rounded">Relationships</code> seeds authored relationship context toward specific <code className="bg-white/20 px-2 py-1 rounded">ABaseCharacter</code> instances.</li>
                <li><code className="bg-white/20 px-2 py-1 rounded">IdentityDevelopmentPolicy</code> controls whether and how the NPC's live goal and self-assessment can evolve from experience. The authored background remains origin text.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-3">Starting Spatial Knowledge</h4>
              <p>
                Starting spatial knowledge tells the NPC which authored places and spatial packets it should already know at the start of play. Use shared preset assets for common roles, then use NPC-specific overrides only for exceptions.
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2 mt-3">
                <li><code className="bg-white/20 px-2 py-1 rounded">InitialKnowledgePresets</code> applies reusable starting spatial knowledge presets.</li>
                <li><code className="bg-white/20 px-2 py-1 rounded">InitialPlaceOverrides</code> adds specific starting places for this NPC.</li>
                <li><code className="bg-white/20 px-2 py-1 rounded">InitialPacketAssignmentOverrides</code> adds one-off spatial packet assignments for this NPC.</li>
              </ul>
              <p className="mt-3">
                Detailed place, packet, and anchor authoring should live in the spatial authoring section rather than in core setup.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-3">Action Access</h4>
              <p>
                Action authoring controls which controller-supported actions an NPC is allowed to use. Prefer reusable action-set assets for shared roles, then use additions or removals for individual NPC exceptions.
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2 mt-3">
                <li><code className="bg-white/20 px-2 py-1 rounded">ActionSetPresets</code> assigns reusable sets of enabled action IDs.</li>
                <li><code className="bg-white/20 px-2 py-1 rounded">AddedActionIds</code> enables extra actions for this NPC.</li>
                <li><code className="bg-white/20 px-2 py-1 rounded">RemovedActionIds</code> removes actions granted by shared presets.</li>
              </ul>
              <p className="mt-3">
                Authors should not create a generic custom movement primitive for normal NPC travel. The plugin owns grounded movement through its built-in movement actions; use movement lifecycle hooks or movement-related APIs when custom gameplay needs to react to movement.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">BaseNPCController Setup</h3>
          <p>
            <code className="bg-white/20 px-2 py-1 rounded">ABaseNPCController</code> is the Unreal execution bridge for action registration, gameplay execution, movement coordination, and conversation mechanics. Most projects should create a controller subclass for each family of NPCs that needs different gameplay actions. Possessing an enabled <code className="bg-white/20 px-2 py-1 rounded">ABaseNPC</code> registers it automatically.
          </p>
          <div className="space-y-4 mt-4">
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">RegisterNPCActions(FNPCActionRegistrar&amp; Registrar)</code>
              <p className="mt-2">
                Override this function to register custom gameplay actions that the managed runtime may command. Action descriptions and parameter descriptions should describe the concrete gameplay effect in author-facing terms.
              </p>
            </div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">OnNPCMoveLifecycleEvent</code>
              <p className="mt-2">
                Override this Blueprint-native event when animations, UI, or gameplay logic need to react to plugin-controlled movement starting, progressing, completing, failing, or being canceled.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Editor Validation</h3>
          <p>
            After assigning spatial knowledge and action access, use the built-in validation actions on the NPC to catch setup issues before runtime.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 mt-3">
            <li><code className="bg-white/20 px-2 py-1 rounded">ValidateInitialPacketAssignments</code> checks compiled starting spatial knowledge for missing packets or ineffective packet targets.</li>
            <li><code className="bg-white/20 px-2 py-1 rounded">ValidateEnabledActions</code> checks the NPC's compiled action IDs against the assigned controller class.</li>
          </ul>
        </div>

        <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-3">What to Configure Elsewhere</h3>
          <p>
            Keep this core setup focused on class wiring and NPC identity. Use the later authoring guide sections for detailed spatial place setup, perception facts and stimuli, memory persistence, action registration patterns, conversation flows, and plugin-wide configuration.
          </p>
        </div>
      </div>
    </>
  );
}

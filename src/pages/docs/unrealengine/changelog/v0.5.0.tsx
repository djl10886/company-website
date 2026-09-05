import type { Release } from './types';

export const v0_5_0: Release = {
  version: 'v0.5.0',
  date: 'TBD',
  summary: 'Added object perception and subjective knowledge of people and objects, with richer memory, conversation, spatial reasoning, and behavior continuity.',
  highlights: [
    'Added a Perceivable Object authoring workflow with geometry-aware visibility and occlusion',
    'NPCs maintain individual knowledge of people and objects, with selective attention shaped by their current situation',
    'Improved remembered knowledge and conversation context for known people and objects',
    'Improved use of known rooms, activity context, and completed progress when choosing and continuing behavior',
  ],
  content: (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">1. High-Level Overview</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            NPCs can perceive authored objects, retain useful knowledge about them, and use that knowledge in behavior and conversation alongside what they know about other characters.
          </li>
          <li>
            These improvements extend the existing intention-driven behavior system. Authors continue to define their characters, world knowledge, and gameplay actions without managing a separate cognition workflow.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">2. Object Perception and Authoring</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Add <code className="bg-slate-800/50 px-2 py-1 rounded">Perceivable Object</code> to an ordinary noncharacter actor and supply its observable label, description, and traits. Existing perceivable facts can expose changing state without revealing hidden information through the object's description.
          </li>
          <li>
            Object Vision automatically selects eligible geometry from the actor's components. An optional <code className="bg-slate-800/50 px-2 py-1 rounded">Perceptual Geometry Components</code> selection supports objects that need a more specific set of components considered for visibility.
          </li>
          <li>
            Visibility checks consider object geometry and occlusion rather than just the actor's origin. A visible portion of a large or partly obscured object can provide evidence even when its center is hidden or outside the viewing area.
          </li>
        </ul>
        <p className="text-white mt-4">
          Object Vision uses bounded collision-based sampling, not general image recognition or pixel-perfect visibility. Objects need suitable query collision, and very small exposed portions may fall between samples.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">3. NPC-Specific Knowledge and Object-Aware Behavior</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Each NPC maintains its own current, recent, and remembered knowledge. An object being loaded in the world does not make every NPC aware of it, and losing sight does not necessarily erase useful knowledge.
          </li>
          <li>
            Attention draws on personality, goals, relationships, relevant memories, and meaningful changes. Known objects can motivate an intention, a search, or a question without every visible prop repeatedly demanding a response.
          </li>
          <li>
            Registered actions distinguish object, character, and general entity targets. Remembering a target does not make it available for immediate interaction; Unreal still validates the live target and gameplay conditions before execution.
          </li>
        </ul>
        <p className="text-white mt-4">
          Authors continue to provide gameplay actions and their rules. Making a door, tool, or container perceivable does not automatically implement opening, using, inspecting, or inventory behavior.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">4. Memory and Conversation</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Meaningful encounters can build familiarity with people and objects. Learned names and accepted corrections or withdrawals are retained more consistently, while routine visibility alone does not create a permanent record of every prop.
          </li>
          <li>
            Conversation and behavior context better preserve the distinction between direct observations, remembered information, and reported claims. Remembered place associations can inform a search without being treated as proof of a person's or object's current location.
          </li>
          <li>
            NPCs can discuss known offstage objects or ask another person about an object while keeping the inquiry subject distinct from the conversation partner. Relevant names and relationships help inform the exchange without assuming prior acquaintance.
          </li>
          <li>
            When grounded conversation learning is enabled, supported statements from a completed conversation can contribute fallible knowledge. Ambiguous or unsupported dialogue does not automatically become an accepted fact.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">5. Spatial Reasoning and Behavior Continuity</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Known place descriptions and parent/subarea relationships are used more consistently when forming intentions and selecting movement destinations. An NPC outside a building can consider a known interior area directly, subject to live movement validation, without requiring a stop at the broader building first.
          </li>
          <li>
            Short-term behavior now considers the surrounding activity's purpose, earlier progress, and remaining contributions. Preparation can take the broader activity into account rather than treating each step in isolation.
          </li>
          <li>
            When a contribution is already supported by the activity's action history or current location, progress can advance without inventing another action simply to account for it. Behavior still permits purposeful preparation, broad destinations, repeated checks, and personality-dependent choices.
          </li>
        </ul>
        <p className="text-white mt-4">
          These changes improve the information and progress handling available to behavior generation. They do not prescribe one correct room or routine, guarantee perfect model judgment, or eliminate model-provider latency.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">6. Shared Visual Configuration and Upgrade Notes</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Character Sight, Object Vision, and visual place discovery use the same Unreal Sight configuration and observer viewpoint while retaining their own sensing behavior. The editor's Visual Perception Envelope preview shows the shared viewing configuration, not guaranteed visibility of individual targets.
          </li>
          <li>
            Object authoring includes status and validation feedback for identity, metadata, and perceptual geometry. Invalid visual configuration or geometry produces diagnostics rather than a silent fallback.
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          Upgrading an existing project
        </p>
        <p className="text-white">
          Review each NPC controller's Unreal Sight configuration. Retired independent Spatial Perception range, field-of-view, and eye-origin settings no longer control visual sensing or provide a fallback. Spatial observation cadence and place-cue enablement remain separate spatial settings.
        </p>
      </div>
    </div>
  ),
};

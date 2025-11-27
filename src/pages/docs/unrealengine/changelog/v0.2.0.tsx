import React from 'react';
import { Release } from './types';

export const v0_2_0: Release = {
  version: 'v0.2.0',
  date: 'November 2025',
  summary: 'Refactored controller-centered monolith into a collection of modules and introduced long-term planning',
  highlights: [
    'Moved to a more structured plan-then-execute NPC behavior architecture',
    'Long-running NPC computations are offloaded to background threads',
    'Introduced a global in-game time system to maintain a unified sense of time',
    'API surface changes for a smoother workflow',
  ],
  content: (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">1. High-Level Overview</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            NPC "brain" logic has been refactored from a controller-centered monolith into a <code className="bg-slate-800/50 px-2 py-1 rounded">UNPCBrain</code> container that owns dedicated modules for:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Planning (daily plans and expanded sub-plans)</li>
              <li>Scheduling (managing when to carry out plans)</li>
              <li>Execution (turning plans into concrete actions)</li>
              <li>Memory (storing events, observations, relationships, locations, etc.)</li>
              <li>Conversation (processing incoming messages and generating appropriate responses)</li>
            </ul>
          </li>
        </ul>
        <p className="text-white mt-4">
          Users still only need to interact directly with the <code className="bg-slate-800/50 px-2 py-1 rounded">BaseNPC</code> and <code className="bg-slate-800/50 px-2 py-1 rounded">BaseNPCController</code> classes, and don't need to directly handle or manage the new <code className="bg-slate-800/50 px-2 py-1 rounded">UNPCBrain</code> container or any internal representations.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">2. New Behavior Model: Plan-Then-Execute (Long-Term Coherence)</h2>
        <p className="text-white font-semibold mb-3">
          What changed
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li><strong className="text-white">Legacy:</strong> NPCs operated in a greedy, one-task-at-a-time manner by only considering what to do in a single moment in time and constantly improvising as time went on.</li>
          <li>
            <strong className="text-white">New:</strong> NPCs now operate on a more structured plan-then-execute pipeline that starts with a high-level plan with tasks for the day, which is then refined into more granular sub-steps to eventually arrive at a sequence of concrete actions to execute.
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>The result is more coherent long-term behavior</li>
            </ul>
          </li>
        </ul>
        <p className="text-white mt-6 mb-3">
          The new behavior model does not require any user orchestration, so the user's main responsibility is still to:
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Provide good world/character descriptions</li>
          <li>Register a sensible set of NPC actions</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">3. Performance and Threading</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Continuous / long‑running behavior (planning, scheduling, decomposition, memory operations, LLM calls, etc.) is now performed off the game thread on background cores.</li>
          <li>
            The NPC brain only hops to the game thread when it really needs to, such as to:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Start or finish an action</li>
              <li>Engage in conversation</li>
            </ul>
          </li>
          <li>All user-defined actions are automatically wrapped so they execute safely on the game thread</li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          Impacts:
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Users can still implement NPC actions as normal Unreal code without needing to worry about threading.</li>
          <li>NPCs will no longer  become completely idle while trying to come up with the next thing to do.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">4. Global In-Game Time</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Introduced a global in‑game time system used by all NPCs to maintain a unified sense of time.
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Addresses cases where one NPC operates as if it's high noon while another NPC operates as if it's midnight</li>
            </ul>
          </li>
          <li>
            Time is driven by a <code className="bg-slate-800/50 px-2 py-1 rounded">UGameTimeSubsystem</code>, which also exposes hooks to allow users to query the current in-game time. Users can:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>
                Provide custom calendars to dictate the structure of months and years (days are currently hardcoded with the standard 24-hour structure). The plugin currently comes with:
                <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                  <li>A standard Gregorian calendar</li>
                  <li>A simple 30-day month / 360-day year calendar</li>
                </ul>
              </li>
              <li>
                Tune the relation between in-game days and real-world time
                <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                  <li>An in-game day can be equal to a full real-world day, or something like 15 real-world minutes</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          Config and runtime control
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Initial game time is configured via Project Settings (see Section 5)</li>
          <li>
            At runtime, users can manually change the in-game time using:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>
                <code className="bg-slate-800/50 px-2 py-1 rounded">RNPCsUtilities::SetGameWorldTime(...)</code>
              </li>
              NPCs will automatically observe the new time and will update their behavior accordingly.
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">5. Configuration Flow (Project Settings)</h2>
        <ul className="list-disc list-inside space-y-3 text-white">
          <li>Configuration that was scattered across various function calls and required developer coordination has been centralized in Project Settings → RealisticNPCs:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>World description
                <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                  <li>Optional inline description field</li>
                  <li>Optional world decription file path</li>
                  <li>The plugin lazy loads the world description by itself, no longer requiring any user handling</li>
                  <li>If the InlineWorldDescription field is non-empty, it will <strong>always</strong> take precedence over the file, even if a file path is also provided</li>
                </ul>
              </li>
              <li>LLM configuration
                <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                  <li>Single LLM configuration path</li>
                  <li>The plugin also lazy loads the configuration by itself, so there is also no longer any user handling required</li>
                </ul>
              </li>
              <li>Initial game start time, which is the time that the global game clock is set to on startup</li>
            </ul>
          </li>
        </ul>
        <p className="text-white mt-6 mb-3">
          Now, users can configure the plugin once in Project Settings instead of sprinkling config code throughout the project.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">6. NPC Action Registration and Completion Semantics</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Actions can now be registered with up to 5 parameters, with names and descriptions for each</li>
          <li>
            Two new fields are required when registering actions:
            <ol className="list-decimal space-y-3 text-white ml-6 mt-2">
              <li>
                <strong className="text-white">Completion Mode</strong>
                <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                  <li>
                    <code className="bg-slate-800/50 px-2 py-1 rounded">Until_Complete</code>
                    <span className="ml-2">- Action runs until some condition inside user's own code determines it's done, e.g., finished walking to a location, finished picking up an item, finished opening a door, etc.</span>
                  </li>
                  <li>
                    <code className="bg-slate-800/50 px-2 py-1 rounded">Duration</code>
                    <span className="ml-2">- Action is meant to run for some amount of time, and the plugin dynamically decides how long to run these based on the NPC's current behavior.</span>
                  </li>
                </ul>
              </li>
              <li>
                <strong className="text-white">Usage Flag</strong>
                <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                  <li><code className="bg-slate-800/50 px-2 py-1 rounded">Primary</code> - for "official" actions that the plugin will use for standard behavior when executing an NPC's plans</li>
                  <li><code className="bg-slate-800/50 px-2 py-1 rounded">Filler</code> - for simple actions that are used opportunistically when NPCs have downtime between their core plans. These might include actions like "lean on railing", "look around the vicinity", "daydream", etc.</li>
                  <li><code className="bg-slate-800/50 px-2 py-1 rounded">Primary | Filler</code> - for actions that can be used in both roles</li>
                </ul>
              </li>
            </ol>
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          Completion semantics
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            <strong className="text-white">Until_Complete actions</strong>
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>User implementations <strong>must</strong> explicitly call <code className="bg-slate-800/50 px-2 py-1 rounded">FinishNPCAction()</code> when the action's completion condition is met.</li>
            </ul>
          </li>
          <li>
            <strong className="text-white">Duration actions</strong>
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>User implementations <strong>do not</strong> call <code className="bg-slate-800/50 px-2 py-1 rounded">FinishNPCAction()</code>; the plugin tracks the scheduled duration and will auto-finish the action when time is up.</li>
            </ul>
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          A unified cleanup hook has been introduced that applies to both types of actions.
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            <code className="bg-slate-800/50 px-2 py-1 rounded">ABaseNPCController::OnNPCActionFinished(...)</code>
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>The plugin will automatically call this function on the game thread whenever any action finishes (both <code className="bg-slate-800/50 px-2 py-1 rounded">Until_Complete</code> and <code className="bg-slate-800/50 px-2 py-1 rounded">Duration</code>)</li>
              <li>Users do <strong>not</strong> call this function directly from any of their actions</li>
              <li>The base implementation just stops any active anim montage on the NPC</li>
              <li>Override this function to customize the shared cleanup behavior for all actions</li>
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">7. NPC Lifecycle, Start, and Logging</h2>
        <p className="text-white font-semibold mb-3">Start function</p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            <code className="bg-slate-800/50 px-2 py-1 rounded">StartNPCTask</code> has been renamed to <code className="bg-slate-800/50 px-2 py-1 rounded">StartNPC</code> to better reflect the new pipeline:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Legacy: start function kicked off one ad-hoc behavior generation cycle</li>
              <li>New: start function brings the whole brain online (daily planning, scheduling, execution, conversations, etc.)</li>
            </ul>
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          Enable NPC flag bug fix
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Legacy: <code className="bg-slate-800/50 px-2 py-1 rounded">ABaseNPC::bNPCEnabled</code> existed but wasn't actually used by the plugin; it was just an exposed field.</li>
          <li>
            New: <code className="bg-slate-800/50 px-2 py-1 rounded">StartNPC</code> now respects <code className="bg-slate-800/50 px-2 py-1 rounded">bNPCEnabled</code>
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>If disabled, the NPC will not start thinking/acting</li>
              <li>Note that the flag still does not disable conversation, so even if the flag is disabled, NPCs will still engage/initiate conversations</li>
              <li>The flag is still exposed so users can gate execution themselves, but the plugin now also honors it</li>
            </ul>
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          Logging
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li><code className="bg-slate-800/50 px-2 py-1 rounded">bLogTasks</code> still controls whether an NPC logs its "thinking"</li>
          <li>
            With the new behavior model, enabling this flag will cause an NPC to log the entirety of its thinking process
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>High level daily plan</li>
              <li>Intermediate plan item expansions</li>
              <li>Decomposed action sequences</li>
            </ul>
          </li>
          <li>
            The logging is <strong>very verbose</strong>
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Recommended only for debugging a single or small handful of NPCs at a time</li>
              <li>Avoid enabling this flag for many NPCs simultaneously or it will flood the log/console</li>
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">8. Conversation System</h2>
        <p className="text-white font-semibold mb-3">There are several API surface changes with the conversation system</p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li><code className="bg-slate-800/50 px-2 py-1 rounded">TryStartConvo</code> is no longer overrideable as a control-flow hook; conversation orchestration lives entirely inside the plugin</li>
          <li><code className="bg-slate-800/50 px-2 py-1 rounded">FinishConvo</code> is still overrideable on characters</li>
          <li>
            New API for player characters when engaging NPCs in conversation:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>
                <code className="bg-slate-800/50 px-2 py-1 rounded">RequestConversation(ABaseCharacter* Partner)</code>
                <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                  <li>Mirrored versions of the hook are available in the <code className="bg-slate-800/50 px-2 py-1 rounded">ABaseNPC</code> and <code className="bg-slate-800/50 px-2 py-1 rounded">ABaseNPCController</code> classes</li>
                  <li>Used when a player character attempts to initate a conversation with an NPC, and returns whether the NPC accepted the conversation request</li>
                  <li>If the function returns <code className="bg-slate-800/50 px-2 py-1 rounded">true</code>, it will also safely pause NPC execution so they don't walk off as a player character types the opening conversation message</li>
                </ul>
              </li>
              <li>
                <code className="bg-slate-800/50 px-2 py-1 rounded">ForceEndConversation()</code>
                <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                  <li>Mirrored versions of the hook are available in the <code className="bg-slate-800/50 px-2 py-1 rounded">ABaseNPC</code> and <code className="bg-slate-800/50 px-2 py-1 rounded">ABaseNPCController</code> classes</li>
                  <li>Allows a forced abort of the ongoing conversation, and is meant to allow player characters to force end a conversation without causing the NPC to hang</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          Behavioral changes for NPC-initiated conversations
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            NPCs no longer:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Automatically speed up to chase down conversation targets</li>
              <li>Track conversation targets indefinitely</li>
            </ul>
          </li>
          <li>
            NPCs now:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Only attempt to reach a conversation target for a limited time window; if they can't reach the target, the NPC will abandon the attempt and move on</li>
              <li>Skip starting a conversation entirely if they know the target is out of a predefined range</li>
            </ul>
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          Handling changes for player-initiated conversations
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Player characters should:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Call <code className="bg-slate-800/50 px-2 py-1 rounded">RequestConversation</code> first when trying to engage an NPC in conversation</li>
              <li>Start sending messages only if the request is accepted; otherwise, the NPC will not receive or respond to messages</li>
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">9. Character Description and Perception</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            Tracking of a character's current natural-language description has been refined:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>
                Legacy: Two functions:
                <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                  <li><code className="bg-slate-800/50 px-2 py-1 rounded">UpdateDescription</code> - update a character's description and broadcast to any other characters that are currently perceiving this character</li>
                  <li><code className="bg-slate-800/50 px-2 py-1 rounded">SilentUpdateDescription</code> - update a character's description without broadcasting</li>
                </ul>
              </li>
              <li>New: These are combined into a single function with a "kind" parameter: <code className="bg-slate-800/50 px-2 py-1 rounded">Significant</code> vs <code className="bg-slate-800/50 px-2 py-1 rounded">Mundane</code></li>
            </ul>
          </li>
          <li>
            "Significant" updates:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Are character updates that are likely to influence other NPC's behavior, memory, conversations, etc., and is broadcasted when updated</li>
            </ul>
          </li>
          <li>
            "Mundane" updates:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>Reflect small state changes (e.g., walking, standing up, sitting down) that should be observable but aren't likely to influence other NPC's behavior, and thus is not broadcasted when updated</li>
            </ul>
          </li>
        </ul>
        <p className="text-white font-semibold mt-6 mb-3">
          Usage
        </p>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>Mark mundane, high-frequency changes (e.g., "X is walking") as mundane so they don't spam high level reasoning</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">10. LLM Configuration</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>
            The LLM configuration file has changed from only requiring a single <code className="bg-slate-800/50 px-2 py-1 rounded">default_target</code> to two defaults:
            <ul className="list-disc space-y-2 text-white ml-6 mt-2">
              <li>
                <code className="bg-slate-800/50 px-2 py-1 rounded">default_heavy_target</code>
                <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                  <li>
                    For expensive reasoning tasks like:
                    <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                      <li>Daily plan generation</li>
                      <li>Conversation message generation</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <code className="bg-slate-800/50 px-2 py-1 rounded">default_light_target</code>
                <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                  <li>
                    For cheaper tasks like:
                    <ul className="list-disc space-y-2 text-white ml-6 mt-2">
                      <li>Memory retrieval</li>
                      <li>Conversation summary generation for memory storage</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">11. Miscellaneous Changes</h2>
        <ul className="list-disc space-y-3 text-white ml-6">
          <li>The <code className="bg-slate-800/50 px-2 py-1 rounded">ABaseNPCController::InsertNPCAction</code> function has been removed; fine-grained conditional handling of action level logic is left entirely to the user</li>
        </ul>
      </div>
      
    </div>
  ),
};

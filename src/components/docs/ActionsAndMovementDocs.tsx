import React from 'react';

export default function ActionsAndMovementDocs() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">Actions and Movement</h2>
      <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
        <p>
          Actions are the gameplay primitives an NPC can choose while carrying out behavior. Authors define custom actions on an <code className="bg-white/20 px-2 py-1 rounded">ABaseNPCController</code> subclass, then decide which NPCs can use those actions through action-set assets and per-NPC overrides.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">Register Actions</h3>
            <p>
              Override <code className="bg-white/20 px-2 py-1 rounded">RegisterNPCActions</code> on the controller and register concrete gameplay primitives with clear descriptions and typed parameters.
            </p>
          </div>
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">Assign Access</h3>
            <p>
              Use <code className="bg-white/20 px-2 py-1 rounded">UNPCActionSetAsset</code> presets for shared roles, then use per-NPC additions or removals for exceptions.
            </p>
          </div>
          <div className="bg-slate-800/40 border border-white/10 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-3">Let Movement Stay Grounded</h3>
            <p>
              Do not author a generic custom movement primitive for ordinary travel. The plugin owns route-aware movement through its built-in movement action and controller movement helpers.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Action Registration</h3>
          <p>
            Register actions in the controller class that implements them. Each action needs a stable <code className="bg-white/20 px-2 py-1 rounded">ActionId</code>, a prompt-facing <code className="bg-white/20 px-2 py-1 rounded">ActionDescription</code>, and any parameters the behavior system must provide.
          </p>
          <p className="mt-4">
            Prefer small, concrete gameplay primitives over broad declarative actions. For example, <code className="bg-white/20 px-2 py-1 rounded">serve_meal</code>, <code className="bg-white/20 px-2 py-1 rounded">restock_shelf</code>, or <code className="bg-white/20 px-2 py-1 rounded">inspect_door</code> gives the behavior system more grounded options than a single vague <code className="bg-white/20 px-2 py-1 rounded">do_work</code> action.
          </p>

          <div className="bg-slate-800/50 rounded-lg p-4 mt-4 overflow-x-auto">
            <pre>
              <code className="text-sm text-gray-300">{`void AShopkeeperController::RegisterNPCActions(FNPCActionRegistrar& Registrar)
{
    FNPCActionSpec Spec;
    Spec.ActionId = TEXT("serve_meal");
    Spec.ActionDescription = TEXT("prepare and serve a meal to the specified nearby character.");

    FNPCActionParamSpec GuestParam;
    GuestParam.Name = TEXT("guest");
    GuestParam.Type = ENPCActionParamType::CharacterRef;
    GuestParam.Description = TEXT("character receiving the meal");
    GuestParam.bRequired = true;
    Spec.Parameters.Add(GuestParam);

    Registrar.RegisterInstantAction(Spec, this, &AShopkeeperController::ServeMeal);
}

void AShopkeeperController::ServeMeal(FCharacterRef Guest)
{
    // Trigger gameplay, animation, inventory, or quest logic here.
}`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Typed Parameters</h3>
          <p>
            The action system validates registered action signatures against their parameter specs. Supported parameter types are <code className="bg-white/20 px-2 py-1 rounded">String</code>, <code className="bg-white/20 px-2 py-1 rounded">Bool</code>, <code className="bg-white/20 px-2 py-1 rounded">Int32</code>, <code className="bg-white/20 px-2 py-1 rounded">Float</code>, <code className="bg-white/20 px-2 py-1 rounded">Choice</code>, <code className="bg-white/20 px-2 py-1 rounded">CharacterRef</code>, and <code className="bg-white/20 px-2 py-1 rounded">LocationRef</code>.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 mt-4">
            <li>Use <code className="bg-white/20 px-2 py-1 rounded">CharacterRef</code> when the action targets a known character.</li>
            <li>Use <code className="bg-white/20 px-2 py-1 rounded">LocationRef</code> when the action targets a grounded spatial reference.</li>
            <li>Use <code className="bg-white/20 px-2 py-1 rounded">Choice</code> for a closed set of safe values; provide <code className="bg-white/20 px-2 py-1 rounded">AllowedChoices</code>.</li>
            <li>Use numeric bounds for <code className="bg-white/20 px-2 py-1 rounded">Int32</code> and <code className="bg-white/20 px-2 py-1 rounded">Float</code> parameters so generated values stay constrained.</li>
            <li>Set <code className="bg-white/20 px-2 py-1 rounded">bRequired</code> to false only when the action can behave sensibly without that parameter.</li>
          </ul>
          <p className="mt-4">
            Parameter names and descriptions are prompt-facing. Keep them short, literal, and aligned with the gameplay effect the action actually performs.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Action Lifecycles</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">RegisterInstantAction</code>
              <p className="mt-2">
                Use for actions that complete immediately after their gameplay logic runs. The registrar finishes the action for you.
              </p>
            </div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">RegisterAction</code>
              <p className="mt-2">
                Use for actions that complete asynchronously, such as an animation, interaction, or movement-backed action. Call <code className="bg-white/20 px-2 py-1 rounded">FinishNPCAction()</code> when the action is actually done.
              </p>
            </div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">RegisterDurationAction</code>
              <p className="mt-2">
                Use for lived activity time, such as working, waiting, eating, resting, or watching. The behavior policy chooses the duration, your action starts the activity, and the plugin completes the action through its duration timer.
              </p>
            </div>
          </div>
          <p className="mt-4">
            Override <code className="bg-white/20 px-2 py-1 rounded">OnNPCActionFinished</code> when a controller needs centralized cleanup after any action finishes, such as stopping montages, clearing interaction state, or resetting temporary gameplay flags.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Action Sets</h3>
          <p>
            <code className="bg-white/20 px-2 py-1 rounded">UNPCActionSetAsset</code> is a reusable list of custom action IDs. Assign action-set assets to <code className="bg-white/20 px-2 py-1 rounded">ActionSetPresets</code> on an NPC, then use <code className="bg-white/20 px-2 py-1 rounded">AddedActionIds</code> or <code className="bg-white/20 px-2 py-1 rounded">RemovedActionIds</code> for one-off differences.
          </p>
          <p className="mt-4">
            At runtime, custom actions registered by the controller are only made available to an NPC when their action ID is enabled for that NPC. Use <code className="bg-white/20 px-2 py-1 rounded">ValidateEnabledActions</code> in the editor to catch unknown action IDs or mismatched controller classes before play.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Plugin-Owned Movement</h3>
          <p>
            The built-in <code className="bg-white/20 px-2 py-1 rounded">move_to_location</code> primitive moves NPCs to exact grounded <code className="bg-white/20 px-2 py-1 rounded">LocationRef</code> targets through the spatial system. Authors should not duplicate or replace this primitive with a generic move action.
          </p>
          <p className="mt-4">
            If custom controller logic needs to move an NPC as part of a gameplay action, use the controller movement helpers instead: <code className="bg-white/20 px-2 py-1 rounded">MoveToLocation</code>, <code className="bg-white/20 px-2 py-1 rounded">MoveToCharacter</code>, or <code className="bg-white/20 px-2 py-1 rounded">MoveToActorTarget</code>. The continuation-bearing overloads are available to controller subclasses for actions that need to finish only after movement completes.
          </p>
          <p className="mt-4">
            <code className="bg-white/20 px-2 py-1 rounded">MoveToCharacter</code> is for gameplay code that already has a valid current character reference. It should not be treated as a behavior-policy shortcut for finding or pathing to any character anywhere.
          </p>
          <p className="mt-4">
            Plugin-owned action IDs include <code className="bg-white/20 px-2 py-1 rounded">move_to_location</code>, <code className="bg-white/20 px-2 py-1 rounded">talk_to_nearby</code>, and <code className="bg-white/20 px-2 py-1 rounded">seek_conversation_at_location</code>. They are registered by the plugin and do not need to be added to action sets.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Movement Lifecycle Hooks</h3>
          <p>
            Override <code className="bg-white/20 px-2 py-1 rounded">OnNPCMoveLifecycleEvent</code> when animation, UI, sound, or gameplay systems need to react to plugin-controlled movement. The event includes the move ID, phase, target label, target kind, location reference, target actor or component, waypoint information, and behavior policy context.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 mt-4">
            <li><code className="bg-white/20 px-2 py-1 rounded">Started</code> and <code className="bg-white/20 px-2 py-1 rounded">TargetResolved</code> are useful for starting locomotion or orientation state.</li>
            <li><code className="bg-white/20 px-2 py-1 rounded">WaypointStarted</code> and <code className="bg-white/20 px-2 py-1 rounded">WaypointCompleted</code> are useful for route-aware animation or debug UI.</li>
            <li><code className="bg-white/20 px-2 py-1 rounded">Succeeded</code>, <code className="bg-white/20 px-2 py-1 rounded">Failed</code>, and <code className="bg-white/20 px-2 py-1 rounded">Cancelled</code> are useful for cleanup and recovery.</li>
          </ul>
        </div>

        <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Authoring Checklist</h3>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>Register custom gameplay actions on the controller class that implements them.</li>
            <li>Write action and parameter descriptions as if they are instructions to the behavior system.</li>
            <li>Keep custom action IDs stable and assign them through action-set assets or per-NPC overrides.</li>
            <li>Use plugin movement helpers and lifecycle events instead of duplicating ordinary movement primitives.</li>
            <li>Run <code className="bg-white/20 px-2 py-1 rounded">ValidateEnabledActions</code> after changing action sets or controller classes.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

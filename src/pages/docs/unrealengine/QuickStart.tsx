import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';

export default function QuickStart() {
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
              Quick Start Guide
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          <div className="space-y-20">
            <div id="installation" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">1. Install the Plugin</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Follow the <Link to="/docs/unrealengine/setup" className="text-blue-400 hover:text-blue-300 transition-colors">setup instructions</Link> to install and enable the plugin in your project. If your project uses plugin classes from C++, include <code className="bg-white/20 px-2 py-1 rounded">RealisticNPCs</code> in your module dependencies.
                </p>
              </div>
            </div>

            <div id="project-settings" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">2. Configure Project Settings</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Open <strong>Project Settings -&gt; Plugins -&gt; RealisticNPCs</strong>. The plugin needs model targets, a world description, and a game calendar before NPC behavior starts.
                </p>

                <h3 className="text-xl font-semibold text-white mt-8">Language Model Configuration</h3>
                <p>
                  Create <code className="bg-white/20 px-2 py-1 rounded">Config/RealisticNPCsConfig.json</code> and point the <code className="bg-white/20 px-2 py-1 rounded">LLMConfigFile</code> setting at it. The minimal config should define <code className="bg-white/20 px-2 py-1 rounded">services</code>, <code className="bg-white/20 px-2 py-1 rounded">default_light_target</code>, <code className="bg-white/20 px-2 py-1 rounded">default_heavy_target</code>, and the required <code className="bg-white/20 px-2 py-1 rounded">embed_target</code>.
                </p>
                <p>
                  The default SQLite memory backend works out of the box once <code className="bg-white/20 px-2 py-1 rounded">embed_target</code> is configured. Do not add a <code className="bg-white/20 px-2 py-1 rounded">vector_store</code> block unless you are intentionally configuring Qdrant or an advanced SQLite collection override.
                </p>
                <p>
                  For a first test, use responsive instant-response models. Reasoning models can be experimented with later, but the plugin is not yet tuned around their longer response latency and behavior may feel less fluid.
                </p>
                <p>
                  See the <Link to="/docs/unrealengine/configuration" className="text-blue-400 hover:text-blue-300 transition-colors">configuration guide</Link> for the complete JSON format.
                </p>

                <h3 className="text-xl font-semibold text-white mt-8">World Description and Time</h3>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Set <code className="bg-white/20 px-2 py-1 rounded">InlineWorldDescription</code>, or set <code className="bg-white/20 px-2 py-1 rounded">WorldDescriptionFile</code> to a text file. Inline text takes precedence when both are set.</li>
                  <li>Choose the default calendar and initial time for the world.</li>
                  <li>Leave <code className="bg-white/20 px-2 py-1 rounded">bResetPersistentStateOnStartup</code> disabled unless you need a clean-slate test run.</li>
                </ul>
              </div>
            </div>

            <div id="authored-space" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">3. Create a Minimal Authored Space</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  NPC behavior works best when meaningful places are authored explicitly. For a first test, create one place where the NPC can live, work, or wait.
                </p>
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>For a standalone place, add a <code className="bg-white/20 px-2 py-1 rounded">Spatial Place Anchor</code> actor, set a clear <code className="bg-white/20 px-2 py-1 rounded">PlaceName</code>, then set <code className="bg-white/20 px-2 py-1 rounded">RegionMode</code> and sphere or box bounds if NPCs should move within that place.</li>
                  <li>For an existing actor that represents a place, add a <code className="bg-white/20 px-2 py-1 rounded">Semantic Place</code> component, set a clear <code className="bg-white/20 px-2 py-1 rounded">PlaceName</code>, and configure containment bounds if NPCs should know when they are inside it.</li>
                  <li>Add <code className="bg-white/20 px-2 py-1 rounded">Spatial Area</code> components only for meaningful sub-areas, such as a counter, kitchen, stall, porch, or work spot.</li>
                  <li>For the first run, skip packet assets unless you already need reusable spatial knowledge for multiple places.</li>
                </ol>
                <p>
                  For richer layouts, use the <Link to="/docs/unrealengine/authoring-guide#spatial-authoring" className="text-blue-400 hover:text-blue-300 transition-colors">Spatial Authoring</Link> section.
                </p>
              </div>
            </div>

            <div id="npc-controller" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">4. Create the NPC and Controller</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>Create an NPC class that derives from <code className="bg-white/20 px-2 py-1 rounded">ABaseNPC</code>.</li>
                  <li>Create an AI controller class that derives from <code className="bg-white/20 px-2 py-1 rounded">ABaseNPCController</code>.</li>
                  <li>Assign the controller class as the NPC's AI controller.</li>
                  <li>On the NPC, set <code className="bg-white/20 px-2 py-1 rounded">CharacterName</code>, <code className="bg-white/20 px-2 py-1 rounded">Background</code>, <code className="bg-white/20 px-2 py-1 rounded">ShortTermGoal</code>, and <code className="bg-white/20 px-2 py-1 rounded">SelfAssessment</code>.</li>
                  <li>Add your authored place to the NPC's starting spatial knowledge with <code className="bg-white/20 px-2 py-1 rounded">InitialPlaceOverrides</code>, or use a seed preset if you already have one.</li>
                  <li>Enable <code className="bg-white/20 px-2 py-1 rounded">bNPCEnabled</code>. Enable <code className="bg-white/20 px-2 py-1 rounded">bLogBehavior</code> while testing one or two NPCs.</li>
                </ol>
              </div>
            </div>

            <div id="actions" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">5. Register a Gameplay Action</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Custom actions are concrete gameplay primitives registered by your controller subclass. For a first NPC, register one simple duration action and enable it through an action-set asset.
                </p>

                <div className="bg-slate-800/50 rounded-lg p-4 overflow-x-auto">
                  <pre>
                    <code className="text-sm text-gray-300">{`// ShopkeeperNPCController.h
#pragma once

#include "BaseNPCController.h"
#include "ShopkeeperNPCController.generated.h"

UCLASS()
class YOURGAME_API AShopkeeperNPCController : public ABaseNPCController
{
    GENERATED_BODY()

protected:
    virtual void OnPossess(APawn* InPawn) override;
    virtual void RegisterNPCActions(FNPCActionRegistrar& Registrar) override;

private:
    void TendShop();
};`}</code>
                  </pre>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 overflow-x-auto">
                  <pre>
                    <code className="text-sm text-gray-300">{`// ShopkeeperNPCController.cpp
#include "ShopkeeperNPCController.h"
#include "ActionTypes.h"

void AShopkeeperNPCController::OnPossess(APawn* InPawn)
{
    Super::OnPossess(InPawn);
    StartNPC();
}

void AShopkeeperNPCController::RegisterNPCActions(FNPCActionRegistrar& Registrar)
{
    FNPCActionSpec Spec;
    Spec.ActionId = TEXT("tend_shop");
    Spec.ActionDescription = TEXT("stay at the shop and tend to ordinary shopkeeping work.");

    Registrar.RegisterDurationAction(Spec, this, &AShopkeeperNPCController::TendShop);
}

void AShopkeeperNPCController::TendShop()
{
    // Start animation, ambient interaction, VFX, or gameplay state here.
    // Duration actions are completed by the plugin's duration timer.
}`}</code>
                  </pre>
                </div>

                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>Create an <code className="bg-white/20 px-2 py-1 rounded">NPC Action Set</code> asset.</li>
                  <li>Add <code className="bg-white/20 px-2 py-1 rounded">tend_shop</code> to the asset's <code className="bg-white/20 px-2 py-1 rounded">ActionIds</code>.</li>
                  <li>Assign the action-set asset to the NPC's <code className="bg-white/20 px-2 py-1 rounded">ActionSetPresets</code>.</li>
                  <li>Do not register a generic movement action. The plugin owns ordinary grounded movement through <code className="bg-white/20 px-2 py-1 rounded">move_to_location</code>.</li>
                </ol>

                <p>
                  Use <code className="bg-white/20 px-2 py-1 rounded">RegisterInstantAction</code> for actions that complete immediately, <code className="bg-white/20 px-2 py-1 rounded">RegisterAction</code> for actions that call <code className="bg-white/20 px-2 py-1 rounded">FinishNPCAction()</code> later, and <code className="bg-white/20 px-2 py-1 rounded">RegisterDurationAction</code> for lived activity time.
                </p>
              </div>
            </div>

            <div id="optional-conversation" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">6. Optional: Add Participating Characters</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Any player, companion, scripted character, or other character actor that should participate in the plugin should derive from <code className="bg-white/20 px-2 py-1 rounded">ABaseCharacter</code>. This includes characters that should converse with NPCs, expose perceivable facts, be remembered, or appear in authored relationships.
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Call <code className="bg-white/20 px-2 py-1 rounded">StartDirectedConversationWith(Target)</code> on the initiating character to request a directed conversation.</li>
                  <li>Use <code className="bg-white/20 px-2 py-1 rounded">bIsInConversation</code>, <code className="bg-white/20 px-2 py-1 rounded">OnConversationEntered</code>, and <code className="bg-white/20 px-2 py-1 rounded">OnConversationEnded</code> for UI, animation, camera, or gameplay reactions.</li>
                  <li>When gameplay needs to forcibly end an active conversation, route that through the involved NPC, NPC controller, or project conversation coordinator.</li>
                </ul>
              </div>
            </div>

            <div id="testing" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">7. Test the Setup</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>Place the authored spatial actors and the NPC in the level.</li>
                  <li>Run <code className="bg-white/20 px-2 py-1 rounded">ValidateInitialPacketAssignments</code> on the NPC if you assigned spatial presets or packet overrides.</li>
                  <li>Run <code className="bg-white/20 px-2 py-1 rounded">ValidateEnabledActions</code> after assigning the action set and controller class.</li>
                  <li>Start PIE and watch the behavior log if <code className="bg-white/20 px-2 py-1 rounded">bLogBehavior</code> is enabled.</li>
                </ol>

                <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Expected First Result</h3>
                  <p>
                    The NPC should initialize its brain, use the configured model targets, understand its starting place, select behavior from its profile and available actions, move through plugin-owned grounded movement when needed, and run the enabled custom action when appropriate.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-white mt-8">Debugging Tips</h3>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>If no behavior starts, confirm the NPC is possessed by an <code className="bg-white/20 px-2 py-1 rounded">ABaseNPCController</code> subclass and that the subclass calls <code className="bg-white/20 px-2 py-1 rounded">StartNPC()</code>.</li>
                  <li>If a custom action is never used, confirm its action id is registered by the controller and enabled through the NPC's action set or additions.</li>
                  <li>If location behavior seems stale after spatial authoring changes, enable <code className="bg-white/20 px-2 py-1 rounded">bResetPersistentStateOnStartup</code> for one clean run, then disable it again before testing persistence.</li>
                  <li>If memory retrieval fails to initialize, confirm <code className="bg-white/20 px-2 py-1 rounded">embed_target</code> is present and points to a valid embedding service.</li>
                </ul>

                <p>
                  After this minimal loop works, continue with the <Link to="/docs/unrealengine/authoring-guide" className="text-blue-400 hover:text-blue-300 transition-colors">Authoring Guide</Link> for action parameters, richer spatial authoring, perception facts, memory persistence, and the API reference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function BaseNPCControllerDocs() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">BaseNPCController</h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          The base controller class for NPCs. This class extends Unreal Engine's AAIController class and is meant to handle all the AI-related functionality for NPCs, including task generation, action execution, perception processing, and behavior coordination. Custom NPC controller classes are meant to extend this class.
        </p>
        <p>A miscellaneous item to note about BaseNPCController:</p>
        <ul className="list-disc list-inside pl-4 space-y-2">
          <li>The BaseNPCController, and the plugin more generally, doesn't enforce or provide any specific perception method, so users need to define the perception method, such as overlap events or Unreal Engine's AI perception components.</li>
        </ul>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Functions</h3>
        <div className="space-y-8">
          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">RegisterNPCAction</code>
              </h4>
              <p className="mb-4">
                This function notifies the BaseNPCController of an action that the possessed NPC is able to execute. Each BaseNPCController instance will have a separate registered actions list, so each NPC can have their own set of allowed actions. The function should be called before any behavior is generated for the possessed NPC, e.g., in the BeginPlay or OnPossess function. If the set of actions for an NPC was defined using the ActionLibrary field of a BaseNPC, one approach can be to loop through that list and call this function on each element with the corresponding parameters to register all of an NPC's associated actions.
              </p>
              <p className="mb-4">
                <strong>Note:</strong> the BaseNPCController comes with a pre-registered action for handling conversations. This means users should NOT register their own conversing/talking action.
              </p>

              <h5 className="text-white font-semibold mt-6 mb-4">Function Overloads</h5>
              <p className="mb-4">
                RegisterNPCAction supports actions with 0 to 5 parameters. All overloads share common parameters with parameter-specific arrays:
              </p>

              <div className="bg-slate-800/30 p-4 rounded mb-4">
                <p className="mb-2 font-medium text-white">0 Parameters:</p>
                <code className="text-sm block bg-slate-900/50 p-3 rounded overflow-x-auto">
                  void RegisterNPCAction(const FString& ActionName, const FString& ActionDescription,{'\n'}
                  {'  '}const TArray{'<'}FString{'>'}& ParamNames, const TArray{'<'}FString{'>'}& ParamDescriptions,{'\n'}
                  {'  '}UserClass* Instance, void (UserClass::* InAction)(),{'\n'}
                  {'  '}ENPCActionCompletion CompletionMode, ENPCActionUsage Usage = ENPCActionUsage::Primary);
                </code>
              </div>

              <div className="bg-slate-800/30 p-4 rounded mb-4">
                <p className="mb-2 font-medium text-white">1 Parameter:</p>
                <code className="text-sm block bg-slate-900/50 p-3 rounded overflow-x-auto">
                  void RegisterNPCAction(const FString& ActionName, const FString& ActionDescription,{'\n'}
                  {'  '}const TArray{'<'}FString{'>'}& ParamNames, const TArray{'<'}FString{'>'}& ParamDescriptions,{'\n'}
                  {'  '}UserClass* Instance, void (UserClass::* InAction)(const FString),{'\n'}
                  {'  '}ENPCActionCompletion CompletionMode, ENPCActionUsage Usage = ENPCActionUsage::Primary);
                </code>
              </div>

              <div className="bg-slate-800/30 p-4 rounded mb-4">
                <p className="mb-2 font-medium text-white">2 Parameters:</p>
                <code className="text-sm block bg-slate-900/50 p-3 rounded overflow-x-auto">
                  void RegisterNPCAction(const FString& ActionName, const FString& ActionDescription,{'\n'}
                  {'  '}const TArray{'<'}FString{'>'}& ParamNames, const TArray{'<'}FString{'>'}& ParamDescriptions,{'\n'}
                  {'  '}UserClass* Instance, void (UserClass::* InAction)(const FString, const FString),{'\n'}
                  {'  '}ENPCActionCompletion CompletionMode, ENPCActionUsage Usage = ENPCActionUsage::Primary);
                </code>
              </div>

              <div className="bg-slate-800/30 p-4 rounded mb-4">
                <p className="mb-2 font-medium text-white">3 Parameters:</p>
                <code className="text-sm block bg-slate-900/50 p-3 rounded overflow-x-auto">
                  void RegisterNPCAction(const FString& ActionName, const FString& ActionDescription,{'\n'}
                  {'  '}const TArray{'<'}FString{'>'}& ParamNames, const TArray{'<'}FString{'>'}& ParamDescriptions,{'\n'}
                  {'  '}UserClass* Instance,{'\n'}
                  {'  '}void (UserClass::* InAction)(const FString, const FString, const FString),{'\n'}
                  {'  '}ENPCActionCompletion CompletionMode, ENPCActionUsage Usage = ENPCActionUsage::Primary);
                </code>
              </div>

              <div className="bg-slate-800/30 p-4 rounded mb-4">
                <p className="mb-2 font-medium text-white">4 Parameters:</p>
                <code className="text-sm block bg-slate-900/50 p-3 rounded overflow-x-auto">
                  void RegisterNPCAction(const FString& ActionName, const FString& ActionDescription,{'\n'}
                  {'  '}const TArray{'<'}FString{'>'}& ParamNames, const TArray{'<'}FString{'>'}& ParamDescriptions,{'\n'}
                  {'  '}UserClass* Instance,{'\n'}
                  {'  '}void (UserClass::* InAction)(const FString, const FString, const FString, const FString),{'\n'}
                  {'  '}ENPCActionCompletion CompletionMode, ENPCActionUsage Usage = ENPCActionUsage::Primary);
                </code>
              </div>

              <div className="bg-slate-800/30 p-4 rounded mb-4">
                <p className="mb-2 font-medium text-white">5 Parameters:</p>
                <code className="text-sm block bg-slate-900/50 p-3 rounded overflow-x-auto">
                  void RegisterNPCAction(const FString& ActionName, const FString& ActionDescription,{'\n'}
                  {'  '}const TArray{'<'}FString{'>'}& ParamNames, const TArray{'<'}FString{'>'}& ParamDescriptions,{'\n'}
                  {'  '}UserClass* Instance,{'\n'}
                  {'  '}void (UserClass::* InAction)(const FString, const FString, const FString, const FString, const FString),{'\n'}
                  {'  '}ENPCActionCompletion CompletionMode, ENPCActionUsage Usage = ENPCActionUsage::Primary);
                </code>
              </div>

              <h5 className="text-white font-medium mt-6 mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">ActionName</code>: A text name for the action, which can be anything since it will mostly just be used for ease of reference.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">ActionDescription</code>: A text description of the action's purpose. This will be what the AI uses to determine if an action is appropriate for a particular task.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">ParamNames</code>: An array of text names for each action parameter. The size should match the number of parameters in the action function.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">ParamDescriptions</code>: An array of text descriptions for each parameter's purpose. This will be what the AI uses to determine what parameter values to pass when calling the action function.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Instance</code>: The class instance to call the action function on.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">InAction</code>: The function address of the action function with a void return type and 0-5 const FString parameters.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">CompletionMode</code>: Determines how the action completes. <code className="bg-white/20 px-1 rounded">Until_Complete</code> means the action runs until user code calls FinishNPCAction(). <code className="bg-white/20 px-1 rounded">Duration</code> means the plugin dynamically decides the duration and auto-finishes the action.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Usage</code>: Specifies action usage. <code className="bg-white/20 px-1 rounded">Primary</code> for standard behavior actions, <code className="bg-white/20 px-1 rounded">Filler</code> for opportunistic downtime actions, or <code className="bg-white/20 px-1 rounded">Primary | Filler</code> for both. Defaults to Primary.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">FinishNPCAction</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">void FinishNPCAction()</code>
              </p>
              <p className="mb-4">
                This function is called at the end of an NPC action to indicate when the action is finished and that the NPC should proceed to executing the next action or task. This function is blueprint callable so it can be called either from C++ or blueprint.
              </p>
              <p className="mb-4">
                <strong>Important:</strong> This function should ONLY be called for actions registered with <code className="bg-white/20 px-1 rounded">Until_Complete</code> completion mode. Actions with <code className="bg-white/20 px-1 rounded">Duration</code> completion mode are auto-finished by the plugin and should NOT call this function.
              </p>
              <p className="mb-4">
                For example, if a C++ function is defined for an Until_Complete action, then at the end of that function when the completion condition is met, the FinishNPCAction() function should be called. As another example, if a walking action is defined with a MoveToActor or MoveToLocation function call, the FinishNPCAction() function can be called in an overridden OnMoveCompleted() function.
              </p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">OnNPCActionFinished</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual void OnNPCActionFinished(const FString& ActionName, const TArray{'<'}FString{'>'}& Params, ENPCActionCompletion CompletionMode)</code>
              </p>
              <p className="mb-4">
                This is a unified cleanup hook that is automatically called by the plugin on the game thread whenever any action finishes, regardless of whether it was an <code className="bg-white/20 px-1 rounded">Until_Complete</code> or <code className="bg-white/20 px-1 rounded">Duration</code> action. Users do NOT call this function directly from any of their actions.
              </p>
              <p className="mb-4">
                The base implementation simply stops any active animation montage on the NPC. Override this function to customize the shared cleanup behavior that should apply to all actions, such as resetting state variables, stopping animations, or performing other common cleanup tasks. The function parameters provide information about the action that just finished, allowing for action-specific cleanup logic if needed.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">ActionName</code>: The name of the action that just finished.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Params</code>: The parameter values that were passed to the action when it was executed.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">CompletionMode</code>: The completion mode of the action (Until_Complete or Duration).
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">StartNPC</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">void StartNPC()</code>
              </p>
              <p className="mb-4">
                This function brings the entire NPC brain online, including daily planning, scheduling, execution, and conversations. Once called, the NPC will begin operating in a plan-then-execute pipeline: generating high-level daily plans, refining them into granular sub-steps, and executing sequences of concrete actions.
              </p>
              <p className="mb-4">
                The function respects the <code className="bg-white/20 px-1 rounded">bNPCEnabled</code> flag. If disabled, the NPC will not start thinking or acting, though it will still respond to conversations.
              </p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">RequestConversation</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">bool RequestConversation(ABaseCharacter* Requester)</code>
              </p>
              <p className="mb-4">
                This function is used when a player character attempts to initiate a conversation with the NPC. It returns whether the NPC accepted the conversation request. If the function returns true, it will also safely pause NPC execution so they don't walk away as a player character types the opening conversation message. Player characters should call this function first when trying to engage an NPC in conversation, and only start sending messages if the request is accepted; otherwise, the NPC will not receive or respond to messages.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Requester</code>: The character requesting the conversation.
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>True if the NPC accepts the conversation request; false otherwise.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">ForceEndConversation</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">void ForceEndConversation()</code>
              </p>
              <p className="mb-4">
                Allows a forced abort of an ongoing conversation. This function is meant to allow player characters to force end a conversation without causing the NPC to hang. It ensures that the NPC properly cleans up its conversation state and can resume normal behavior.
              </p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">LoadMemoriesFromFile</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">void LoadMemoriesFromFile(FString FilePath)</code>
            </p>
            <p className="mb-4">
              This function reads an NPC's initial memories from a file. The function expects each memory to be on a different line in the file.
            </p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">FilePath</code>: The full file path to the memories file.
              </li>
            </ul>
          </div>
            </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">SaveMemoriesToFile</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">void SaveMemoriesToFile(FString FilePath)</code>
            </p>
            <p className="mb-4">
              This function saves the NPC's memories to a file. The function will overwrite the contents of the file with the new memories. The function will also write the memories as plain text to the file, so an appropriate file type (e.g., txt) should be used.
            </p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">FilePath</code>: The full file path to the memories file.
              </li>
            </ul>
          </div>
            </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">SetCustomMoveFunction</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">void SetCustomMoveFunction(TFunction{'<'}void(const FString){'>'} MoveFunction)</code>
            </p>
            <p className="mb-4">
              This function defines the particular move function that the BaseNPCController should use when instructing the controlled NPC to move towards a conversation partner when starting a conversation. The move function provided could be the same function that was registered as an NPC action, or it could be a separate function. If a custom move function is not specified through this function, the BaseNPCController will just default to Unreal Engine's MoveToActor function.
            </p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">MoveFunction</code>: The callable for the move function to use when instructing an NPC to move towards a conversation partner. The move function should have a void return and accept a const FString parameter representing the full name of the intended conversation partner.
              </li>
            </ul>
            <p className="mb-4"></p>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">void SetCustomMoveFunction(UserClass* Instance, void (UserClass::* MoveFunction)(const FString))</code>
            </p>
            <p className="mb-4">
              The overloaded version of SetCustomMoveFunction defined for accepting a specific function address.
            </p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">Instance</code>: The class instance to call the move function on.
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">MoveFunction</code>: The function address with a void return type and a const FString parameter representing the move function.
              </li>
            </ul>
          </div>
            </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">FindLocation</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">bool FindLocation(FName LocationName, FTransform& OutTransform)</code>
              </p>
              <p className="mb-4">
                This function searches for a specific location in the NPC's memory. If found, it sets the OutTransform parameter with the transform of the requested location and returns true. If the location is not found in the NPC's memory, it returns false and OutTransform remains unchanged.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">LocationName</code>: The full name of the location to find.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">OutTransform</code>: Output parameter that will be set to the transform of the location if found.
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>True if the location was found in the NPC's memory; false otherwise.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">FindCharacter</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">ABaseCharacter* FindCharacter(FName CharacterName)</code>
            </p>
            <p className="mb-4">
              This function returns a reference to the BaseCharacter instance for a specific character.
            </p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">CharacterName</code>: The full name of the character to find.
              </li>
            </ul>
          </div>
            </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">UpdatePerception</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">void UpdatePerception(const TArray{'<'}AActor*{'>&'} PerceivedActors)</code>
              </p>
              <p className="mb-4">
                This function updates the actors that the NPC is currently perceiving. The function should be called whenever the perception mechanism being used detects a perception update which changes the set of actors currently being perceived.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">PerceivedActors</code>: The list of actors currently being perceived by the NPC. This list should only include the actors that are currently being perceived and NOT all actors that had a perception update, i.e. actors that are now no longer perceived should not be included in this list.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
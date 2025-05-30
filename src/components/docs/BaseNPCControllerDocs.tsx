import React from 'react';

export default function BaseNPCControllerDocs() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6">BaseNPCController</h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          The base controller class for NPCs. This class extends Unreal Engine's AAIController class and is meant to handle all the AI-related functionality for NPCs, including task generation, action execution, perception processing, and behavior coordination. Custom NPC controller classes are meant to extend this class.
        </p>
        <p>Some miscellaneous items to note about BaseNPCController:</p>
        <ul className="list-disc list-inside pl-4 space-y-2">
          <li>When the BaseNPCController instructs a controlled NPC to enter a conversation, the controller will cause the NPC's movement speed to temporarily increase until they reach their intended conversation target. This is so the NPC doesn't follow the target for an unnaturally long time when trying to start a conversation with them.</li>
          <li>The BaseNPCController, and the plugin more generally, doesn't enforce or provide any specific perception method, so users need to define the perception method, such as overlap events or Unreal Engine's AI perception components.</li>
        </ul>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Functions</h3>
        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">RegisterNPCAction</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">void RegisterNPCAction(const FString& ActionName, const FString& ActionDescription, UserClass* Instance, void (UserClass::* InAction)())</code>
            </p>
            <p className="mb-4">
              This function notifies the BaseNPCController of an action that the possessed NPC is able to execute. Each BaseNPCController instance will have a separate registered actions list, so each NPC can have their own set of allowed actions. The function should be called before any behavior is generated for the possessed NPC, e.g., in the BeginPlay or OnPossess function. If the set of actions for an NPC was defined using the ActionLibrary field of a BaseNPC, one approach can be to loop through that list and call this function on each element with the corresponding parameters to register all of an NPC's associated actions.
            </p>
            <p className="mb-4">
              <strong>Note:</strong> the BaseNPCController comes with a pre-registered action for handling conversations. This means users should NOT register their own conversing/talking action.
            </p>
            <p className="mb-4">The following is an example invocation for registering an NPC action for eating:</p>
            <p className="mb-4"><code className="bg-slate-800/50 px-2 py-1 rounded">RegisterNPCAction(TEXT("eat"), TEXT("Eat some food"), ControlledNPC, &ATestNPC::Eat)</code></p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">ActionName</code>: A text name for the action, which can be anything since it will mostly just be used for ease of reference.
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">ActionDescription</code>: A text description of the action's purpose. This will be what the AI uses to determine if an action is appropriate for a particular task.
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">Instance</code>: The class instance to call the action function on.
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">InAction</code>: The function address (with a void return type and no parameters) of the action function.
              </li>
            </ul>
            <p className="mb-4"></p>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">void RegisterNPCAction(const FString& ActionName, const FString& ActionDescription, const FString& ParameterName, const FString& ParameterDescription, UserClass* Instance, void (UserClass::* InAction)(const FString))</code>
            </p>
            <p className="mb-4">
              The overloaded version of RegisterNPCAction defined for accepting functions that take a FString parameter.
            </p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">ActionName</code>: A text name for the action, which can be anything since it will mostly just be used for ease of reference.
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">ActionDescription</code>: A text description of the action's purpose. This will be what a language model uses to determine if an action is appropriate for a particular task.
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">ParameterName</code>: A text name for the action function's parameter, which can be anything since it will mostly just be used for ease of reference.
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">ParameterDescription</code>: A text description of the parameter's purpose. This will be what a language model uses to determine what parameter value to pass to a particular call of the action function.
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">Instance</code>: The class instance to call the action function on.
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">InAction</code>: The function address (with a void return type and a const FString parameter) of the action function.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">FinishNPCAction</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">void FinishNPCAction()</code>
            </p>
            <p className="mb-4">
              This function is called at the end of an NPC action to indicate when the NPC action is finished and that the NPC should proceed onto executing the next action or task. This function is blueprint callable so it can be called either from C++ or blueprint.
            </p>
            <p className="mb-4">
              For example, if a C++ function is defined for some NPC action, then at the end of that function, the FinishNPCAction() function can be called. As a second example, if a walking action is defined with a MoveToActor or MoveToLocation function call, the FinishNPCAction() function can be called in an overridden OnMoveCompleted() function. As a third example, if an NPC action is defined as an animation montage, then the FinishNPCAction() function can be called via a notify at the end of the montage. 
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">StartNPCTask</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">void StartNPCTask()</code>
            </p>
            <p className="mb-4">
              This function starts the NPC behavior generation. Once called, the BaseNPCController will generate a task for the controlled NPC to complete (based on the various specifications, such as its background, its goals, relationships, etc.). After determining the task, the BaseNPCController will also determine the appropriate sequence of actions for the controlled NPC to execute to complete that task, using the set of registered actions. The BaseNPCController will also automatically instruct the controlled NPC to execute the sequence of actions. Once all actions in that sequence are executed, the next task will automatically be generated, starting the process anew.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">InsertNPCAction</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">void InsertNPCAction(const FString& ActionName)</code>
            </p>
            <p className="mb-4">
              This function inserts an NPC action into the current NPC action sequence. This function is meant to provide an easy way to insert actions that must occur prior to another. For example, if an NPC is required to stand before any move action, this function can be used to insert a stand action before any move action. When this function is called, the BaseNPCController will handle the logic for correctly inserting the new action into the action sequence before continuing with the original action sequence to complete the current task.
            </p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">ActionName</code>: The text name of the action to insert – must match the ActionName for one of the registered actions.
              </li>
            </ul>
          </div>

          <div>
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

          <div>
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

          <div>
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

          <div>
            <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">FindLocation</code>
            </h4>
            <p className="mb-4">
              <code className="bg-slate-800/50 px-2 py-1 rounded">UEnvironmentComponent* FindLocation(FName LocationName)</code>
            </p>
            <p className="mb-4">
              This function returns the environment component instance for a specific location.
            </p>
            <h5 className="text-white font-medium mb-2">Parameters:</h5>
            <ul className="list-none space-y-2">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">LocationName</code>: The full name of the location to find.
              </li>
            </ul>
          </div>

          <div>
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

          <div>
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
  );
}
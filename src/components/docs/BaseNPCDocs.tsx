import React from 'react';

export default function BaseNPCDocs() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">BaseNPC</h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          The base class for all NPCs. This class extends the <code className="bg-white/20 px-2 py-1 rounded">BaseCharacter</code> class. Custom NPC classes are meant to extend this class.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Fields</h3>
        <div className="space-y-4">
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">bool bNPCEnabled</code>
            <p className="mt-2">A flag to control whether the NPC should execute autonomously, i.e., generate and perform their own tasks. This is meant to be an easy on-off switch. If disabled, the NPC will not start thinking or acting. Note that this flag does not disable conversation, so even if the flag is disabled, NPCs will still engage in and initiate conversations.</p>
          </div>
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">bool bLogTasks</code>
            <p className="mt-2">A flag to control whether to log the thinking process of the NPC. Enabling this flag will cause the NPC to log the entirety of its thinking process including high-level daily plans, intermediate plan item expansions, and decomposed action sequences. The logging is very verbose and is recommended only for debugging a single or small handful of NPCs at a time.</p>
          </div>
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">FString Background</code>
            <p className="mt-2">The background description for the NPC, which might include things like their origin, personality, motivation, quirks, etc. The background is the primary component that will be used to generate an NPC's tasks and thus their overall behavior. This field will eventually be updated dynamically as the NPC interacts with the world but is currently still static.</p>
          </div>
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">FString ShortTermGoal</code>
            <p className="mt-2">The NPC's short-term goal that will influence the general direction of their short-term tasks. This field will eventually be updated dynamically as the NPC interacts with the world but is currently still static.</p>
          </div>
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">FString SelfAssessment</code>
            <p className="mt-2">The NPC's current self-assessment about their overall situation (such as their life, a particular goal, a relationship, a combination of them, etc.) which will also influence their overall behavior. This field will eventually be updated dynamically as the NPC interacts with the world but is currently still static.</p>
          </div>
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">TMap{'<'}FName, FString{'>'} Relationships</code>
            <p className="mt-2">A map for the relationships that an NPC has with other characters at the start of gameplay. The keys are the full name of a character (e.g., Alice Smith) and the corresponding value being the full text description about the NPC's relationship with that character, which might include the nature of the relationship, the NPC's attitude toward that character, any relevant history, any outstanding commitments, etc. Note that this map is just meant to pre-populate an NPC's relationships for the beginning of play – the NPC's relationships will be actively tracked by the NPC's controller and dynamically updated throughout play.</p>
          </div>
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">TArray{'<'}AWorldActor*{'>'} KnownActorsAndLocations</code>
            <p className="mt-2">A list of <code className="bg-white/20 px-2 py-1 rounded">WorldActor</code> references intended to represent the objects and locations that an NPC should be aware of at the start of play. This field is currently only intended to be prepopulated with locations, e.g., homes, stores, workplaces, etc. <code className="bg-white/20 px-2 py-1 rounded">WorldActor</code> references added to this list can include any number of <code className="bg-white/20 px-2 py-1 rounded">EnvironmentComponent</code> instances, and the plugin will handle parsing so the NPC is aware of all the different physical locations.</p>
          </div>
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">TArray{'<'}FString{'>'} ActionLibrary</code>
            <p className="mt-2">A list of the names of the actions that the NPC has access to and should use to complete a particular task. The specific names used for each action here is not of much importance to the plugin and is mainly provided as a way to specify an NPC's allowed actions from the editor. This field can be ignored if an NPC's action library is specified directly via code in the corresponding controller class.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Functions</h3>
        <div className="space-y-8">
          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">FString GetCharacterBackground()</code>
              <p className="mt-2">Returns the NPC's background.</p>
            </div>
          </div>
          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">FString GetShortTermGoal()</code>
              <p className="mt-2">Returns the NPC's short-term goal.</p>
            </div>
          </div>
          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">FString GetSelfAssessment()</code>
              <p className="mt-2">Returns the NPC's current self-assessment.</p>
            </div>
          </div>
          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <code className="bg-white/20 px-2 py-1 rounded">TArray{'<'}FString{'>'} GetActionLibrary()</code>
              <p className="mt-2">Returns the names of the actions that the NPC has access to.</p>
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
                This function is used when a player character attempts to initiate a conversation with the NPC. It returns whether the NPC accepted the conversation request. If the function returns true, it will also safely pause NPC execution so they don't walk away as a player character types the opening conversation message. Player characters should call this function first when trying to engage an NPC in conversation, and only start sending messages if the request is accepted.
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
        </div>
      </div>
    </>
  );
}
import React from 'react';

export default function BaseCharacterDocs() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">BaseCharacter</h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          This is the base class for all characters. <code className="bg-white/20 px-2 py-1 rounded">BaseCharacter</code> extends Unreal Engine's Character class and is meant to take the place of the Character class. Both player character classes and NPC classes are meant to extend this class, with the former directly extending this class and the latter through the <code className="bg-white/20 px-2 py-1 rounded">BaseNPC</code> class.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Fields</h3>
        <div className="space-y-4">
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">FName CharacterName</code>
            <p className="mt-2">The full name for the character.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Functions</h3>
        <div className="space-y-8">
          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">ReceiveMessage</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual void ReceiveMessage(FString Message, ABaseCharacter* Sender)</code>
              </p>
              <p className="mb-4">
                This function determines how a conversation message from the Sender should be handled by this character. Calling this function on the intended recipient character is also how conversation messages are sent to a recipient. For example, a player character can execute the following to send a conversation message to a recipient NPC:
              </p>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">RecipientNPC{'-'}{'>'}ReceiveMessage(TEXT("Hello"), this);</code>
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Message</code>: The conversation message that was received.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Sender</code>: The character that sent the conversation message.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">FinishConvo</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual void FinishConvo()</code>
              </p>
              <p className="mb-4">
                This function is called when a character finishes a conversation to perform any wrap-up operations. An NPC will determine when it has finished a conversation and will call this function accordingly. This function can be overridden to handle any changes that should happen when a character finishes a conversation, such as any changes to state variables or changes to animations.
              </p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">UpdateDescription</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual void UpdateDescription(FString NewDescription, EDescriptionUpdateKind Kind = EDescriptionUpdateKind::Significant)</code>
              </p>
              <p className="mb-4">
                This function updates the text description regarding the current state of the character. The text description reflects the latest information that an NPC should obtain about the current character when the former perceives the current character. This function should be called whenever a change to the current character should be perceivable to other NPCs.
              </p>
              <p className="mb-4">
                The Kind parameter determines how the update is handled:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">EDescriptionUpdateKind::Significant</code>: For character updates that are likely to influence other NPCs' behavior, memory, conversations, etc. These updates are broadcast to all NPCs currently perceiving the character.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">EDescriptionUpdateKind::Mundane</code>: For small state changes (e.g., walking, standing up, sitting down) that should be observable but aren't likely to influence other NPCs' behavior. These updates are not broadcast.
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">NewDescription</code>: The new text description for the current character.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Kind</code>: The kind of update (Significant or Mundane). Defaults to Significant.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">OnConversationUnavailable</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual void OnConversationUnavailable(ABaseCharacter* IntendedConvoTarget)</code>
              </p>
              <p className="mb-4">
                This is a system-level hook that is called when the IntendedConvoTarget is unavailable for a conversation, such as when they are already in another conversation. This function replaces the old conversation unavailable notification method of an empty string. The default implementation is a no-op, but this function can be overridden to handle processing when a conversation request is rejected.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">IntendedConvoTarget</code>: The character that was unavailable for conversation.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">IsInConvo</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">bool IsInConvo()</code>
              </p>
              <p className="mb-4">
                Returns a flag indicating whether the character is currently in a conversation.
              </p>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>True if the character is currently in a conversation, false otherwise.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">GetCharacterDescription</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">FString GetCharacterDescription()</code>
              </p>
              <p className="mb-4">
                Returns the current text description of the character.
              </p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">GetCharacterName</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">FName GetCharacterName()</code>
              </p>
              <p className="mb-4">
                Returns the name of the character.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
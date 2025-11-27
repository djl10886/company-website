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
                <code className="bg-white/20 px-2 py-1 rounded">TryStartConvo</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual bool TryStartConvo(ABaseCharacter* Target)</code>
              </p>
              <p className="mb-4">
                This function is used by the current character to try and start a conversation with the Target character. The function returns true if a conversation can be started, and false if not. Conversations are currently limited to be one-to-one, so the return of this function essentially indicates whether both the current character and Target character are currently available to start a conversation with each other. This function can be overridden to handle how various aspects of a character should change if it starts a conversation, such as any changes to state variables or changes to animations.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Target</code>: The character that the current character will try and start a conversation with.
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>True if the current character and Target character can start a conversation; false otherwise.</p>
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
                <code className="bg-slate-800/50 px-2 py-1 rounded">void UpdateDescription(FString NewDescription)</code>
              </p>
              <p className="mb-4">
                This function updates the text description regarding the current state of the character. The text description reflects the latest information that an NPC should obtain about the current character when the former perceives the current character. This function should be called whenever a change to the current character should be perceivable to other NPCs. For example, if there is a function for when a character starts reading, then this function can be called in the reading function with the parameter "Alice is reading a book", which would allow an NPC to obtain that information when it perceives the character. Additionally, the character's new text description will be broadcast to all NPCs currently perceiving the current character.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">NewDescription</code>: The new text description for the current character.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">SilentUpdateDescription</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">void SilentUpdateDescription(FString NewDescription)</code>
              </p>
              <p className="mb-4">
                This function also updates the text description for a character, but unlike UpdateDescription, does not immediately broadcast the updated description to any NPCs currently perceiving the character. This function is meant for more inconsequential updates to a character's description, or description changes that wouldn't be likely to elicit an immediate response from NPCs that are perceiving the character, such as changing between walking/running or standing/sitting.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">NewDescription</code>: The new text description for the current character.
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
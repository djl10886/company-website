import React from 'react';

export default function EnvironmentComponentDocs() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6">EnvironmentComponent</h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          A component class that represents a physical location in the game world that NPCs can interact with. This class extends Unreal Engine's UBoxComponent class and is meant to be attached to WorldActor instances to define specific locations within those actors that NPCs can be aware of and interact with.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Fields</h3>
        <div className="space-y-4">
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">FName ComponentName</code>
            <p className="mt-2">The complete name of a particular location in the world. The name should be somewhat descriptive to provide some context about its purpose. Examples: Alice’s house – living room, Bob’s hut – bedroom, Charlie’s house – kitchen.</p>
          </div>
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">EAccessLevel ComponentAccessLevel</code>
            <p className="mt-2">An enum indicating the accessibility level of a particular location. "Public" accessibility is meant to represent that the location is open to any character, while "Private" accessibility is meant to represent the location is private to the owner of the WorldActor that the EnvironmentComponent is part of.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Example Usage</h3>
        <div className="bg-slate-800/50 p-6 rounded-lg">
          <p className="mb-4">Add an EnvironmentComponent for "Alice’s house – living room" to a WorldActor blueprint for Alice's house with the "Private" accessibility access level, indicating the location to be private to Alice.</p>
          <p className="mb-4">Alternatively, add an EnvironmentComponent for "Grocery store – checkout counter" to a WorldActor blueprint for a grocery store with the "Public" accessibility access level, indicating the location is open to any character.</p>
        </div>
      </div>
    </div>
  );
}
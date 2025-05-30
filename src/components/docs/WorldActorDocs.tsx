import React from 'react';

export default function WorldActorDocs() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6">WorldActor</h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          The base class that represents all objects and locations in the game world that NPCs can interact with. This class extends Unreal Engine's AActor class and is meant to provide a way to define physical locations and objects that NPCs can be aware of and interact with. Custom object and location classes are meant to extend this class.
        </p>
        <p>
          In the future, this class is intended to manage its own state information such that when instances are perceived by an NPC, it will provide the NPC necessary/relevant information about the object represented by the class instance. For example, a house in the world could be an instance of a WorldActor, and if the house gets set on fire, that information is stored in the instance and provided to an NPC when perceived by that NPC.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Fields</h3>
        <div className="space-y-4">
          <div>
            <code className="bg-white/20 px-2 py-1 rounded">FName WorldActorOwner</code>
            <p className="mt-2">The full name of the owner of this WorldActor, which will likely be a character's name. Note that this name needs to exactly match that of a character for NPCs to recognize the ownership. The field can be left blank if the WorldActor has no owner.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Example Usage</h3>
        <div className="bg-slate-800/50 p-6 rounded-lg">
          <p className="mb-4">Create a blueprint subclass of WorldActor to represent a house in the world:</p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Create a new Blueprint class and choose WorldActor as the parent class</li>
            <li>Name it appropriately (e.g., BP_House)</li>
            <li>Set the WorldActorOwner field to match the name of the character who owns the house</li>
            <li>Add EnvironmentComponent instances to define specific locations within the house (e.g., kitchen, bedroom)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
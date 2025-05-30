import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FrameworkDocsNavigation from '../../../components/FrameworkDocsNavigation';

export default function Introduction() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="top" className="pt-16">
      <FrameworkDocsNavigation />
      <div className="ml-64">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Framework Documentation
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <div className="space-y-6 text-left">
              <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                This documentation aims to provide a conceptual overview of the RealisticNPCs framework.
              </p>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                The RealisticNPCs framework provides a flexible foundation for creating intelligent NPCs using language models. It handles the complexities of NPC behavior generation, decision-making, and dynamic responses while remaining model-agnostic and highly customizable. The framework can run entirely locally, ensuring data privacy and giving developers complete control over their implementation. It's also designed to be platform-independent so it can be integrated into any game engine.
              </p>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                The RealisticNPCs framework enables lifelike, AI-driven NPC behavior using a task-based planning system backed by large language models. NPCs autonomously generate goals, plan high-level tasks, decompose those tasks into game actions, and adjust behavior dynamically based on perception, memory, and relationships. This framework draws inspiration from this <a href="https://dl.acm.org/doi/pdf/10.1145/3586183.3606763" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">interactive simulacra</a> research paper. Consider taking a look through the paper, but this documentation can still be understood without reading the paper.
              </p>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                Note that the framework is still in its early stages, so there may be major changes without advanced warning. An implementation of the framework will soon be available as an <Link to="/docs/unrealengine" className="text-blue-400 hover:text-blue-300 transition-colors">Unreal Engine plugin</Link>. Unity and Godot plugins will also be available in the future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect } from 'react';
import FrameworkDocsNavigation from '../../../components/FrameworkDocsNavigation';

export default function Terminology() {
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
      <FrameworkDocsNavigation />
      <div className="relative ml-64">
        <div className="mx-auto px-[8%] py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terminology
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <div className="space-y-6 text-left">
              <p className="text-gray-300 text-xl">
                In this framework, NPCs will be described in relation to both <strong><em>tasks</em></strong> and <strong><em>actions</em></strong>. A <strong><em>task</em></strong> refers to a self-contained, high-level activity, such as preparing a meal, going to work, or exploring a marketplace. Tasks are typically broad in scope, meaningful on their own, and may consist of multiple smaller steps.
              </p>
              <p className="text-gray-300 text-xl">
                An <strong><em>action</em></strong> refers to a discrete, low-level operation or physical behavior that contributes toward the completion of a larger task and directly results in observable or functional changes within the game. Actions are the executable units of behavior—such as walking to the kitchen, picking up an object, or playing an animation—and are typically executed sequentially or conditionally as part of a broader task.
              </p>
              <p className="text-gray-300 text-xl">
                NPC <strong><em>behavior</em></strong> refers to the overall pattern of activity exhibited by an NPC as a result of the tasks it selects and the actions it executes. Behavior represents the NPC's broader decision-making and execution flow, shaped by its goals, memory, perception, and environment. While individual tasks define what an NPC intends to do, and actions define how those tasks are carried out, behavior captures the coherent flow of these elements over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
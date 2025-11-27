import React, { useEffect, useState } from 'react';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';
import { Copy, Check } from 'lucide-react';

const minimalConfig = `{
  "services": [
    {
      "service": "openai",
      "endpoint": "https://api.openai.com/v1/chat/completions",
      "APIKey": "your-api-key-here"
    }
  ],
  "default_heavy_target": {
    "service": "openai",
    "model": "gpt-4o"
  },
  "default_light_target": {
    "service": "openai",
    "model": "gpt-4o-mini"
  }
}`;

const fullConfig = `{
  "services": [
    {
      "service": "openai",
      "endpoint": "https://api.openai.com/v1/chat/completions",
      "APIKey": "your-api-key-here"
    }
  ],
  "default_heavy_target": {
    "service": "openai",
    "model": "gpt-4o"
  },
  "default_light_target": {
    "service": "openai",
    "model": "gpt-4o-mini"
  },
  "generate_task_target": {
    "service": "openai",
    "model": "gpt-4o"
  },
  "task_to_actions_target": {
    "service": "openai",
    "model": "gpt-4o"
  },
  "decide_enter_convo_target": {
    "service": "openai",
    "model": "gpt-4o-mini"
  },
  "decide_convo_partner_target": {
    "service": "openai",
    "model": "gpt-4o-mini"
  },
  "generate_convo_message_target": {
    "service": "openai",
    "model": "gpt-4o"
  },
  "retrieve_memories_target": {
    "service": "openai",
    "model": "gpt-4o"
  },
  "retrieve_relationships_target": {
    "service": "openai",
    "model": "gpt-4o-mini"
  },
  "filter_memories_target": {
    "service": "openai",
    "model": "gpt-4o"
  },
  "reflect_target": {
    "service": "openai",
    "model": "gpt-4o-mini"
  }
}`;

const worldDescriptionExample = `Aeldenvale is a land of untamed wilderness, where civilizations cling to ancient traditions and fragile alliances. Feudal lords rule fractured kingdoms, their power barely extending beyond the trade roads. The Old Ways, tied to nature and ancient deities, clash with the Church of the Eternal Flame, which seeks to unify the people under one faith. Rural villages uphold ancient customs, while cities embrace the Church's vision of progress.

Thornwharf, a hamlet on the River Wold, houses about a hundred souls in timber cottages amid fields and ancient woods. The self-sufficient village revolves around shared traditions, agrarian life, and reverence for the land. The villagers follow the Old Ways, leaving offerings to honor spirits of harvest and hearth, and speak in a lilting dialect filled with agrarian proverbs. Children learn skills like plowing and weaving through imitation.`;

export default function Configuration() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [copiedMinimal, setCopiedMinimal] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedWorldDesc, setCopiedWorldDesc] = useState(false);

  const handleCopyMinimal = async () => {
    try {
      await navigator.clipboard.writeText(minimalConfig);
      setCopiedMinimal(true);
      setTimeout(() => setCopiedMinimal(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCopyFull = async () => {
    try {
      await navigator.clipboard.writeText(fullConfig);
      setCopiedFull(true);
      setTimeout(() => setCopiedFull(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCopyWorldDesc = async () => {
    try {
      await navigator.clipboard.writeText(worldDescriptionExample);
      setCopiedWorldDesc(true);
      setTimeout(() => setCopiedWorldDesc(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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
              Configuration
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          <div className="space-y-20">
            <div id="overview" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  The plugin is configured through <strong>Project Settings → RealisticNPCs</strong>. All configuration is centralized in Project Settings and loaded automatically on startup.
                </p>
                <p className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-blue-200">
                  <strong>Note:</strong> The plugin automatically loads all configurations on startup. No manual loading code is required.
                </p>
              </div>
            </div>

            <div id="project-settings" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Project Settings Configuration</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Open <strong>Project Settings → RealisticNPCs</strong> to access the following configuration options:
                </p>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">LLM Configuration Path</h3>
                <p>
                  Set the path to your <code className="bg-white/20 px-2 py-1 rounded">RealisticNPCsConfig.json</code> file, which specifies language model settings. Create this file in your project's <code className="bg-white/20 px-2 py-1 rounded">Config</code> folder and provide the path in Project Settings.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  See the <a href="#llm-configuration" className="text-blue-400 hover:text-blue-300 transition-colors">LLM Configuration section</a> below for details on the configuration file format.
                </p>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">World Description</h3>
                <p>
                  Provide your game world's description using one of two methods:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>
                    <strong>InlineWorldDescription</strong> - Enter the description directly in the Project Settings text field. This is convenient for shorter descriptions or quick prototyping.
                  </li>
                  <li>
                    <strong>WorldDescriptionFilePath</strong> - Set a path to a text file containing the description. This is better for longer, more detailed descriptions.
                  </li>
                </ul>
                <p className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-yellow-200">
                  <strong>Priority:</strong> If <code className="bg-white/20 px-2 py-1 rounded">InlineWorldDescription</code> is non-empty, it will always take precedence over the file path, even if a file path is also provided.
                </p>
                <p className="mt-4">
                  Your world description should include:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Setting and time period</li>
                  <li>Cultural norms and customs</li>
                  <li>Economic systems</li>
                  <li>Technology level</li>
                  <li>Important rules or constraints</li>
                </ul>

                <h4 className="text-xl font-semibold text-white mt-8 mb-4">Example World Description</h4>
                <p className="mb-4">
                  The following is a sample world description file. Although more detailed descriptions lead to more contextually accurate NPC behavior, note that this description will be used frequently, affecting both inference time and costs. Initial tests found that a world description around 6-7 sentences can be sufficient for NPCs to maintain proper context.
                </p>
                <div className="relative">
                  <button
                    onClick={handleCopyWorldDesc}
                    className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors z-10"
                    title="Copy world description example"
                  >
                    {copiedWorldDesc ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-300" />}
                  </button>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap">{worldDescriptionExample}</pre>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Initial Game Start Time</h3>
                <p>
                  Set the in-game time when your game begins (e.g., Day 1, 8:00 AM). The plugin uses a global time system to ensure all NPCs maintain a unified sense of time throughout gameplay.
                </p>
                <p className="mt-4">
                  This setting controls:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>When NPCs begin their daily planning cycles</li>
                  <li>The initial timestamp for all NPC memories and events</li>
                  <li>The reference point for time-based NPC behaviors</li>
                </ul>
                <p className="mt-4 text-sm text-gray-400">
                  You can modify the in-game time at runtime using <code className="bg-white/20 px-2 py-1 rounded">RNPCsUtilities::SetGameWorldTime(...)</code>. NPCs will automatically observe the new time and update their behavior accordingly.
                </p>
              </div>
            </div>

            <div id="llm-configuration" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Language Model Configuration File</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  The <code className="bg-white/20 px-2 py-1 rounded">RealisticNPCsConfig.json</code> file specifies which language models to use for different operations.
                </p>
              </div>
            </div>

            <div id="minimal-config" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Minimal LLM Configuration</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  The minimum required configuration includes two default targets. Most users should start with this:
                </p>
                <div className="relative">
                  <button
                    onClick={handleCopyMinimal}
                    className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors z-10"
                    title="Copy minimal configuration"
                  >
                    {copiedMinimal ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-300" />}
                  </button>
                  <pre className="bg-slate-800/50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-gray-300">{minimalConfig}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div id="configuration-keys" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Configuration Keys</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Services</h3>
                <p>
                  <code className="bg-white/20 px-2 py-1 rounded">services</code> (required) - An array specifying language model providers and their API endpoints. Each service includes:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li><code className="bg-white/20 px-2 py-1 rounded">service</code> - A label for the provider (e.g., "openai", "claude"). Can be any name that helps you identify the provider.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">endpoint</code> - The API endpoint URL where inference requests are sent (e.g., "https://api.openai.com/v1/chat/completions").</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">APIKey</code> - The API key for authentication. Use an empty string ("") if no key is needed.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-white mt-12 mb-4">Required Inference Targets</h3>
                <p>
                  Each target specifies a <code className="bg-white/20 px-2 py-1 rounded">service</code> (matching one from the services array) and a <code className="bg-white/20 px-2 py-1 rounded">model</code> (exact model name from the provider).
                </p>
                <div className="space-y-4 mt-6">
                  <div>
                    <p className="font-semibold text-white">
                      <code className="bg-white/20 px-2 py-1 rounded">default_heavy_target</code> (required)
                    </p>
                    <p className="mt-2">
                      For expensive reasoning tasks including:
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                      <li>Daily plan generation</li>
                      <li>Plan item expansion</li>
                      <li>Action sequence decomposition</li>
                      <li>Conversation message generation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      <code className="bg-white/20 px-2 py-1 rounded">default_light_target</code> (required)
                    </p>
                    <p className="mt-2">
                      For cheaper tasks including:
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                      <li>Memory retrieval</li>
                      <li>Conversation summaries for memory storage</li>
                      <li>Various supporting operations</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-white mt-12 mb-4">Optional Inference Targets</h3>
                <p>
                  You can override specific operations by defining these optional targets. If not specified, they default to either <code className="bg-white/20 px-2 py-1 rounded">default_heavy_target</code> or <code className="bg-white/20 px-2 py-1 rounded">default_light_target</code> depending on the operation's complexity.
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2 mt-4">
                  <li><code className="bg-white/20 px-2 py-1 rounded">generate_task_target</code> - Generating the next high-level task that an NPC will perform</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">task_to_actions_target</code> - Converting a high-level task into a sequence of executable in-game actions</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">decide_enter_convo_target</code> - Deciding whether to start a conversation with another character</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">decide_convo_partner_target</code> - Deciding which character, from a group of characters, to start a conversation with</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">generate_convo_message_target</code> - Generating an NPC's next message in a conversation</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">retrieve_memories_target</code> - Retrieving an NPC's most relevant memories for a particular inference operation</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">retrieve_relationships_target</code> - Retrieving an NPC's most relevant relationships for a particular inference operation</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">filter_memories_target</code> - Filtering out an NPC's unimportant memories and consolidating the more important memories that will make it to their long-term memory</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">reflect_target</code> - When an NPC reflects on their experiences and memories to identify higher-level insights</li>
                </ul>
              </div>
            </div>

            <div id="full-example" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Full Configuration Example</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Here's an example with some optional targets specified:
                </p>
                <div className="relative">
                  <button
                    onClick={handleCopyFull}
                    className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors z-10"
                    title="Copy full configuration"
                  >
                    {copiedFull ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-300" />}
                  </button>
                  <pre className="bg-slate-800/50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-gray-300">{fullConfig}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
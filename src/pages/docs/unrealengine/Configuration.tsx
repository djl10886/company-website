import React, { useEffect, useState } from 'react';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';
import { Copy, Check } from 'lucide-react';

const sampleConfig = `{
  "services": [
    {
        "service": "openai",
        "endpoint": "https://api.openai.com/v1/chat/completions",
        "APIKey": "your API key"
    }
  ],
  "default_target": {
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

export default function Configuration() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sampleConfig);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div id="top" className="pt-16">
      <UnrealDocsNavigation />
      <div className="ml-64">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Configuration
            </h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Language Model Configuration File</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  The plugin requires a configuration file to specify which language model(s) to use. Create a file named <code className="bg-white/20 px-2 py-1 rounded">RealisticNPCsConfig.json</code> in your project's <code className="bg-white/20 px-2 py-1 rounded">Config</code> folder. The following is an example config file:
                </p>
                <div className="relative">
                  <button
                    onClick={handleCopy}
                    className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    title="Copy configuration"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-300" />}
                  </button>
                  <pre className="bg-slate-800/50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-gray-300">{sampleConfig}</code>
                  </pre>
                </div>
                <p>
                  The following describe the <code className="bg-white/20 px-2 py-1 rounded">RealisticNPCsConfig.json</code> file keys and their purpose:
                </p>
                <p>
                  <code className="bg-white/20 px-2 py-1 rounded">services</code> (required) - an array that specifies the different language model providers and their corresponding API endpoints. Each element corresponds to a different provider, which is identified with:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li><code className="bg-white/20 px-2 py-1 rounded">service</code>: the name of the provider, such as "openai", "claude", etc. This key can be anything that helps you identify which provider it is and doesn't need to match the official name of the actual provider, e.g., "openai", "Open AI", "OpenAI" are all fine.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">endpoint</code>: the API endpoint as a specific URL or URI where inference requests should be directed to, e.g., "https://api.openai.com/v1/chat/completions" for OpenAI.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">APIKey</code>: the API key for the service. If no API key is needed, the value for this config key can be kept as an empty string, i.e. "".</li>
                </ul>
                <p>
                  Various inference targets are used for different inference purposes. Each of the targets includes:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li><code className="bg-white/20 px-2 py-1 rounded">service</code>: the name of the service provider this target is associated with. This service name needs to match one of the service names from the <code className="bg-white/20 px-2 py-1 rounded">services</code> key.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">model</code>: the specific model from the specified service that will be the target of the request. This model name needs to match exactly with the provider's model name, e.g. "gpt-4o" for OpenAI, and not "gpt 4o" or "gpt4o".</li>
                </ul>
                <p>Inference targets:</p>
                <p><code className="bg-white/20 px-2 py-1 rounded">default_target</code> (required) - this is the default inference target that requests will be directed to. Various miscellaneous inference tasks will be directed to this inference target. Any optional inference target that is not specified will default to this target.</p>
                <p><code className="bg-white/20 px-2 py-1 rounded">generate_task_target</code> (optional) - this is the inference target for generating the next high-level task that an NPC will perform.</p>
                <p><code className="bg-white/20 px-2 py-1 rounded">task_to_actions_target</code> (optional) - this is the inference target for converting a high-level task into a sequence of executable in-game actions.</p>
                <p><code className="bg-white/20 px-2 py-1 rounded">decide_enter_convo_target</code> (optional) - this is the inference target for when an NPC is deciding whether to start a conversation with another character.</p>
                <p><code className="bg-white/20 px-2 py-1 rounded">decide_convo_partner_target</code> (optional) - this is the inference target for when an NPC is deciding which character, from a group of characters, they should start a conversation with.</p>
                <p><code className="bg-white/20 px-2 py-1 rounded">generate_convo_message_target</code> (optional) - this is the inference target for generating an NPC's next message in a conversation.</p>
                <p><code className="bg-white/20 px-2 py-1 rounded">retrieve_memories_target</code> (optional) - this is the inference target for retrieving an NPC's most relevant memories for a particular inference operation.</p>
                <p><code className="bg-white/20 px-2 py-1 rounded">retrieve_relationships_target</code> (optional) - this is the inference target for retrieving an NPC's most relevant relationships for a particular inference operation.</p>
                <p><code className="bg-white/20 px-2 py-1 rounded">filter_memories_target</code> (optional) - this is the inference target for filtering out an NPC's unimportant memories and consolidating the more important memories that will make it to their long-term memory.</p>
                <p><code className="bg-white/20 px-2 py-1 rounded">reflect_target</code> (optional) - this is the inference target for when an NPC reflects on their experiences and memories to identify higher-level insights.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
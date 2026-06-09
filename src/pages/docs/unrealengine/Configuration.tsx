import React, { useEffect, useState } from 'react';
import UnrealDocsNavigation from '../../../components/UnrealDocsNavigation';
import { Copy, Check } from 'lucide-react';

const minimalConfig = `{
  "services": [
    {
      "service": "openai",
      "endpoint": "https://api.openai.com/v1/chat/completions",
      "APIKey": "your-api-key-here"
    },
    {
      "service": "openai-embed",
      "endpoint": "https://api.openai.com/v1/embeddings",
      "APIKey": "your-api-key-here"
    }
  ],
  "default_heavy_target": {
    "service": "openai",
    "model": "gpt-5.4"
  },
  "default_light_target": {
    "service": "openai",
    "model": "gpt-5.4-mini"
  },
  "embed_target": {
    "service": "openai-embed",
    "model": "text-embedding-3-large"
  }
}`;

const optionalTargetsConfig = `{
  "agenda_generation_target": {
    "service": "openai",
    "model": "gpt-5.4"
  },
  "behavior_compile_target": {
    "service": "openai",
    "model": "gpt-5.4"
  },
  "conversation_reply_target": {
    "service": "openai",
    "model": "gpt-5.4"
  },
  "memory_reflection_target": {
    "service": "openai",
    "model": "gpt-5.4-mini"
  },
  "short_horizon_reasoning_target": {
    "service": "openai",
    "model": "gpt-5.4-mini"
  }
}`;

const qdrantConfig = `{
  "services": [
    {
      "service": "openai",
      "endpoint": "https://api.openai.com/v1/chat/completions",
      "APIKey": "your-api-key-here"
    },
    {
      "service": "openai-embed",
      "endpoint": "https://api.openai.com/v1/embeddings",
      "APIKey": "your-api-key-here"
    },
    {
      "service": "qdrant",
      "endpoint": "http://localhost:6333",
      "APIKey": ""
    }
  ],
  "default_heavy_target": {
    "service": "openai",
    "model": "gpt-5.4"
  },
  "default_light_target": {
    "service": "openai",
    "model": "gpt-5.4-mini"
  },
  "embed_target": {
    "service": "openai-embed",
    "model": "text-embedding-3-large"
  },
  "vector_store": {
    "service": "qdrant",
    "collection": "realistic_npcs"
  }
}`;

const worldDescriptionExample = `Aeldenvale is a rural fantasy frontier shaped by scattered villages, old forest roads, seasonal market days, and local customs around hospitality and shared labor. Most people travel by foot, cart, or horse, and news moves slowly unless carried by merchants, clergy, guards, or travelers.

Villagers value reputation, practical skill, family obligation, and visible contribution to the community. Outsiders are treated cautiously until someone local vouches for them. Most conflicts are handled informally unless they threaten land, livelihood, or public safety.`;

function CopyableCode({ text, title, wrap = false }: { text: string; title: string; wrap?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors z-10"
        title={title}
      >
        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-300" />}
      </button>
      <pre className={`bg-slate-800/50 p-4 rounded-lg ${wrap ? 'whitespace-pre-wrap break-words' : 'overflow-x-auto'}`}>
        <code className="text-sm text-gray-300">{text}</code>
      </pre>
    </div>
  );
}

export default function Configuration() {
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
                  RealisticNPCs configuration is split between Unreal Project Settings and a JSON language model configuration file. Project Settings control project-wide plugin behavior, while the JSON file tells the plugin which model endpoints to use for chat, reasoning, and embedding requests.
                </p>
                <p className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-blue-200">
                  The plugin loads configuration automatically when it is needed. No manual configuration loading code is required.
                </p>
              </div>
            </div>

            <div id="project-settings" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Project Settings</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Open <strong>Project Settings &gt; Plugins &gt; RealisticNPCs</strong> to configure the plugin-wide settings.
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500/50 pl-6">
                    <code className="bg-white/20 px-2 py-1 rounded">LLMConfigFile</code>
                    <p className="mt-2">
                      Optional path to the JSON language model configuration file. If left empty, the plugin looks for <code className="bg-white/20 px-2 py-1 rounded">Config/RealisticNPCsConfig.json</code> in the Unreal project. Relative paths are resolved from the project directory.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500/50 pl-6">
                    <code className="bg-white/20 px-2 py-1 rounded">InlineWorldDescription</code> and <code className="bg-white/20 px-2 py-1 rounded">WorldDescriptionFile</code>
                    <p className="mt-2">
                      Provide global world context for NPC reasoning. Inline text takes precedence over the file path when both are set.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500/50 pl-6">
                    <code className="bg-white/20 px-2 py-1 rounded">DefaultCalendar</code>, <code className="bg-white/20 px-2 py-1 rounded">bAutoApplyInitialTime</code>, and <code className="bg-white/20 px-2 py-1 rounded">InitialTime</code>
                    <p className="mt-2">
                      Configure the calendar asset and initial in-game time behavior. If saved world time exists, the plugin restores that persisted time first. If no persisted time is available and <code className="bg-white/20 px-2 py-1 rounded">bAutoApplyInitialTime</code> is enabled, the configured initial time is used.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500/50 pl-6">
                    <code className="bg-white/20 px-2 py-1 rounded">VectorStoreProvider</code>
                    <p className="mt-2">
                      Selects the vector memory backend. The default local SQLite backend works out of the box and does not need a <code className="bg-white/20 px-2 py-1 rounded">vector_store</code> block in the JSON file. Use Qdrant only when the project needs an external vector database.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500/50 pl-6">
                    <code className="bg-white/20 px-2 py-1 rounded">bResetPersistentStateOnStartup</code>
                    <p className="mt-2">
                      Development helper for clean-slate testing. When enabled, startup clears local plugin persistence, including saved world time, local vector memory, spatial memory, and queued local vector writes. It does not delete remote Qdrant collections.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="llm-configuration" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">LLM Configuration File</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  The JSON configuration file defines named services and model targets. A service is an endpoint plus optional API key. A target references a service by name and specifies the model to use for a particular category of request.
                </p>
                <p>
                  The <code className="bg-white/20 px-2 py-1 rounded">services</code> field may be written as an array or an object map. The array form is shown below because it is usually easiest to read.
                </p>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Configuration File Schema</h3>
                <p>
                  The top-level <code className="bg-white/20 px-2 py-1 rounded">services</code> entry is required. In array form, each service object must include:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li><code className="bg-white/20 px-2 py-1 rounded">service</code> - The service name that target entries will reference, such as <code className="bg-white/20 px-2 py-1 rounded">openai</code> or <code className="bg-white/20 px-2 py-1 rounded">openai-embed</code>.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">endpoint</code> - The provider endpoint used for requests sent through that service.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">APIKey</code> - Optional authentication value for the service. It can be omitted or left empty when the endpoint does not require a key.</li>
                </ul>
                <p>
                  In object-map form, the object key is the service name and the value contains the service fields. Service names must be unique.
                </p>
                <p>
                  Each model target is an object with <code className="bg-white/20 px-2 py-1 rounded">service</code> and <code className="bg-white/20 px-2 py-1 rounded">model</code>. The target's <code className="bg-white/20 px-2 py-1 rounded">service</code> must match one of the configured service names, and <code className="bg-white/20 px-2 py-1 rounded">model</code> should be the exact model identifier expected by that provider.
                </p>
                <p className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-yellow-200">
                  The plugin is currently tuned for low-latency, instant-response language models. Full reasoning models may work, but the behavior loop, conversations, and action cadence have not yet been tuned around longer reasoning latency, so NPC behavior may feel less smooth. For first-time setup and ordinary use, prefer responsive chat or completion models for the default and role-specific targets.
                </p>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Minimal Configuration</h3>
                <p>
                  The minimum configuration requires at least one chat service, one embedding service, heavy and light chat targets, and an embedding target. The embedding target is required even when using the default SQLite vector store, because semantic memory retrieval still needs embeddings. Do not add a <code className="bg-white/20 px-2 py-1 rounded">vector_store</code> block for the default SQLite setup.
                </p>
                <CopyableCode text={minimalConfig} title="Copy minimal configuration" />

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Required Targets</h3>
                <p>
                  These targets must be present and valid. If any required target is missing, lacks <code className="bg-white/20 px-2 py-1 rounded">service</code> or <code className="bg-white/20 px-2 py-1 rounded">model</code>, or references an unknown service, configuration loading fails.
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li><code className="bg-white/20 px-2 py-1 rounded">default_heavy_target</code> is the fallback for higher-reasoning requests.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">default_light_target</code> is the fallback for lighter supporting requests.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">embed_target</code> is used to generate embeddings for semantic memory retrieval.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Optional Role-Specific Targets</h3>
                <p>
                  Most projects can omit these at first. Add them when you want finer control over cost, latency, or model quality for a specific part of NPC behavior. Missing optional targets fall back to the heavy or light default depending on the request type. If an optional target is present but invalid, the plugin logs a warning and uses its fallback target.
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li><code className="bg-white/20 px-2 py-1 rounded">agenda_generation_target</code> controls model selection for high-level NPC agenda generation.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">behavior_compile_target</code> controls model selection for compiling behavior into executable policy steps.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">conversation_reply_target</code> controls model selection for NPC conversation replies.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">memory_reflection_target</code> controls model selection for memory reflection.</li>
                  <li><code className="bg-white/20 px-2 py-1 rounded">short_horizon_reasoning_target</code> controls model selection for short-horizon behavior reasoning.</li>
                </ul>
                <CopyableCode text={optionalTargetsConfig} title="Copy optional targets example" />
              </div>
            </div>

            <div id="vector-store" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Vector Store</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  The plugin uses local SQLite vector storage by default. This requires no <code className="bg-white/20 px-2 py-1 rounded">vector_store</code> block in the JSON file. Local vector data is saved under the project's Saved directory and uses the configured <code className="bg-white/20 px-2 py-1 rounded">embed_target</code> for semantic retrieval.
                </p>
                <p>
                  Only add <code className="bg-white/20 px-2 py-1 rounded">vector_store</code> for Qdrant, or for the advanced case where you intentionally want to override the local SQLite collection prefix. For a SQLite collection-prefix override, only set <code className="bg-white/20 px-2 py-1 rounded">collection</code>; do not include <code className="bg-white/20 px-2 py-1 rounded">service</code>, <code className="bg-white/20 px-2 py-1 rounded">endpoint</code>, or <code className="bg-white/20 px-2 py-1 rounded">APIKey</code>.
                </p>
                <p>
                  To use Qdrant, set <code className="bg-white/20 px-2 py-1 rounded">VectorStoreProvider</code> to <code className="bg-white/20 px-2 py-1 rounded">Qdrant (REST)</code> in Project Settings, then add a <code className="bg-white/20 px-2 py-1 rounded">vector_store</code> block with a collection and either a service reference or an inline endpoint. A service reference must match one of the configured service names.
                </p>
                <CopyableCode text={qdrantConfig} title="Copy Qdrant configuration" />
                <p>
                  If remote vector store fields are present while the provider is set to SQLite, the plugin ignores them and logs a warning. The startup reset setting only clears local persistence; it does not delete remote Qdrant collections.
                </p>
              </div>
            </div>

            <div id="world-description" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">World Description</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Provide the world description either in <code className="bg-white/20 px-2 py-1 rounded">InlineWorldDescription</code> or through <code className="bg-white/20 px-2 py-1 rounded">WorldDescriptionFile</code>. Inline text is convenient for shorter descriptions and quick iteration. A file is usually better for longer descriptions that you want to maintain outside Project Settings.
                </p>
                <p className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-yellow-200">
                  If <code className="bg-white/20 px-2 py-1 rounded">InlineWorldDescription</code> is non-empty, it takes precedence over <code className="bg-white/20 px-2 py-1 rounded">WorldDescriptionFile</code>.
                </p>
                <p>
                  The world description should describe global context that applies broadly across NPCs: setting, culture, technology level, social rules, major institutions, and constraints NPCs should respect. It should not duplicate individual NPC biographies, starting relationships, or place-specific details that belong in NPC profiles or spatial authoring.
                </p>
                <p>
                  Keep it concise enough to be used frequently in prompts. Include details that materially affect NPC reasoning, such as setting and time period, cultural norms, economic or political constraints, technology level, and important world rules.
                </p>
                <CopyableCode text={worldDescriptionExample} title="Copy world description example" wrap />
              </div>
            </div>

            <div id="time-and-persistence" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Time and Persistence</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  The game time subsystem uses the configured calendar and persists the current world time locally. This lets play tests continue from the previous in-game time instead of always restarting at the configured initial time.
                </p>
                <p>
                  When no persisted world time exists and <code className="bg-white/20 px-2 py-1 rounded">bAutoApplyInitialTime</code> is enabled, the configured <code className="bg-white/20 px-2 py-1 rounded">InitialTime</code> is the starting reference point for NPC memory timestamps, event timing, and time-aware behavior.
                </p>
                <p>
                  Use <code className="bg-white/20 px-2 py-1 rounded">RNPCsUtilities::SetGameWorldTime(...)</code> when gameplay needs to set the world time explicitly. When you need a fresh run during development, enable <code className="bg-white/20 px-2 py-1 rounded">bResetPersistentStateOnStartup</code>, start the game once, then disable it again when you want continuity to resume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

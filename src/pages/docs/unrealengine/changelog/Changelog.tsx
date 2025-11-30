import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { releases } from './releases';

export default function Changelog() {
  return (
    <div className="relative min-h-screen pt-16">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="fixed inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }}></div>

      <div className="relative px-6 py-32">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/docs/unrealengine/introduction"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to UE Plugin Docs
          </Link>

          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Changelog
            </h1>
            <p className="text-xl text-gray-400">
              Track the full update history
            </p>
          </div>

          {/* Release List */}
          <div className="space-y-6">
            {releases.map((release) => (
              <Link
                key={release.version}
                to={`/docs/unrealengine/changelog/${release.version}`}
                className="block bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-white">{release.version}</span>
                  <span className="text-gray-400">{release.date}</span>
                </div>
                <p className="text-gray-300 text-lg mb-6">{release.summary}</p>
                <div className="space-y-2">
                  {release.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      <span className="text-gray-400">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

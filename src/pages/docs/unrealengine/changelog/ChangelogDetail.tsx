import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { releases } from './releases';

export default function ChangelogDetail() {
  const { version } = useParams<{ version: string }>();

  const release = releases.find(r => r.version === version);

  if (!release) {
    return (
      <div className="relative min-h-screen pt-16">
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="fixed inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>

        <div className="relative px-6 py-32">
          <div className="max-w-5xl mx-auto">
            <p className="text-white text-xl">Release not found</p>
            <Link to="/changelog" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
              Back to Changelog
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            to="/changelog"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Changelog
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">{release.version}</h1>
              <span className="text-gray-500">•</span>
              <span className="text-xl text-gray-400">{release.date}</span>
            </div>
          </div>

          {release.content}
        </div>
      </div>
    </div>
  );
}

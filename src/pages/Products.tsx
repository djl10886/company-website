import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

export default function Products() {
  return (
    <div className="relative py-24 px-6 site-bg">
      {/* Background orb */}
      <div
        className="orb absolute w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs text-cyan-400 font-semibold tracking-widest uppercase">Plugin Demo</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">See it in action</h2>
          <p className="text-gray-400 max-w-2xl">
            A prototype of our humanlike NPC framework is available as an Unreal Engine plugin.
            Watch the demo below, then check the{' '}
            <Link to="/docs/unrealengine" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              plugin documentation
            </Link>{' '}
            to get started.
          </p>
        </div>

        {/* Video */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 60px rgba(6,182,212,0.08)' }}
        >
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src="https://www.youtube.com/embed/ANQRXpAMjt4"
              title="Clankr Intelligence — NPC Demo"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* CTA row below video */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/docs/unrealengine/quickstart"
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
            style={{ background: '#06b6d4', color: '#04080f' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#22d3ee')}
            onMouseLeave={e => (e.currentTarget.style.background = '#06b6d4')}
          >
            <Play size={15} />
            Quick Start Guide
          </Link>
          <Link
            to="/docs/unrealengine"
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          >
            Full Documentation
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

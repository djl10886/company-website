import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-16">
      {/* Hero Section with Company Name */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="mb-6">
          <img 
            src="https://raw.githubusercontent.com/djl10886/image-hosting/refs/heads/main/processed_logo_black_on_transparent.png"
            alt="Clankr Intelligence Logo"
            className="w-24 h-24 md:w-32 md:h-32 brightness-0 invert"
          />
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Clankr Intelligence
        </h1>
        <div className="w-24 h-1 bg-blue-400 mx-auto mb-8 rounded-full"></div>
      </div>

      {/* Company Introduction Section */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 text-center">
          <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
            Clankr Intelligence is a startup working to bring the latest AI tech to games. Our goal is to bring NPCs to life by imbuing them with lifelike behaviors.
          </p>
        </div>
      </div>
    </div>
  );
}
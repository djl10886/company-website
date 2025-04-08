import React from 'react';
import { Gamepad2 } from 'lucide-react';

export default function Products() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Gamepad2 className="text-blue-400 w-12 h-12 mx-auto mb-4" />
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-300 text-xl leading-relaxed mb-12">
              A prototype for our framework will be released soon as an Unreal Engine plugin. 
              Check out the following video for a brief demo of what to expect.
            </p>
          </div>
        </div>

        {/* YouTube Video Embed Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/puJrAKR47WI"
              title="Product Demo"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
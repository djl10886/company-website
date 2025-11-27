import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle, XCircle } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      setStatus('error');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([{ email: email.toLowerCase() }]);

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError('This email is already on the waitlist');
          setStatus('error');
          return;
        } else {
          setError('An error occurred. Please try again.');
          setStatus('error');
          return;
        }
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Error:', err);
      setStatus('error');
      setError('An error occurred. Please try again.');
    }

    setTimeout(() => {
      if (status === 'success' || status === 'error') {
        setStatus('idle');
      }
    }, 5000);
  };

  return (
    <div className="relative">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="fixed inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }}></div>

      <div className="relative">
        {/* Hero Section */}
        <div className="px-6 pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-6xl mx-auto w-full text-center space-y-12">
            <div className="space-y-6">
              <img
                src="https://raw.githubusercontent.com/djl10886/image-hosting/refs/heads/main/processed_logo_black_on_transparent.png"
                alt="Clankr Intelligence Logo"
                className="w-32 h-32 md:w-40 md:h-40 brightness-0 invert opacity-90 mx-auto"
              />
              <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
                Clankr Intelligence
              </h1>
            </div>

            <div className="max-w-4xl mx-auto text-xl md:text-2xl text-gray-400 leading-relaxed">
              <p>
                Clankr Intelligence is a startup working to bring the latest AI tech to games. Our product helps game developers easily leverage language models to create non-player-characters (NPCs) with dynamic behaviors.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="text-5xl font-bold text-white/10">01</div>
                <h3 className="text-xl font-semibold text-white">Autonomous Decision Making</h3>
                <p className="text-gray-400 leading-relaxed">
                  NPCs that autonomously make decisions and execute actions based on those decisions.
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-5xl font-bold text-white/10">02</div>
                <h3 className="text-xl font-semibold text-white">Environmental Awareness</h3>
                <p className="text-gray-400 leading-relaxed">
                  NPCs that actively interact with the environment and respond to changes and events in real-time.
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-5xl font-bold text-white/10">03</div>
                <h3 className="text-xl font-semibold text-white">Dynamic Memory</h3>
                <p className="text-gray-400 leading-relaxed">
                  NPCs that maintain a dynamic memory which influences personality and affects future behavior.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-12 md:p-16">
              <div className="text-center space-y-6 mb-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Join the Waitlist
                </h2>
                <p className="text-lg md:text-xl text-gray-400">
                  Our initial prototype will be released soon as an Unreal Engine plugin. Get notified when our prototype becomes available.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                      setStatus('idle');
                    }}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white text-lg placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                      status === 'submitting'
                        ? 'bg-white/20 text-white/50 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-white/90'
                    }`}
                  >
                    {status === 'submitting' ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white/70"></div>
                    ) : (
                      'Join'
                    )}
                  </button>
                </div>

                {status === 'success' && (
                  <div className="flex items-center justify-center space-x-2 text-green-400 pt-2">
                    <CheckCircle size={20} />
                    <span>You've been added to the waitlist!</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="text-center pt-2 space-y-1">
                    <div className="flex items-center justify-center space-x-2 text-red-400">
                      <XCircle size={20} />
                      <span>{error}</span>
                    </div>
                    {error !== 'This email is already on the waitlist' && (
                      <p className="text-sm text-gray-500">
                        Please try again or contact support if the issue persists.
                      </p>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
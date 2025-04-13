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
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
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
        } else {
          setError('An error occurred. Please try again.');
        }
        setStatus('error');
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch (err) {
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

      {/* Waitlist Section */}
      <div className="max-w-xl mx-auto px-4 pb-20">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Join the Waitlist
          </h2>
          <p className="text-gray-300 text-lg mb-8 text-center">
            Get notified when our prototype becomes available.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {error && (
                <p className="mt-2 text-red-400 text-sm">{error}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors ${
                  status === 'submitting'
                    ? 'bg-blue-400/50 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {status === 'submitting' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Join Waitlist</span>
                  </>
                )}
              </button>
            </div>

            {status === 'success' && (
              <div className="flex items-center justify-center text-green-400 mt-4">
                <CheckCircle size={20} className="mr-2" />
                <span>You've been added to the waitlist!</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
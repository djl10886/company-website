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
      // First, add to waitlist
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

      // Then, call the edge function directly
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-welcome-email`;
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send welcome email');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Error:', err);
      setStatus('error');
      setError('An error occurred while sending the welcome email. Please try again.');
    }

    setTimeout(() => {
      if (status === 'success' || status === 'error') {
        setStatus('idle');
      }
    }, 5000);
  };

  return (
    <div className="pt-16">
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
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 space-y-8">
          <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
            Clankr Intelligence is a startup working to bring the latest AI tech to games. Our framework helps game developers easily leverage language models to create non-player-characters (NPCs) with dynamic behaviors.
          </p>
          <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
            Our framework is model agnostic, platform independent, and can also run completely locally, providing developers with a high level of control, customizability, and privacy.
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
            Our initial prototype will be released soon as an Unreal Engine plugin. Get notified when our prototype becomes available.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                  setStatus('idle');
                }}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
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
              <div className="flex flex-col items-center justify-center text-green-400 mt-4 space-y-2">
                <div className="flex items-center">
                  <CheckCircle size={20} className="mr-2" />
                  <span>You've been added to the waitlist!</span>
                </div>
                <p className="text-sm text-gray-300">
                  A confirmation has been sent to your email. Please also check your spam folder if you don't see it in your inbox.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="flex flex-col items-center justify-center text-red-400 mt-4">
                <div className="flex items-center">
                  <XCircle size={20} className="mr-2" />
                  <span>{error}</span>
                </div>
                {error !== 'This email is already on the waitlist' && (
                  <p className="text-sm text-gray-300 mt-2">
                    Please try again or contact support if the issue persists.
                  </p>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
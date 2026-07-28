import React, { useState, FormEvent } from 'react';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

emailjs.init("XFdWyLS5AexANO6C6");

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email address';
    if (!message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      await emailjs.send('general_correspondence', 'contact_template', {
        from_name: name,
        from_email: email,
        message,
        to_email: 'dli@clankrintelligence.com',
      });
      setStatus('success');
      setName(''); setEmail(''); setMessage(''); setErrors({});
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none transition-colors ${
      errors[field] ? 'border-red-500/60' : ''
    }`;

  const inputStyle = (field: string): React.CSSProperties => ({
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${errors[field] ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
  });

  return (
    <div className="relative py-24 px-6">
      <div
        className="orb absolute w-[400px] h-[400px] top-1/2 right-0 -translate-y-1/2 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs text-cyan-400 font-semibold tracking-widest uppercase">Get in touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">Contact Us</h2>
          <p className="text-gray-400">
            Have a question, idea, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                placeholder="Your name"
                className={inputClass('name')}
                style={inputStyle('name')}
                onFocus={e => !errors.name && (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)')}
                onBlur={e => !errors.name && (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                placeholder="your@email.com"
                className={inputClass('email')}
                style={inputStyle('email')}
                onFocus={e => !errors.email && (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)')}
                onBlur={e => !errors.email && (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                value={message}
                onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: '' })); }}
                rows={5}
                placeholder="Your message..."
                className={inputClass('message')}
                style={inputStyle('message')}
                onFocus={e => !errors.message && (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)')}
                onBlur={e => !errors.message && (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
                style={{
                  background: status === 'sending' ? 'rgba(6,182,212,0.3)' : '#06b6d4',
                  color: '#04080f',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                }}
              >
                <Send size={15} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-1.5 text-green-400 text-sm">
                  <CheckCircle size={16} /> Sent successfully!
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-1.5 text-red-400 text-sm">
                  <XCircle size={16} /> Failed to send
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Direct email option */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Or email us directly at{' '}
            <a href="mailto:dli@clankrintelligence.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              dli@clankrintelligence.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

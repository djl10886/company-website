import React, { useState, FormEvent } from 'react';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("XFdWyLS5AexANO6C6");

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        'general_correspondence',
        'contact_template',
        {
          from_name: name,
          from_email: email,
          message: message,
          to_email: 'dli@clankrintelligence.com',
        }
      );

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch (error) {
      setStatus('error');
    }

    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <Send className="text-blue-400 w-10 h-10 md:w-12 md:h-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4"> 
            We'd love to hear from you.
            Whether you have a question, an idea, feedback, or just want to say hi, don't hesitate to reach out. We're all ears. 
          </p>
        </div>

        <div className="max-w-xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors({ ...errors, name: '' });
                  }
                }}
                className={`mt-1 block w-full rounded-md bg-white/10 border-transparent focus:border-blue-500 focus:bg-white/20 focus:ring-0 text-white p-3 ${
                  errors.name ? 'border-red-500 border-2' : ''
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: '' });
                  }
                }}
                className={`mt-1 block w-full rounded-md bg-white/10 border-transparent focus:border-blue-500 focus:bg-white/20 focus:ring-0 text-white p-3 ${
                  errors.email ? 'border-red-500 border-2' : ''
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors({ ...errors, message: '' });
                  }
                }}
                rows={6}
                className={`mt-1 block w-full rounded-md bg-white/10 border-transparent focus:border-blue-500 focus:bg-white/20 focus:ring-0 text-white p-3 ${
                  errors.message ? 'border-red-500 border-2' : ''
                }`}
                placeholder="Your message..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message}</p>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full md:w-auto px-6 py-3 rounded-md text-white font-medium flex items-center justify-center space-x-2 transition-colors ${
                  status === 'sending'
                    ? 'bg-blue-400/50 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <Send size={20} className="mr-2" />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="flex items-center text-green-400">
                  <CheckCircle size={20} className="mr-2" />
                  Message sent successfully!
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center text-red-400">
                  <XCircle size={20} className="mr-2" />
                  Failed to send message
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
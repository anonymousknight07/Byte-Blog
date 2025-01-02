"use client"

import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <div className="bg-[#251e56] text-white py-8 md:py-12 px-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Subscribe to My Blog</h2>
        <p className="mb-6 md:mb-8 text-sm md:text-base">Get notified when new articles are published!</p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#773f25] text-sm md:text-base"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#773f25] text-white px-6 py-2 rounded-md hover:bg-[#773f25]/80 transition-colors disabled:opacity-50 text-sm md:text-base whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
        </form>

        {message && (
          <p className={`mt-4 text-sm md:text-base ${status === 'error' ? 'text-red-300' : 'text-green-300'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
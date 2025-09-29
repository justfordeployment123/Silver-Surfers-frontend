import React, { useEffect, useState } from 'react';
import { createCheckoutSession, getMe } from '../api';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const Checkout = () => {
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();
  const pkg = parseInt(params.get('pkg') || '1', 10);

  // Simple client-side guard: if no token, redirect to login, preserving return path and pkg
  useEffect(() => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (!token) {
      // Send users to login and preserve return path via state; also set a 'from=checkout' flag which Login.js understands
      navigate('/login?from=checkout', {
        replace: true,
        state: { from: location.pathname + location.search }
      });
    }
    // If logged in, prefill email from profile
    (async () => {
      if (token) {
        const me = await getMe();
        if (me?.user?.email) setEmail(me.user.email);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Normalize URL to include protocol if missing
    let normalizedUrl = (url || '').trim();
    if (normalizedUrl && !/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const result = await createCheckoutSession((email || '').trim(), normalizedUrl, pkg);
    setLoading(false);
    if (result?.url) {
      window.location.href = result.url; // Redirect to Stripe Checkout
    } else {
      setError(result.error || 'Unable to start checkout.');
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-green-950 via-teal-950 to-cyan-900 pt-24 pb-10 px-4">
      <form className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="heading-page font-bold text-gray-900 mb-6 text-center">Get Your Light Audit Report</h2>
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Website URL</label>
          <input
            type="text"
            required
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="yourwebsite.com or https://yourwebsite.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-blue-600 text-gray-900 bg-gray-50"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Email Address</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-green-600 text-gray-900 bg-gray-50" />
        </div>
        {error && <div className="mb-4 text-red-700 text-sm text-center">{error}</div>}
        <button type="submit" disabled={loading} className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 via-green-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          {loading ? 'Submitting...' : 'Get Light Report'}
        </button>
        <p className="text-caption text-gray-700 mt-4 text-center">No credit card required • Takes 30 seconds</p>
      </form>
    </div>
  );
};

export default Checkout;

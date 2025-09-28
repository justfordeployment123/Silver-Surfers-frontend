import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchJSON } from '../config/apiBase';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); setMessage(null);
    if (!form.email || !form.password) { setError('Email and password required'); return; }
    setLoading(true);
    try {
  const { ok, data, status } = await fetchJSON('/auth/register', { method: 'POST', body: JSON.stringify(form) });
  if (!ok) throw new Error(data?.error || `Registration failed (status ${status})`);
      setMessage('Registration successful. Check your email to verify your account.');
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900 pt-24 pb-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2 className="heading-page font-bold text-gray-900 mb-6 text-center">Create your account</h2>
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-blue-600 text-gray-900 bg-gray-50"
            autoComplete="email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-blue-600 text-gray-900 bg-gray-50"
            autoComplete="new-password"
            required
          />
        </div>
        {error && <div className="mb-4 text-red-700 text-small text-center">{error}</div>}
        {message && (
          <div className="mb-4 text-green-700 text-small text-center">
            {message}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 via-blue-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
        {message && (
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full mt-3 py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition"
          >
            Go to Login
          </button>
        )}
        <p className="text-caption text-gray-700 mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-700 underline">Sign in</a>
        </p>
      </form>
    </div>
  );
}

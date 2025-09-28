import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE, fetchJSON } from '../config/apiBase';

// Simple JWT auth simulation: expects backend to provide /api/login returning {token}
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  // Determine where to go after successful login:
  // 1. If a protected route stored an origin in location.state.from, use it.
  // 2. Else if query string explicitly asks for checkout (?from=checkout), go there.
  // 3. Otherwise go to home page.
  const urlParams = new URLSearchParams(location.search);
  let redirectTo = location.state?.from;
  if(!redirectTo) {
    if (urlParams.get('from') === 'checkout') redirectTo = '/checkout';
    else {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('lastRoute') : null;
      redirectTo = stored && !['/login','/signup','/verify-email','/resend-verification','/forgot-password','/reset-password'].includes(stored) ? stored : '/';
    }
  }
  // Auto-admin redirect handled after token decode; no manual admin mode toggle.

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);
  const [resendStatus, setResendStatus] = useState({ sending:false, message:null, error:null });
  const [googleReady, setGoogleReady] = useState(false);
  const googleDivRef = useRef(null);
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // Load Google Identity Services script
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return; // no client id configured
    const existing = document.getElementById('google-identity-script');
    if (existing) { initGoogle(); return; }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.id = 'google-identity-script';
    script.onload = () => initGoogle();
    script.onerror = () => setError('Failed to load Google auth');
    document.head.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GOOGLE_CLIENT_ID]);

  function initGoogle() {
    if (!window.google || !googleDivRef.current) return;
    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        ux_mode: 'popup'
      });
      window.google.accounts.id.renderButton(googleDivRef.current, {
        theme: 'outline',
        size: 'large',
        width: 320,
        shape: 'rectangular'
      });
      setGoogleReady(true);
    } catch (e) {
      setError('Google init error');
    }
  }

  async function handleGoogleResponse(resp) {
    if (!resp.credential) { setError('Google auth failed'); return; }
    setLoading(true);
    setError(null);
    try {
      const { ok, data } = await fetchJSON('/auth/google', { method: 'POST', body: JSON.stringify({ idToken: resp.credential }) });
      if (!ok || !data.token) throw new Error(data?.error || 'Google login failed');
      localStorage.setItem('authToken', data.token);
  try { const payload = JSON.parse(atob(data.token.split('.')[1])); if(payload.role==='admin'){ navigate('/admin', { replace: true }); return; } } catch {}
  navigate(redirectTo, { replace: true });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // If user edits email, clear any prior unverified notice and resend status
    if (name === 'email') {
      if (unverifiedEmail) setUnverifiedEmail(null);
      if (resendStatus.message || resendStatus.error || resendStatus.sending) {
        setResendStatus({ sending: false, message: null, error: null });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // New attempt: reset unverified state so old notice doesn't persist
    if (unverifiedEmail) setUnverifiedEmail(null);
    if (resendStatus.message || resendStatus.error || resendStatus.sending) {
      setResendStatus({ sending: false, message: null, error: null });
    }
    if (!form.email || !form.password) {
      setError('Email and password required');
      return;
    }
    setLoading(true);
    try {
      const { ok, data, status } = await fetchJSON('/auth/login', { method: 'POST', body: JSON.stringify(form) });
      if (status === 403 && (data?.error || '').toLowerCase().includes('not verified')) {
        setUnverifiedEmail(form.email);
        throw new Error('Email not verified');
      }
      if (!ok || !data.token) throw new Error(data?.error || 'Login failed');
      localStorage.setItem('authToken', data.token);
  try { const payload = JSON.parse(atob(data.token.split('.')[1])); if(payload.role==='admin'){ navigate('/admin', { replace: true }); return; } } catch {}
  navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900 pt-24 pb-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2 className="heading-page font-bold text-gray-900 mb-6 text-center">Sign in to continue</h2>
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
            autoComplete="current-password"
            required
          />
        </div>
        {error && <div className="mb-2 text-red-700 text-small text-center">{error}</div>}
        {unverifiedEmail && (
          <div className="mb-3">
            <div className="text-small text-gray-700 text-center mb-2">
              The email <strong>{unverifiedEmail}</strong> is not verified.
            </div>
            <button
              type="button"
              onClick={async ()=>{
                setResendStatus({ sending:true, message:null, error:null });
                try {
                  const r = await fetch(`${API_BASE}/auth/resend-verification`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: unverifiedEmail })});
                  const t = await r.text(); let d; try { d = t? JSON.parse(t):{}; } catch { d={}; }
                  if(!r.ok) throw new Error(d.error || 'Failed to resend');
                  setResendStatus({ sending:false, message:'Verification email sent. Check your inbox.', error:null });
                } catch(e){ setResendStatus({ sending:false, message:null, error:e.message }); }
              }}
              disabled={resendStatus.sending}
              className="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition"
            >
              {resendStatus.sending ? 'Sending...' : 'Resend Verification Email'}
            </button>
            {resendStatus.message && <div className="mt-2 text-green-700 text-caption text-center">{resendStatus.message}</div>}
            {resendStatus.error && <div className="mt-2 text-red-700 text-caption text-center">{resendStatus.error}</div>}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 via-blue-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        {GOOGLE_CLIENT_ID && (
          <div className="mt-3">
            <div ref={googleDivRef} className="flex justify-center" />
            {!googleReady && <p className="text-caption text-gray-600 mt-2 text-center">Loading Google sign-in…</p>}
          </div>
        )}
        <p className="text-caption text-gray-700 mt-4 text-center">
          New here? <a className="text-blue-700 underline" href="/signup">Create an account</a>
        </p>
        <p className="text-caption text-gray-700 mt-2 text-center">
          <a className="text-blue-700 underline" href="/forgot-password">Forgot password?</a>
        </p>
      </form>
    </div>
  );
}

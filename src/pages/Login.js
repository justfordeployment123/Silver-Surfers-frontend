import React, { useEffect, useState } from 'react';
import { login, getMe, resendVerification } from '../api';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    // If already logged in, redirect immediately
    (async () => {
      const me = await getMe();
      if (me && me.user) {
        navigate(redirect, { replace: true });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res?.token) {
      navigate(redirect, { replace: true });
    } else {
      if (res?.error === 'Email not verified') {
        setError('Your email is not verified. Enter the token we sent or resend it.');
      } else {
        setError(res?.error || 'Invalid credentials');
      }
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError('');
    setInfo('');
    const res = await resendVerification(email.trim());
    setResendLoading(false);
    if (res?.error) setError(res.error); else setInfo('Verification email resent. Check your inbox.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign in to continue</h2>
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Email</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-blue-600 text-gray-900 bg-gray-50" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Password</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-green-600 text-gray-900 bg-gray-50" />
        </div>
        {error && <div className="mb-2 text-red-700 text-sm text-center">{error}</div>}
        {info && <div className="mb-2 text-green-700 text-sm text-center">{info}</div>}
        <button type="submit" disabled={loading} className="w-full py-3 px-6 bg-gradient-to-r from-blue-700 via-green-700 to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        {error === 'Your email is not verified. Enter the token we sent or resend it.' && (
          <div className="mt-3 flex flex-col items-center gap-2">
            <button type="button" onClick={handleResend} disabled={resendLoading} className="text-xs px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition">
              {resendLoading ? 'Resending...' : 'Resend Verification Email'}
            </button>
            <a href="/verify-email" className="text-xs text-blue-700 underline">I already have a token</a>
          </div>
        )}
        <p className="text-xs text-gray-700 mt-4 text-center">
          New here? <Link className="text-blue-700 underline" to={`/register?redirect=${encodeURIComponent(redirect)}`}>Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

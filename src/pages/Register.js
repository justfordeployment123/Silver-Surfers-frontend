import React, { useEffect, useState } from 'react';
import { register, getMe, verifyEmail, resendVerification } from '../api';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [stage, setStage] = useState('form'); // form | verify
  const [verifyToken, setVerifyToken] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
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
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const res = await register(email, password);
    setLoading(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    setStage('verify');
    setInfo('Registered. Check your email for the verification token.');
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await verifyEmail(verifyToken.trim());
    setLoading(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    if (res?.token) {
      navigate(redirect, { replace: true });
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError('');
    const res = await resendVerification(email);
    setResendLoading(false);
    if (res?.error) setError(res.error);
    else setInfo('Verification email resent. Check your inbox.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
      {stage === 'form' && (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create your account</h2>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-blue-600 text-gray-900 bg-gray-50" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-green-600 text-gray-900 bg-gray-50" />
          </div>
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">Confirm Password</label>
              <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-green-600 text-gray-900 bg-gray-50" />
            </div>
          {error && <div className="mb-4 text-red-700 text-sm text-center">{error}</div>}
          {info && <div className="mb-4 text-green-700 text-sm text-center">{info}</div>}
          <button type="submit" disabled={loading} className="w-full py-3 px-6 bg-gradient-to-r from-blue-700 via-green-700 to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
          <p className="text-xs text-gray-700 mt-4 text-center">
            Already have an account? <Link className="text-blue-700 underline" to={`/login?redirect=${encodeURIComponent(redirect)}`}>Sign in</Link>
          </p>
        </form>
      )}
      {stage === 'verify' && (
        <form onSubmit={handleVerify} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Verify your email</h2>
          <p className="text-sm text-gray-700 mb-4 text-center">Enter the verification token we sent to <strong>{email}</strong>.</p>
          <div className="mb-6">
            <label className="block text-gray-800 font-semibold mb-2">Verification Token</label>
            <input type="text" required value={verifyToken} onChange={e => setVerifyToken(e.target.value)} placeholder="Paste token" className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-blue-600 text-gray-900 bg-gray-50" />
          </div>
          {error && <div className="mb-4 text-red-700 text-sm text-center">{error}</div>}
          {info && <div className="mb-4 text-green-700 text-sm text-center">{info}</div>}
          <button type="submit" disabled={loading} className="w-full py-3 px-6 bg-gradient-to-r from-blue-700 via-green-700 to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
          <button type="button" disabled={resendLoading} onClick={handleResend} className="w-full mt-3 py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition">
            {resendLoading ? 'Resending...' : 'Resend Email'}
          </button>
          <p className="text-xs text-gray-700 mt-4 text-center">
            Need help? <Link className="text-blue-700 underline" to="/contact">Contact support</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Register;

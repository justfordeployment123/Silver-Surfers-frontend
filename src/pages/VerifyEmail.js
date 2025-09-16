import React, { useEffect, useState } from 'react';
import { verifyEmail, resendVerification } from '../api';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirect = searchParams.get('redirect') || '/';

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);
    const res = await verifyEmail(token.trim());
    setLoading(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    navigate(redirect, { replace: true });
  };

  // Auto-submit if token present in query string
  useEffect(() => {
    const qsToken = searchParams.get('token');
    if (qsToken) {
      setToken(qsToken);
      // Delay a tick so state updates before submission
      setTimeout(() => {
        handleVerify();
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResend = async () => {
    if (!email) { setError('Enter your email first'); return; }
    setError('');
    setInfo('');
    setResendLoading(true);
    const res = await resendVerification(email.trim());
    setResendLoading(false);
    if (res?.error) setError(res.error); else setInfo('Verification email resent.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
      <form onSubmit={handleVerify} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Verify Email</h2>
        {searchParams.get('token') && loading && (
          <div className="mb-4 text-sm text-gray-700 text-center">Verifying your link...</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Verification Token</label>
          <input type="text" required value={token} onChange={e => setToken(e.target.value)} placeholder="Paste token" className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-blue-600 text-gray-900 bg-gray-50" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Email (for resend)</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-green-600 text-gray-900 bg-gray-50" />
        </div>
        {error && <div className="mb-4 text-red-700 text-sm text-center">{error}</div>}
        {info && <div className="mb-4 text-green-700 text-sm text-center">{info}</div>}
        <button type="submit" disabled={loading} className="w-full py-3 px-6 bg-gradient-to-r from-blue-700 via-green-700 to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          {loading ? 'Verifying...' : 'Verify'}
        </button>
        <button type="button" disabled={resendLoading} onClick={handleResend} className="w-full mt-3 py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition">
          {resendLoading ? 'Resending...' : 'Resend Email'}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;

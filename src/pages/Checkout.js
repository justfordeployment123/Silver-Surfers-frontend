import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe, startAudit, precheckUrl } from '../api';

const Checkout = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [precheckLoading, setPrecheckLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auto-fill email from user data
  useEffect(() => {
    const loadUserEmail = async () => {
      try {
        const result = await getMe();
        if (result.user && result.user.email) {
          setEmail(result.user.email);
        }
      } catch (error) {
        console.log('Could not load user email:', error);
        // Fallback to localStorage if available
        const savedEmail = localStorage.getItem('userEmail') || localStorage.getItem('email') || localStorage.getItem('authEmail');
        if (savedEmail) {
          setEmail(savedEmail);
        }
      }
    };
    
    loadUserEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url || !email) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setPrecheckLoading(true);
    setError('');
    setSuccess('');

    try {
      // First, precheck the URL
      setPrecheckLoading(true);
      const precheckResult = await precheckUrl(url);
      
      if (precheckResult.error || precheckResult.success === false) {
        setError(precheckResult.error || 'URL not reachable. Please check the domain and try again.');
        return;
      }

      setPrecheckLoading(false);
      setSuccess('✅ URL validated successfully! Starting audit...');

      // Now start the actual audit
      const auditResult = await startAudit(email, url);
      
      if (auditResult.error) {
        setError(auditResult.error);
        setSuccess('');
      } else {
        setSuccess('🎉 Audit request submitted successfully! You will receive an email with your comprehensive accessibility report shortly.');
        
        // Clear the form
        setUrl('');
      }
      
    } catch (err) {
      setError('Failed to submit audit request. Please try again.');
      setSuccess('');
    } finally {
      setLoading(false);
      setPrecheckLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-green-950 via-teal-950 to-cyan-900 pt-24 pb-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Start Your Accessibility Audit</h1>
          <p className="text-xl text-gray-200">Enter your website URL to begin a comprehensive accessibility analysis</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {precheckLoading ? 'Validating URL...' : 'Starting Audit...'}
                </>
              ) : (
                'Start Full Audit'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/subscription')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

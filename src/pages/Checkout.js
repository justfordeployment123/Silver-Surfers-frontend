import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe, startAudit, precheckUrl, getSubscription } from '../api';

const Checkout = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [precheckLoading, setPrecheckLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);

  // Load user data and subscription information
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setSubscriptionLoading(true);
        
        // Load user email and subscription data in parallel
        const [userResult, subscriptionResult] = await Promise.all([
          getMe(),
          getSubscription()
        ]);
        
        // Set email
        if (userResult.user && userResult.user.email) {
          setEmail(userResult.user.email);
        } else {
          // Fallback to localStorage if available
          const savedEmail = localStorage.getItem('userEmail') || localStorage.getItem('email') || localStorage.getItem('authEmail');
          if (savedEmail) {
            setEmail(savedEmail);
          }
        }
        
        // Set subscription data
        if (subscriptionResult.subscription) {
          setSubscription(subscriptionResult.subscription);
        }
        
      } catch (error) {
        console.log('Could not load user data:', error);
        // Fallback to localStorage if available
        const savedEmail = localStorage.getItem('userEmail') || localStorage.getItem('email') || localStorage.getItem('authEmail');
        if (savedEmail) {
          setEmail(savedEmail);
        }
      } finally {
        setSubscriptionLoading(false);
      }
    };
    
    loadUserData();
  }, []);

  // Helper function to calculate remaining scans
  const getRemainingScans = () => {
    if (!subscription || !subscription.limits) return 0;
    
    const maxScans = subscription.limits.scansPerMonth;
    const usedScans = subscription.usage?.scansThisMonth || 0;
    
    return Math.max(0, maxScans - usedScans);
  };

  // Helper function to check if user can start audit
  const canStartAudit = () => {
    if (!subscription || subscription.status !== 'active') return false;
    return getRemainingScans() > 0;
  };

  // Helper function to get usage status color
  const getUsageStatusColor = () => {
    const remaining = getRemainingScans();
    if (remaining === 0) return 'text-red-600 bg-red-100';
    if (remaining <= 2) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url || !email) {
      setError('Please fill in all fields');
      return;
    }

    // Check if user can start audit
    if (!canStartAudit()) {
      if (!subscription || subscription.status !== 'active') {
        setError('You need an active subscription to start an audit. Please check your subscription status.');
      } else {
        setError(`You have reached your monthly scan limit (${subscription.limits?.scansPerMonth || 0} scans). Please upgrade your plan or wait for next month.`);
      }
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
          {/* Subscription Status and Usage Information */}
          {subscriptionLoading ? (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <div className="animate-pulse flex items-center">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ) : subscription && subscription.status === 'active' ? (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Subscription Status</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {subscription.isTeamMember ? 'Team Member' : 'Active'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{subscription.plan?.name || 'Plan'}</div>
                  <div className="text-sm text-gray-600">Current Plan</div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getUsageStatusColor().split(' ')[0]}`}>
                    {getRemainingScans()}
                  </div>
                  <div className="text-sm text-gray-600">Scans Remaining</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{subscription.limits?.scansPerMonth || 0}</div>
                  <div className="text-sm text-gray-600">Monthly Limit</div>
                </div>
              </div>
              
              <div className={`p-3 rounded-lg ${getUsageStatusColor()}`}>
                {getRemainingScans() === 0 ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">No scans remaining this month. Upgrade your plan or wait for next month.</span>
                  </div>
                ) : getRemainingScans() <= 2 ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Warning: Only {getRemainingScans()} scan{getRemainingScans() !== 1 ? 's' : ''} remaining this month.</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">You have {getRemainingScans()} scan{getRemainingScans() !== 1 ? 's' : ''} remaining this month.</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-red-800">No Active Subscription</div>
                  <div className="text-sm text-red-600">You need an active subscription to start audits.</div>
                </div>
              </div>
            </div>
          )}

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
              disabled={loading || !canStartAudit()}
              className={`w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center ${
                !canStartAudit() ? 'cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {precheckLoading ? 'Validating URL...' : 'Starting Audit...'}
                </>
              ) : !canStartAudit() ? (
                getRemainingScans() === 0 ? 'Scan Limit Reached' : 'No Active Subscription'
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

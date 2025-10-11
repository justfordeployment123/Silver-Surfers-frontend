import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createCheckoutSession, getSubscription, getSubscriptionPlans, updateSubscription, cancelSubscription, inviteTeamMember, removeTeamMember, getTeamMembers } from '../api';

const Subscription = () => {
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const selectedPlan = params.get('plan');
  const selectedCycle = params.get('cycle') || 'monthly';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [subscriptionResult, plansResult] = await Promise.all([
        getSubscription(),
        getSubscriptionPlans()
      ]);

      if (subscriptionResult.error) {
        setError(subscriptionResult.error);
      } else {
        setCurrentSubscription(subscriptionResult.subscription);
        
        // Load team members if user has active subscription
        if (subscriptionResult.subscription) {
          loadTeamMembers();
        }
      }

      if (plansResult.plans) {
        setAvailablePlans(plansResult.plans);
      }

      // If user came from Services page with plan selection, start checkout
      if (selectedPlan && !subscriptionResult.subscription) {
        handleSubscribe(selectedPlan, selectedCycle);
      }
    } catch (err) {
      setError('Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  const loadTeamMembers = async () => {
    try {
      const result = await getTeamMembers();
      if (result.error) {
        console.error('Failed to load team members:', result.error);
      } else {
        setTeamMembers(result.teamMembers || []);
      }
    } catch (err) {
      console.error('Failed to load team members:', err);
    }
  };

  const handleSubscribe = async (planId, billingCycle = 'monthly') => {
    try {
      setActionLoading(true);
      setError('');
      const result = await createCheckoutSession(planId, billingCycle);
      
      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      setError('Failed to create checkout session');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdatePlan = async (planId, billingCycle = 'monthly') => {
    try {
      setActionLoading(true);
      setError('');
      const result = await updateSubscription(planId, billingCycle);
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess('Subscription updated successfully!');
        setTimeout(() => {
          setSuccess('');
          loadData();
        }, 3000);
      }
    } catch (err) {
      setError('Failed to update subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelSubscription = async (immediate = false) => {
    if (!window.confirm(`Are you sure you want to ${immediate ? 'cancel immediately' : 'cancel at period end'}?`)) {
      return;
    }

    try {
      setActionLoading(true);
      setError('');
      const result = await cancelSubscription(!immediate);
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.message);
        setTimeout(() => {
          setSuccess('');
          loadData();
        }, 3000);
      }
    } catch (err) {
      setError('Failed to cancel subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'Contact us';
    return `$${(price / 100).toFixed(0)}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'trialing': return 'text-blue-600 bg-blue-100';
      case 'past_due': return 'text-yellow-600 bg-yellow-100';
      case 'canceled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleInviteTeamMember = async (e) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;

    try {
      setTeamLoading(true);
      setError('');
      const result = await inviteTeamMember(newMemberEmail.trim());
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess('Team member invited successfully!');
        setNewMemberEmail('');
        loadTeamMembers(); // Refresh team list
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Failed to invite team member');
    } finally {
      setTeamLoading(false);
    }
  };

  const handleRemoveTeamMember = async (email) => {
    if (!window.confirm(`Are you sure you want to remove ${email} from your team?`)) {
      return;
    }

    try {
      setTeamLoading(true);
      setError('');
      const result = await removeTeamMember(email);
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess('Team member removed successfully!');
        loadTeamMembers(); // Refresh team list
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Failed to remove team member');
    } finally {
      setTeamLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-green-950 via-teal-950 to-cyan-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-green-950 via-teal-950 to-cyan-900 pt-24 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Subscription Management</h1>
          <p className="text-xl text-gray-200">Manage your SilverSurfers subscription</p>
        </div>

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

        {currentSubscription ? (
          <>
            {/* Start Audit Button for Active Subscribers */}
            {currentSubscription.status === 'active' && (
              <div className="mb-8 text-center">
                <div className={`bg-white rounded-2xl p-6 shadow-xl border-2 ${currentSubscription.isTeamMember ? 'border-yellow-300' : 'border-green-200'}`}>
                  {currentSubscription.isTeamMember && (
                    <div className="mb-4 inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                      👥 Team Member
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Start Your Audit?</h3>
                  <p className="text-gray-600 mb-6">
                    You have {currentSubscription.isTeamMember ? 'team access to an' : 'an'} active subscription. Start auditing your website now!
                  </p>
                  <button
                    onClick={() => navigate('/checkout')}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Start Full Audit
                  </button>
                </div>
              </div>
            )}
            
            {/* Current Subscription */}
            <div className={`grid grid-cols-1 gap-8 ${currentSubscription.limits?.maxUsers > 1 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Subscription</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Plan:</span>
                  <span className="font-semibold text-gray-900">{currentSubscription.plan?.name}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentSubscription.status)}`}>
                    {currentSubscription.status.charAt(0).toUpperCase() + currentSubscription.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Current Period:</span>
                  <span className="font-semibold text-gray-900 text-sm">
                    {formatDate(currentSubscription.currentPeriodStart)} - {formatDate(currentSubscription.currentPeriodEnd)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Scans This Month:</span>
                  <span className="font-semibold text-gray-900">
                    {currentSubscription.usage?.scansThisMonth || 0} / {currentSubscription.limits?.scansPerMonth === -1 ? '∞' : currentSubscription.limits?.scansPerMonth}
                  </span>
                </div>

                {currentSubscription.cancelAtPeriodEnd && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      Your subscription will be canceled at the end of the current period.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => handleCancelSubscription(false)}
                  disabled={actionLoading || currentSubscription.cancelAtPeriodEnd}
                  className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors"
                >
                  {currentSubscription.cancelAtPeriodEnd ? 'Cancellation Scheduled' : 'Cancel at Period End'}
                </button>
                
                <button
                  onClick={() => handleCancelSubscription(true)}
                  disabled={actionLoading}
                  className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors"
                >
                  Cancel Immediately
                </button>
              </div>
            </div>

            {/* Team Management Section - Only for subscription owners */}
            {currentSubscription && currentSubscription.limits?.maxUsers > 1 && !currentSubscription.isTeamMember && (
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Management</h2>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Team Members</h3>
                      <p className="text-sm text-gray-600">
                        {teamMembers.length} / {currentSubscription.limits.maxUsers === -1 ? '∞' : currentSubscription.limits.maxUsers} members
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {currentSubscription.limits.maxUsers === -1 ? 'Unlimited' : currentSubscription.limits.maxUsers - teamMembers.length} slots available
                    </div>
                  </div>

                  {/* Add Team Member Form */}
                  <form onSubmit={handleInviteTeamMember} className="flex gap-2 mb-4">
                    <input
                      type="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={teamLoading || (currentSubscription.limits.maxUsers !== -1 && teamMembers.length >= currentSubscription.limits.maxUsers)}
                    />
                    <button
                      type="submit"
                      disabled={teamLoading || !newMemberEmail.trim() || (currentSubscription.limits.maxUsers !== -1 && teamMembers.length >= currentSubscription.limits.maxUsers)}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors"
                    >
                      {teamLoading ? 'Inviting...' : 'Invite'}
                    </button>
                  </form>

                  {/* Team Members List */}
                  <div className="space-y-2">
                    {teamMembers.length === 0 ? (
                      <p className="text-gray-500 text-sm">No team members yet. Invite someone to get started!</p>
                    ) : (
                      teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{member.email}</div>
                              <div className={`text-xs ${member.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                                {member.status === 'active' ? 'Active' : 'Pending'}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveTeamMember(member.email)}
                            disabled={teamLoading}
                            className="text-red-500 hover:text-red-700 disabled:text-gray-400 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>
              
              <div className="space-y-4">
                {availablePlans.map((plan) => {
                  const isCurrentPlan = plan.id === currentSubscription.planId;
                  const canUpgrade = !isCurrentPlan && plan.id !== 'custom';
                  
                  return (
                    <div key={plan.id} className={`p-4 border-2 rounded-xl ${isCurrentPlan ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                        {isCurrentPlan && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Current</span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-lg text-gray-900">
                            {formatPrice(plan.monthlyPrice)}/month
                          </div>
                          <div className="text-xs text-gray-700">
                            {plan.limits.scansPerMonth === -1 ? 'Unlimited' : plan.limits.scansPerMonth} scans/month
                          </div>
                        </div>
                        
                        {canUpgrade && (
                          <button
                            onClick={() => handleUpdatePlan(plan.id, 'monthly')}
                            disabled={actionLoading}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-sm font-semibold rounded-lg transition-colors"
                          >
                            {actionLoading ? 'Updating...' : 'Upgrade'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          </>
        ) : (
          // No Subscription - Show Plans
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Plan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availablePlans.map((plan) => {
                if (plan.contactSales) {
                  return (
                    <div key={plan.id} className="p-6 border-2 border-gray-200 rounded-xl text-center">
                      <div className="text-4xl mb-4">{plan.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-700 mb-4">{plan.description}</p>
                      <a
                        href="/contact"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                      >
                        Contact Sales
                      </a>
                    </div>
                  );
                }

                return (
                  <div key={plan.id} className={`p-6 border-2 rounded-xl text-center ${plan.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    {plan.popular && (
                      <div className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full mb-4 inline-block">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="text-4xl mb-4">{plan.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-700 mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-900">{formatPrice(plan.monthlyPrice)}</div>
                      <div className="text-sm text-gray-700">per month</div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm text-gray-700 mb-2">
                        {plan.limits.scansPerMonth === -1 ? 'Unlimited' : plan.limits.scansPerMonth} scans/month
                      </div>
                      <div className="text-sm text-gray-700">
                        {plan.limits.maxUsers === -1 ? 'Unlimited' : plan.limits.maxUsers} users
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleSubscribe(plan.id, 'monthly')}
                      disabled={actionLoading}
                      className={`w-full py-3 px-6 font-semibold rounded-lg transition-all ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 hover:shadow-lg text-white' 
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      {actionLoading ? 'Processing...' : 'Subscribe Now'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;

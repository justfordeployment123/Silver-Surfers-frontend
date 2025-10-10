import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const pkg = parseInt(params.get('pkg') || '1', 10);
  
  // Package mapping to new plan IDs
  const packageMapping = {
    1: 'starter',
    2: 'pro',
    3: 'custom'
  };
  
  const planId = packageMapping[pkg] || 'starter';

  useEffect(() => {
    // Redirect to the new subscription page
    navigate(`/subscription?plan=${planId}&cycle=monthly`, { replace: true });
  }, [navigate, planId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-green-950 via-teal-950 to-cyan-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to subscription...</p>
      </div>
    </div>
  );
};

export default Checkout;

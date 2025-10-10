import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getMe } from '../api';

const ProtectedRoute = ({ role = null, children }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await getMe();
      if (!mounted) return;
      const user = res?.user;
      // If no role is specified, allow any authenticated user
      // If a role is specified, check if user has that role
      if (user && (!role || user.role === role)) setAllowed(true);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [role]);

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!allowed) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;

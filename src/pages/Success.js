import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { confirmPayment } from '../api';

const Success = () => {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const [status, setStatus] = useState('Confirming your payment…');
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      if (!sessionId) {
        setStatus('Missing session id.');
        return;
      }
      const res = await confirmPayment(sessionId);
      if (res.error) {
        setStatus(`Error: ${res.error}`);
      } else {
        setStatus('Payment confirmed. Your audit is queued! Redirecting…');
        setTimeout(() => navigate('/'), 2500);
      }
    };
    run();
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Checkout Success</h2>
        <p className="text-gray-700">{status}</p>
      </div>
    </div>
  );
};

export default Success;

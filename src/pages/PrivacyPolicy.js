import React from 'react';
import LegalDocumentViewer from '../components/LegalDocumentViewer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <LegalDocumentViewer 
          type="privacy-policy" 
          showAcceptButton={false} // Don't show accept button on public page
        />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
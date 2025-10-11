import React from 'react';
import LegalDocumentViewer from '../components/LegalDocumentViewer';

const TermsOfUse = () => {
  const handleAccept = (result) => {
    console.log('Terms of Use accepted:', result);
    // You can add additional logic here, like redirecting or showing a success message
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <LegalDocumentViewer 
          type="terms-of-use" 
          onAccept={handleAccept}
          showAcceptButton={false} // Don't show accept button on public page
        />
      </div>
    </div>
  );
};

export default TermsOfUse;
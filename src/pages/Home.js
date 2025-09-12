import React, { useState } from 'react';

// Simple modal component for demo
const ScanResultsModal = ({ result, isVisible, onClose }) => {
  if (!isVisible || !result) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Senior-Friendly Score Results</h3>
        <div className="mb-4">
          <div className="text-3xl font-bold text-green-600 mb-2">{result.score}/100</div>
          <p className="text-gray-600">{result.summary}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Recommendations:</h4>
          <ul className="list-disc list-inside text-gray-600">
            {result.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
        <button 
          onClick={onClose}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const MainScreen = () => {
 const [scanData, setScanData] = useState({
   websiteUrl: '',
   email: ''
 });
 const [isScanning, setIsScanning] = useState(false);
 const [error, setError] = useState('');
const [showResultsModal, setShowResultsModal] = useState(false);
const [scanResult, setScanResult] = useState(null);

 const handleInputChange = (e) => {
   setScanData({
     ...scanData,
     [e.target.name]: e.target.value
   });
 };
 
 const navigateToServices = () => {
  window.location.href = '/services';
};

const navigateToContact = () => {
  window.location.href = '/contact';
};

 const handleCloseModal = () => {
  setShowResultsModal(false);
  setScanResult(null);
  setScanData({
    websiteUrl: '',
    email: ''
  });
};

// Dummy scan function for demo purposes
const handleScanSubmit = async (e) => {
  e.preventDefault();
  setIsScanning(true);
  setError('');

  try {
    // Simulate scan processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate dummy results
    const dummyScore = Math.floor(Math.random() * 40) + 60; // Score between 60-100
    setScanResult({
      url: scanData.websiteUrl,
      score: dummyScore,
      summary: "Your website shows good potential for elderly users but needs improvements in readability and navigation.",
      recommendations: [
        "Increase font size to at least 16px for better readability",
        "Improve color contrast ratios for better visibility",
        "Simplify navigation menu structure"
      ],
      email: scanData.email,
    });
    setShowResultsModal(true);
  } catch (err) {
    setError('Scan completed with sample results. This is a demo version.');
    console.error('Scan error:', err);
  } finally {
    setIsScanning(false);
  }
};

 return (
   <div className="min-h-screen">
     {/* HERO SECTION */}
     <div className="relative min-h-screen overflow-hidden">
       {/* Background gradient */}
       <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-green-950 via-teal-950 to-cyan-900">
         <div className="absolute inset-0 bg-gradient-to-tl from-green-600/15 via-transparent to-blue-600/8"></div>
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,197,94,0.12),transparent_50%)] opacity-60"></div>
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.12),transparent_50%)] opacity-60"></div>
       </div>

       {/* Animated geometric shapes */}
       <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-br from-blue-500/15 to-green-600/25 rounded-full blur-3xl animate-pulse"></div>
       <div className="absolute bottom-20 right-10 w-56 h-56 bg-gradient-to-br from-teal-400/20 to-cyan-600/15 rounded-full blur-3xl animate-pulse delay-700"></div>
       <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-green-400/12 to-blue-500/18 rounded-full blur-2xl animate-pulse delay-1400"></div>
       <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-gradient-to-br from-teal-400/10 to-blue-500/15 rounded-full blur-xl animate-pulse delay-2100"></div>

       {/* Hero content */}
       <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
         <div className="max-w-4xl mx-auto text-center">
           <div className="mb-12">
             <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
               <span className="block">Is Your Website</span>
               <span className="block bg-gradient-to-r from-blue-300 via-green-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                 Senior-Friendly?
               </span>
             </h1>
             <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed max-w-3xl mx-auto">
               Get your SilverSurfers seal of approval. Expert auditing for elderly-friendly websites with scoring and improvement suggestions.
             </h2>
           </div>

           {/* Scan form */}
           <div className="max-w-2xl mx-auto">
             <div className="bg-white/8 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl shadow-green-500/10">
               <form onSubmit={handleScanSubmit} noValidate className="space-y-4">
                 <div className="grid gap-4 sm:grid-cols-2">
                   <div className="relative">
                    <input
                      type="text"
                       name="websiteUrl"
                      placeholder="Enter your website"
                       value={scanData.websiteUrl}
                       onChange={handleInputChange}
                      inputMode="url"
                      autoComplete="url"
                       className="w-full px-4 py-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/30 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base shadow-lg"
                       required
                     />
                     <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                       </svg>
                     </div>
                   </div>
                   <div className="relative">
                     <input
                       type="email"
                       name="email"
                       placeholder="Work email address"
                       value={scanData.email}
                       onChange={handleInputChange}
                       className="w-full px-4 py-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/30 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base shadow-lg"
                       required
                     />
                     <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                       </svg>
                     </div>
                   </div>
                 </div>
                 
                 <button
                   type="submit"
                   disabled={isScanning}
                   className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 hover:from-blue-700 hover:via-green-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                 >
                   {isScanning ? (
                     <div className="flex items-center justify-center space-x-2">
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                       <span>Analyzing...</span>
                     </div>
                   ) : (
                     'Get Your Senior-Friendly Score'
                   )}
                 </button>
               </form>

               <p className="text-gray-200 text-sm mt-4 leading-relaxed text-center">
                 Get a Senior-Friendly Score and detailed recommendations to make your website more accessible to elderly users.
               </p>

               {error && (
                 <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
                   <p className="text-red-200 text-sm text-center">{error}</p>
                 </div>
               )}
             </div>
           </div>

           {/* Trust indicators */}
           <div className="mt-12">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
               <div className="group relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-green-500/10 to-transparent rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                 <div className="relative flex items-center space-x-4 p-6 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15 hover:bg-white/12 transition-all duration-300 shadow-lg hover:shadow-xl">
                   <div className="flex-shrink-0">
                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                     </div>
                   </div>
                   <div className="flex-1">
                     <div className="text-white font-semibold text-sm leading-tight">Senior-Friendly Score</div>
                     <div className="text-gray-300 text-xs mt-1">in 30 seconds</div>
                   </div>
                 </div>
               </div>
               
               <div className="group relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-teal-500/10 to-transparent rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                 <div className="relative flex items-center space-x-4 p-6 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15 hover:bg-white/12 transition-all duration-300 shadow-lg hover:shadow-xl">
                   <div className="flex-shrink-0">
                     <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                       </svg>
                     </div>
                   </div>
                   <div className="flex-1">
                     <div className="text-white font-semibold text-sm leading-tight">3 tailored improvement</div>
                     <div className="text-gray-300 text-xs mt-1">tips</div>
                   </div>
                 </div>
               </div>
               
               <div className="group relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-transparent rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                 <div className="relative flex items-center space-x-4 p-6 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15 hover:bg-white/12 transition-all duration-300 shadow-lg hover:shadow-xl">
                   <div className="flex-shrink-0">
                     <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                     </div>
                   </div>
                   <div className="flex-1">
                     <div className="text-white font-semibold text-sm leading-tight">100% free</div>
                     <div className="text-gray-300 text-xs mt-1">quick scan</div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Bottom gradient transition */}
       <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50/80 to-transparent"></div>
     </div>

     {/* TRUST BAR SECTION */}
     <section className="relative py-20 bg-white">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
             Making the Web Senior-Friendly
           </h2>
           <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
             Trusted by businesses to create accessible, easy-to-use websites that welcome users of all ages
           </p>
         </div>

         {/* Key metrics */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
           <div className="text-center">
             <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">500+</div>
             <div className="text-gray-700 font-medium">Websites Audited</div>
           </div>
           <div className="text-center">
             <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">85%</div>
             <div className="text-gray-700 font-medium">Improved Accessibility</div>
           </div>
           <div className="text-center">
             <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">95%</div>
             <div className="text-gray-700 font-medium">Client Satisfaction</div>
           </div>
           <div className="text-center">
             <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">30s</div>
             <div className="text-gray-700 font-medium">Quick Assessment</div>
           </div>
         </div>

         {/* Core capabilities */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
           <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-green-100 hover:shadow-xl hover:border-green-200 transition-all duration-300">
             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-lg flex items-center justify-center mb-6">
               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
               </svg>
             </div>
             <h3 className="text-xl font-semibold text-gray-900 mb-4">Accessibility Analysis</h3>
             <p className="text-gray-700 leading-relaxed mb-4">
               Comprehensive evaluation of your website's accessibility for elderly users, focusing on readability, navigation, and usability.
             </p>
           </div>

           <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-blue-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
             <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-6">
               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <h3 className="text-xl font-semibold text-gray-900 mb-4">Seal of Approval</h3>
             <p className="text-gray-700 leading-relaxed mb-4">
               Earn the SilverSurfers certification badge to display on your website, showing your commitment to inclusive design.
             </p>
           </div>

           <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-teal-100 hover:shadow-xl hover:border-teal-200 transition-all duration-300">
             <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mb-6">
               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
             </div>
             <h3 className="text-xl font-semibold text-gray-900 mb-4">Improvement Guide</h3>
             <p className="text-gray-700 leading-relaxed mb-4">
               Receive detailed, actionable recommendations to enhance your website's usability for elderly visitors.
             </p>
           </div>
         </div>
       </div>
     </section>

     {/* HOW IT WORKS SECTION */}
     <section className="relative py-20 bg-gradient-to-br from-slate-50 via-green-50/20 to-blue-50/20">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
             How SilverSurfers Works
           </h2>
           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
             Simple 3-step process to make your website senior-friendly and earn your seal of approval
           </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
           <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 text-center">
             <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                 1
               </div>
             </div>
             <div className="mt-6 mb-6">
               <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl mx-auto flex items-center justify-center mb-6">
                 <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Scan</h3>
               <p className="text-gray-600 leading-relaxed">
                 Enter your URL to get an instant Senior-Friendly Score and see how accessible your website is to elderly users.
               </p>
             </div>
           </div>

           <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 text-center">
             <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
               <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                 2
               </div>
             </div>
             <div className="mt-6 mb-6">
               <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl mx-auto flex items-center justify-center mb-6">
                 <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Improvements</h3>
               <p className="text-gray-600 leading-relaxed">
                 Receive detailed recommendations on font sizes, color contrast, navigation, and other senior-friendly features.
               </p>
             </div>
           </div>

           <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 text-center">
             <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
               <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                 3
               </div>
             </div>
             <div className="mt-6 mb-6">
               <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl mx-auto flex items-center justify-center mb-6">
                 <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 mb-4">Earn Your Seal</h3>
               <p className="text-gray-600 leading-relaxed">
                 Once you meet our standards, earn the SilverSurfers seal of approval to proudly display on your website.
               </p>
             </div>
           </div>
         </div>

         <div className="text-center">
           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
           <button 
             onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
             className="px-8 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 hover:from-blue-700 hover:via-green-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
           >
             Start with a Free Scan
           </button>
           <button 
             onClick={navigateToServices}
             className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 text-lg"
           >
             See Our Services
           </button>
           </div>
         </div>
       </div>
     </section>

     {/* TESTIMONIAL SECTION */}
     <section className="relative py-20 bg-gradient-to-br from-green-50/30 to-blue-50/20">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-lg border border-green-100">
           <svg className="w-16 h-16 text-green-300 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
             <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
           </svg>
           <blockquote className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed mb-8">
             "SilverSurfers helped us create a website that our older customers can actually use. Our conversion rate from senior visitors increased by 40% after implementing their recommendations."
           </blockquote>
           <div className="flex items-center justify-center space-x-4">
             <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
               <span className="text-white font-bold text-lg">M</span>
             </div>
             <div className="text-left">
               <div className="font-semibold text-gray-900">Maria Rodriguez</div>
               <div className="text-gray-600">Owner, Sunset Health Services</div>
             </div>
           </div>
         </div>
       </div>
     </section>

     {/* FINAL CTA SECTION */}
     <section className="relative py-20 bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-tl from-green-600/20 via-transparent to-blue-600/10"></div>
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,197,94,0.1),transparent_50%)]"></div>
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
       
       <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
           Ready to welcome{' '}
           <span className="bg-gradient-to-r from-blue-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
             all generations?
           </span>
         </h2>
         <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
           Start your journey to creating a senior-friendly website. Get your free assessment and discover how to make your site accessible to users of all ages.
         </p>
         <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button 
          onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 hover:from-blue-700 hover:via-green-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
        >
          Get Your Free Assessment
        </button>
        <button 
          onClick={navigateToContact}
          className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-semibold rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-lg"
        >
          Contact Our Team
        </button>
         </div>
       </div>
     </section>
     
     <ScanResultsModal 
        result={scanResult}
        isVisible={showResultsModal}
        onClose={handleCloseModal}
      />
   </div>
 );
};

export default MainScreen;
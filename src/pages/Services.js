import React from 'react';

const Services = () => {
  const packages = [
    {
      id: 1,
      name: "SilverSurfers Starter",
      icon: "🚀",
      originalPrice: "$69",
      discountedPrice: "$29",
      period: "month",
      description: "Perfect for small businesses starting their accessibility journey.",
      features: [
        "SilverSurfers Score",
        "Limited scans",
        "Basic reports",
        "Single User"
      ],
      annualOffer: "$197 for one year – special offer",
      cta: "Purchase Now",
      popular: false,
      gradient: "from-blue-500 to-green-500"
    },
    {
      id: 2,
      name: "SilverSurfers Pro",
      icon: "⭐",
      originalPrice: "$399",
      discountedPrice: "$99",
      period: "month",
      description: "Comprehensive accessibility solution for growing businesses.",
      features: [
        "SilverSurfers Score",
        "Increased scans",
        "Detailed reports",
        "Multi-users",
        "SilverSurfers Seal of Approval"
      ],
      annualOffer: "$899 for one year – special offer",
      cta: "Purchase Now",
      popular: true,
      highlight: "Most Popular",
      gradient: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      name: "SilverSurfers Custom",
      icon: "🏆",
      price: "Contact us for pricing",
      period: "",
      description: "Tailored solutions for enterprise-level accessibility needs.",
      features: [
        "SilverSurfers Score",
        "Unlimited scans",
        "SilverSurfers Seal of Approval",
        "Advanced analytics",
        "API access",
        "White labeling options",
        "Dedicated support",
        "And much more!"
      ],
      cta: "Contact Us",
      popular: false,
      gradient: "from-purple-500 to-blue-500"
    }
  ];

  const freeAudit = {
    name: "Quick Scan Report",
    icon: "🔍",
    price: "Always free",
    description: "Quick Scan version of the SilverSurfers report – a quick snapshot and your SilverSurfers Score.",
    features: [
      "SilverSurfers Score (0-100)",
      "High-level improvement recommendations",
      "Email copy of results"
    ],
    cta: "Get Quick Scan Report",
    highlight: "Start here - No cost",
    gradient: "from-green-500 to-teal-500"
  };

  const comparisonData = [
    { feature: "AI Visibility Score", free: "Basic", report: "Detailed", optimization: "Detailed + Implementation", premium: "Detailed + Ongoing" },
    { feature: "Content Analysis", free: "✓", report: "✓", optimization: "✓", premium: "✓" },
    { feature: "Technical Analysis", free: "✓", report: "✓", optimization: "✓", premium: "✓" },
    { feature: "Detailed Recommendations", free: "✗", report: "✓", optimization: "✓", premium: "✓" },
    { feature: "Content Optimization", free: "✗", report: "✗", optimization: "✓", premium: "✓" },
    { feature: "Technical Implementation", free: "✗", report: "✗", optimization: "✓", premium: "✓" },
    { feature: "Ongoing Support", free: "✗", report: "30 days", optimization: "3 months", premium: "Ongoing" },
    { feature: "Strategy Calls", free: "✗", report: "✗", optimization: "✗", premium: "Quarterly" },
    { feature: "Custom Solutions", free: "✗", report: "✗", optimization: "✗", premium: "✓" }
  ];


  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
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
        <div className="relative z-10 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h1 className="heading-hero text-white mb-6">
                <span className="block bg-gradient-to-r from-blue-300 via-green-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent leading-tight" style={{lineHeight: '1.2', paddingBottom: '0.1em'}}>
                  Service Packages & Pricing
                </span>
              </h1>
              
              <h2 className="text-xl sm:text-2xl text-gray-200 font-light leading-relaxed max-w-4xl mx-auto">
                We help businesses create digital experiences that engage and delight older adults — with expert digital experience assessments, actionable enhancements, and certification to showcase your commitment to accessibility.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Free Audit Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Start Here - Completely Free</h2>
            <p className="text-xl text-gray-600 leading-relaxed">Get immediate insights into your current digital experience</p>
          </div>
          
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 lg:p-12 border-2 border-blue-200 shadow-xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                {freeAudit.highlight}
              </span>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{freeAudit.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">{freeAudit.name}</h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-6">
                {freeAudit.price}
              </div>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">{freeAudit.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-6">What you get:</h4>
                <ul className="space-y-4">
                  {freeAudit.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700 text-lg leading-relaxed">
                      <svg className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                <a href="/?openScan=1" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-green-600 to-teal-500 hover:from-blue-600 hover:via-blue-700 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
                  {freeAudit.cta}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <p className="text-lg text-gray-500 mt-4 leading-relaxed">No credit card required • Takes 30 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Packages */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Packages</h2>
            <p className="text-xl text-gray-600">Focused, value-packed deliverables designed for real impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${pkg.popular ? 'border-blue-500 scale-105' : 'border-gray-200'}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {pkg.highlight}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{pkg.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                  
                  {pkg.price ? (
                    <div className="text-3xl font-bold text-gray-900 mb-2">{pkg.price}</div>
                  ) : (
                    <div className="mb-2">
                      <div className="text-lg text-gray-500 line-through">{pkg.originalPrice}/{pkg.period}</div>
                      <div className={`text-3xl font-bold bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent`}>
                        {pkg.discountedPrice}/{pkg.period}
                      </div>
                      <div className="text-sm text-gray-500 italic">limited time offer</div>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.annualOffer && (
                  <div className="text-center mb-6">
                    <div className="text-sm text-gray-600 italic">{pkg.annualOffer}</div>
                  </div>
                )}

                <div className="text-center">
                  <a 
                    href={pkg.id === 3 ? "/contact" : `/checkout?pkg=${pkg.id}`}
                    className={`inline-block px-8 py-4 bg-gradient-to-r ${pkg.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                  >
                    {pkg.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Choose Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Choose Your Package</h2>
            <p className="text-lg text-gray-600">Not sure which package is right for you? Here's our guide</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
            {[
              { title: "Start with a Quick Scan", desc: "Get a quick snapshot of your digital experience in 30 seconds.", cta: "Get Quick Scan Report", link: "/?openScan=1" },
              { title: "SilverSurfers Starter", desc: "Want a simple analysis? Perfect for small businesses.", cta: "Purchase Report", link: `/checkout?pkg=${packages[0].id}` }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6 text-base">{item.desc}</p>
                <div className="mt-auto">
                  <a href={item.link} className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-500 via-green-600 to-teal-500 text-white font-medium rounded-lg shadow-sm hover:shadow-md hover:from-blue-600 hover:via-blue-700 hover:to-green-600 transition-all duration-300 w-full sm:w-auto">
                    {item.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-green-950 via-teal-950 to-cyan-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-200 mb-8">Join the growing community of businesses elevating their digital experience with SilverSurfers.ai</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/?openScan=1" className="px-8 py-4 bg-gradient-to-r from-blue-500 via-green-600 to-teal-500 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Get Quick Scan Report
            </a>
            <a href="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* No modal needed for single package */}
    </div>
  );
};

export default Services;
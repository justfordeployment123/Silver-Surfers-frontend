import React from 'react';

const Services = () => {
  const packages = [
    {
      id: 1,
      name: "Senior-Friendly Assessment",
      icon: "📊",
      price: "€299",
      period: "one-time",
      description: "A comprehensive evaluation of your website's accessibility and usability for elderly users.",
      features: [
        "Complete accessibility audit (20+ page PDF)",
        "Readability and font size analysis",
        "Color contrast and visual clarity review",
        "Navigation simplicity assessment",
        "Mobile responsiveness for senior users",
        "Detailed improvement recommendations",
        "Step-by-step implementation guide"
      ],
      bestFor: "Businesses wanting to understand and improve their website's senior-friendliness.",
      delivery: "Optional quarterly follow-up: From €150/quarter – includes progress reviews and updated recommendations.",
      cta: "Get Assessment",
      popular: false,
      highlight: "Perfect starting point",
      gradient: "from-blue-500 to-orange-500"
    },
    {
      id: 2,
      name: "Full Accessibility Optimization",
      icon: "⚡",
      price: "From €1,500",
      period: "one-time",
      description: "We implement all necessary changes to make your website truly senior-friendly and earn your SilverSurfers seal.",
      features: [
        "Everything in the Assessment, plus:",
        "Font size and readability improvements",
        "Color contrast optimization",
        "Navigation menu simplification",
        "Mobile interface enhancement for seniors",
        "Help section and tutorials creation",
        "SilverSurfers certification badge"
      ],
      bestFor: "Businesses ready to fully commit to senior-friendly web design.",
      delivery: "Optional monthly monitoring: From €350/month – includes ongoing optimizations and user feedback integration.",
      cta: "Start Optimization",
      popular: true,
      highlight: "Most popular choice",
      gradient: "from-orange-500 to-blue-500"
    },
    {
      id: 3,
      name: "Premium Senior Experience",
      icon: "👑",
      price: "From €2,500",
      period: "one-time",
      description: "Complete transformation into a senior-first website with ongoing support and user testing.",
      features: [
        "Everything in Full Optimization, plus:",
        "User testing with elderly focus groups",
        "Custom senior-friendly feature development",
        "Voice interface integration guidance",
        "Comprehensive user experience redesign",
        "Quarterly user feedback sessions",
        "Priority SilverSurfers certification"
      ],
      bestFor: "Enterprises committed to becoming leaders in senior-accessible web design.",
      delivery: "Ongoing partnership: From €500/month – includes continuous user testing, feature updates, and accessibility trend monitoring.",
      cta: "Contact Sales",
      popular: false,
      highlight: "Enterprise solution",
      gradient: "from-blue-500 to-orange-500"
    }
  ];

  const freeAudit = {
    name: "Quick Scan Report",
    icon: "🔍",
    price: "Always free",
    description: "Quick Scan version of the SilverSurfers report – a quick snapshot and your SilverSurfers Score.",
    features: [
      "SilverSurfers Score (0-100)",
      "2-3 high-level improvement recommendations",
      "Email copy of results"
    ],
    cta: "Get Quick Scan Report",
    highlight: "Start here - No cost",
    gradient: "from-orange-500 to-blue-500"
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

  const primary = packages[0];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section - FIXED: Added pt-32 for header spacing and increased height */}
      <section className="relative py-32 pt-32 bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 via-transparent to-orange-500/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-400/25 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-gradient-to-br from-blue-400/15 to-orange-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-48 h-48 bg-gradient-to-br from-orange-400/20 to-blue-500/25 rounded-full blur-xl animate-pulse delay-1500"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-orange-300 bg-clip-text text-transparent">
                Service Packages & Pricing</span>
            </h1>
              <p className="text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                We help businesses create digital experiences that engage and delight older adults — with expert digital experience assessments, actionable enhancements, and certification to showcase your commitment to accessibility.
              </p>

          </div>
        </div>
      </section>

      {/* Free Audit Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Here - Completely Free</h2>
            <p className="text-lg text-gray-600">Get immediate insights into your current digital experience</p>
          </div>
          
          <div className="relative bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-8 lg:p-12 border-2 border-blue-200 shadow-xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                {freeAudit.highlight}
              </span>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{freeAudit.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{freeAudit.name}</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-4">
                {freeAudit.price}
              </div>
              <p className="text-gray-700 mb-6">{freeAudit.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What you get:</h4>
                <ul className="space-y-3">
                  {freeAudit.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 text-base">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                <a href="/?openScan=1" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-orange-500 hover:from-blue-600 hover:via-blue-700 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
                  {freeAudit.cta}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <p className="text-base text-gray-500 mt-3">No credit card required • Takes 30 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Package */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Package</h2>
            <p className="text-xl text-gray-600">Focused, value-packed deliverable designed for real impact</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{primary.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{primary.name}</h3>
                <div className={`text-4xl font-extrabold bg-gradient-to-r ${primary.gradient} bg-clip-text text-transparent mb-2`}>
                  {primary.price}
                </div>
                <div className="text-gray-500 text-base">{primary.period}</div>
              </div>

              <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">{primary.description}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                  <ul className="space-y-2">
                    {primary.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-base text-gray-700">
                        <svg className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="text-base"><span className="font-medium text-gray-900">Best for:</span> <span className="text-gray-700">{primary.bestFor}</span></div>
                  <div className="text-base"><span className="font-medium text-gray-900">Delivery:</span> <span className="text-gray-700">{primary.delivery}</span></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`/checkout?pkg=${primary.id}`} className={`px-8 py-4 bg-gradient-to-r ${primary.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                  View & Purchase Report
                </a>
                <a href="/contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300">
                  Contact Us
                </a>
              </div>

            </div>
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
              { title: "SilverSurfers Starter", desc: "Want a simple analysis? Perfect for small businesses.", cta: "Purchase Report", link: `/checkout?pkg=${primary.id}` }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6 text-base">{item.desc}</p>
                <div className="mt-auto">
                  <a href={item.link} className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-500 via-blue-600 to-orange-500 text-white font-medium rounded-lg shadow-sm hover:shadow-md hover:from-blue-600 hover:via-blue-700 hover:to-orange-600 transition-all duration-300 w-full sm:w-auto">
                    {item.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
  <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-200 mb-8">Join the growing community of businesses elevating their digital experience with SilverSurfers.ai</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/?openScan=1" className="px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-orange-500 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
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
import React from 'react';

const About = () => {
  const mission = {
    title: "Our Mission: Making the Web Accessible for Everyone",
    description: "SilverSurfers was founded on the belief that the internet should be welcoming to users of all ages. As the population ages and more seniors go online, we recognized the need for websites that truly serve elderly users. Our mission is to bridge the digital divide by helping businesses create senior-friendly websites that provide excellent user experiences for all generations.",
  };

  const approach = [
    {
      icon: "♿",
      title: "Accessibility First",
      description: "We prioritize inclusive design principles that make websites usable for people with varying abilities and tech skills."
    },
    {
      icon: "👥",
      title: "User-Centered",
      description: "Every recommendation is based on real user research and testing with elderly participants."
    },
    {
      icon: "🎯",
      title: "Results-Driven",
      description: "We measure success by improved user engagement, reduced bounce rates, and positive feedback from senior users."
    },
    {
      icon: "🤝",
      title: "Partnership",
      description: "We work closely with your team to implement changes that respect your brand while improving accessibility."
    }
  ];

  const stats = [
    { number: "50M+", label: "Seniors Online", description: "Active internet users over 65 worldwide" },
    { number: "500+", label: "Sites Audited", description: "Websites improved for senior accessibility" },
    { number: "85%", label: "Better Usability", description: "Average improvement in senior user experience" },
    { number: "2020", label: "Founded", description: "Leading senior-friendly web design" }
  ];

  const timeline = [
    {
      year: "2019",
      title: "The Beginning",
      description: "Founded as traditional SEO consultancy, noticing early shifts in search behavior"
    },
    {
      year: "2020",
      title: "The Beginning",
      description: "Started with accessibility audits focused on readability and contrast"
    },
    {
      year: "2022",
      title: "User Testing at Scale",
      description: "Ran studies with senior users to refine our recommendations"
    },
    {
      year: "2023",
      title: "Certification Program",
      description: "Launched the SilverSurfers seal of approval for compliant sites"
    },
    {
      year: "2024",
      title: "Growing Impact",
      description: "Helped 500+ businesses improve senior user satisfaction"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 pt-32 bg-hero-silver overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-green-600/20 via-transparent to-blue-600/10"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-500/15 to-purple-600/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/15 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-gradient-to-br from-indigo-400/12 to-purple-500/18 rounded-full blur-2xl animate-pulse delay-1400"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-silver-gradient">About SilverSurfers</span>
              <span className="block text-white mt-2">Senior-Friendly Web Experts</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">We help businesses make their websites welcoming and easy for older adults.</p>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {mission.title}
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 via-blue-50/50 to-teal-50/30 rounded-3xl p-8 lg:p-12 border border-green-100 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                {mission.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
  <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-lg text-gray-600">Measurable results across the AI visibility landscape</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">How we became leaders in AI visibility optimization</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-green-600 to-blue-600"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full z-10"></div>
                  
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
                      <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values/Approach Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach & Values</h2>
            <p className="text-lg text-gray-600">The core principles that guide our work</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {approach.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Platform Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Focus On</h2>
            <p className="text-lg text-gray-600">Key elements that make websites easier for seniors</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: "Readable Fonts", company: "Typography", color: "from-green-400 to-blue-500" },
              { name: "High Contrast", company: "Visibility", color: "from-blue-400 to-teal-500" },
              { name: "Simple Navigation", company: "Usability", color: "from-teal-400 to-cyan-500" },
              { name: "Mobile Friendly", company: "Responsive", color: "from-green-400 to-teal-500" },
              { name: "Clear Labels", company: "Content", color: "from-blue-400 to-green-500" }
            ].map((platform, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-br ${platform.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-900">{platform.name}</div>
                <div className="text-xs text-gray-600">{platform.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-green-600/20 via-transparent to-blue-600/10"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Curious to learn more or have questions?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            We're not a faceless AI – we're people who love to talk about this stuff! Feel free to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-8 py-4 btn-silver text-gray-900 font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">Contact Us</a>
            <a href="mailto:hello@silversurfers.io" className="px-8 py-4 btn-silver-outline font-semibold rounded-xl transition-all duration-300">Email Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
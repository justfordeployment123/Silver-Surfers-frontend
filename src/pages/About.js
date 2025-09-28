import React from 'react';

const About = () => {
  const mission = {
  title: "Our Mission: Making the Web Accessible for Everyone",
  description: "SilverSurfers was founded on the belief that the digital world should be welcoming to people of all ages. As more adults over 50 engage online, we saw a growing need for digital experiences that truly serve them. Our mission is to bridge the digital divide by helping businesses create inclusive, older adult–friendly experiences that work beautifully for every generation.",
  };

  const approach = [
    {
      icon: "♿",
      title: "Accessibility First",
      description: "We utilize inclusive design principles that ensure digital experiences are usable for people of all abilities and technical skill levels."
    },
    {
      icon: "👥",
      title: "User-Focused",
      description: "Every recommendation is based on real user research and testing with older adult participants."
    },
    {
      icon: "🎯",
      title: "Results-Driven",
      description: "We measure success by improved user engagement, reduced bounce rates, and positive feedback from older adult users."
    },
    {
      icon: "🤝",
      title: "Partnership",
      description: "We work with your team to enhance accessibility & inclusivity while preserving the integrity of your brand."
    }
  ];

  const stats = [
    { number: "124M+", label: "SilverSurfers Online", description: "Active older adults utilizing digital services" },
    { number: "500+", label: "Sites Audited", description: "Digital experiences improved for older adults" },
    { number: "85%", label: "Better Usability", description: "Average improvement in older adult digital experiences" }
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
      <section className="relative py-32 pt-32 bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 via-transparent to-orange-500/10"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/15 to-orange-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-blue-500/15 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-gradient-to-br from-blue-400/12 to-orange-500/18 rounded-full blur-2xl animate-pulse delay-1400"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-16">
            <h1 className="heading-hero font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-orange-300 bg-clip-text text-transparent">About SilverSurfers</span>
              <span className="block text-white mt-2">Experts in Creating Inclusive Digital Experiences</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">We help businesses make their digital experiences welcoming and easy to use for older adults.</p>
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
            
            <div className="bg-gradient-to-br from-blue-50 via-orange-50/50 to-blue-50/30 rounded-3xl p-8 lg:p-12 border border-blue-100 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                {mission.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">Measurable results across digital platforms</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto justify-items-center">
            {stats.map((stat, index) => (
              <div key={index} className="w-full sm:w-80 bg-white rounded-2xl p-8 shadow-lg border border-green-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
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
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl flex items-center justify-center text-2xl">
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

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide how we serve, innovate, and build inclusive digital experiences</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { letter: 'S', title: 'Serve', description: 'We put people first and lead with purpose' },
              { letter: 'I', title: 'Innovation', description: 'We spark fresh ideas to shape the future' },
              { letter: 'L', title: 'Learning', description: 'We stay curious and grow through every challenge' },
              { letter: 'V', title: 'Value', description: 'We deliver meaningful impact for our clients and users' },
              { letter: 'E', title: 'Excellence', description: 'We pursue the highest standards in all we do' },
              { letter: 'R', title: 'Relationships', description: 'We build lasting connections based on trust and respect' }
            ].map((val, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-orange-50/40 rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-start space-x-6">
                <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-blue-500 via-blue-600 to-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-md">
                  {val.letter}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{val.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-base">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 via-transparent to-orange-500/10"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Curious to learn more or have questions?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            We're not a faceless company – we're people who care deeply about inclusive, older adult–friendly digital experiences. Reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact#contact-form" className="px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-orange-500 hover:from-blue-600 hover:via-blue-700 hover:to-orange-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
import React, { useEffect, useMemo, useState } from 'react';
import './Blog.css';
import { API_BASE, fetchJSON } from '../config/apiBase';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [emailSubscribe, setEmailSubscribe] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'accessibility', name: 'Accessibility' },
    { id: 'design', name: 'Design' },
    { id: 'usability', name: 'Usability' },
    { id: 'case-studies', name: 'Case Studies' }
  ];

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true); setError(null);
      const { ok, data } = await fetchJSON('/blogs?published=true');
      if (!active) return;
      if (ok) {
        const items = Array.isArray(data.items) ? data.items : (data.blogs || data.posts || []);
        setPosts(items);
        setLoading(false);
      } else {
        setError(data?.error || 'Failed to load posts');
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  // Dynamically derive topic counts from loaded posts (fallback removed static placeholders)
  const topicCounts = useMemo(() => {
    if (!posts || !posts.length) return {};
    const counts = {};
    posts.forEach(p => {
      // Allow multiple tags if provided (comma separated or array). Fallback to category.
      const raw = (p.tags || p.tag || p.category || 'general');
      const tagList = Array.isArray(raw) ? raw : String(raw).split(/[,|]/);
      tagList.map(t => t.trim()).filter(Boolean).forEach(t => {
        const key = t.toLowerCase();
        counts[key] = (counts[key] || 0) + 1;
      });
    });
    return counts;
  }, [posts]);

  // Map raw keys to human readable labels & optional gradients
  const topicMeta = {
    'readable fonts': { label: 'Readable Fonts', gradient: 'blue-green', icon: 'font' },
    'fonts': { label: 'Readable Fonts', gradient: 'blue-green', icon: 'font' },
    'color contrast': { label: 'Color Contrast', gradient: 'blue-cyan', icon: 'palette' },
    'contrast': { label: 'Color Contrast', gradient: 'blue-cyan', icon: 'palette' },
    'navigation': { label: 'Simple Navigation', gradient: 'blue-green-light', icon: 'navigation' },
    'simple navigation': { label: 'Simple Navigation', gradient: 'blue-green-light', icon: 'navigation' },
    'mobile usability': { label: 'Mobile Usability', gradient: 'green-blue', icon: 'mobile' },
    'mobile': { label: 'Mobile Usability', gradient: 'green-teal', icon: 'mobile' },
    'case studies': { label: 'Case Studies', gradient: 'blue-teal', icon: 'book' },
    'case-studies': { label: 'Case Studies', gradient: 'blue-teal', icon: 'book' },
    'accessibility': { label: 'Accessibility', gradient: 'blue-cyan', icon: 'accessibility' },
    'usability': { label: 'Usability', gradient: 'green-teal', icon: 'usability' },
    'design': { label: 'Design', gradient: 'teal-cyan', icon: 'design' }
  };

  const derivedTopics = useMemo(() => {
    const topics = Object.entries(topicCounts)
      .map(([key, count]) => {
        const meta = topicMeta[key] || { label: key.replace(/\b\w/g, c => c.toUpperCase()), gradient: 'blue-green', icon: 'book' };
        return { key, name: meta.label, count, gradient: meta.gradient, icon: meta.icon };
      })
      .filter(t => t.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
    
    console.log('Derived topics:', topics);
    return topics;
  }, [topicCounts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return posts;
    return posts.filter(post => (post.category || '').toLowerCase() === selectedCategory);
  }, [posts, selectedCategory]);

  const featuredPost = useMemo(() => {
    // Pick the latest as featured if backend doesn't mark
    if (!posts.length) return null;
    return posts[0];
  }, [posts]);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing:', emailSubscribe);
    setEmailSubscribe('');
    alert('Thank you for subscribing!');
  };

  const getIcon = (iconType) => {
    console.log('Getting icon for:', iconType);
    switch (iconType) {
      case 'book':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        );
      case 'font':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        );
      case 'palette':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        );
      case 'navigation':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        );
      case 'mobile':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        );
      case 'accessibility':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        );
      case 'usability':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        );
      case 'design':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        );
      default:
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        );
    }
  };

  const navigateToPost = (slug) => {
    window.location.href = `/blog/${slug}`;
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  const navigateToContact = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="blog-container">
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
                  Accessibility & Silver UX
                </span>
              </h1>
              
              <h2 className="text-xl sm:text-2xl text-gray-200 font-light leading-relaxed max-w-4xl mx-auto">
                Practical guides, tips, and case studies on creating a delightful digital experience.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Post */}
  {featuredPost && !loading && (
        <section className="featured-section">
          <div className="featured-container">
            <div className="featured-card">
              <div className="featured-badge">Featured Insight</div>
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              <div className="featured-meta">
                <div className="meta-item">
                  <svg className="meta-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  By {featuredPost.author}
                </div>
                <div className="meta-item">
                  <svg className="meta-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {new Date(featuredPost.date).toLocaleDateString()}
                </div>
                <div className="meta-item">
                  <svg className="meta-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {featuredPost.readTime}
                </div>
              </div>
              <button 
                type="button"
                onClick={() => navigateToPost(featuredPost.slug)}
                className="featured-button"
              >
                Read Full Article
                <svg className="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="filters-section">
        <div className="filters-container">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="posts-section">
        <div className="posts-container">
          {loading && <p className="text-center text-white">Loading posts...</p>}
          {error && <p className="text-center text-red-400 text-sm">{String(error)}</p>}
          {!loading && !error && regularPosts.length > 0 ? (
            <div className="posts-grid">
              {regularPosts.map((post) => (
                <article key={post.id} className="post-card">
                  <div className="post-category">
                    {(post.category || 'general').replace('-', ' ').toUpperCase()}
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    {post.author && <span>By {post.author}</span>}
                    {(post.createdAt || post.date) && <span>{new Date(post.createdAt || post.date).toLocaleDateString()}</span>}
                    {post.readTime && <span>{post.readTime}</span>}
                  </div>
                  <button 
                    type="button"
                    onClick={() => navigateToPost(post.slug)}
                    className="post-link"
                  >
                    Read More
                    <svg className="link-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </article>
              ))}
            </div>
          ) : (!loading && !error && (
            <div className="no-posts">
              <div className="no-posts-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="no-posts-title">No posts found for this category</h3>
              <p className="no-posts-text">Try selecting a different category or check back later for new content.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Topics (only if real derivedTopics exist) */}
      {derivedTopics.length > 0 && (
        <section className="topics-section">
          <div className="topics-container">
            <div className="topics-header">
              <h2 className="topics-title">Explore Our Insights</h2>
              <p className="topics-subtitle">Dive deeper into the topics that matter most for AI visibility</p>
            </div>
            <div className="topics-grid">
              {derivedTopics.map((topic) => (
                <div key={topic.key} className="topic-card">
                  <div className={`topic-icon ${topic.gradient}`}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {getIcon(topic.icon)}
                    </svg>
                  </div>
                  <h3 className="topic-name">{topic.name}</h3>
                  <span className="topic-count">{topic.count} {topic.count === 1 ? 'article' : 'articles'}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-green-950 via-teal-950 to-cyan-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-200 mb-8">Join the growing community of businesses elevating their digital experience with SilverSurfers.ai</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              type="button"
              onClick={navigateToHome}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-green-600 to-teal-500 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get Quick Scan Report
            </button>
            <button 
              type="button"
              onClick={navigateToContact}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
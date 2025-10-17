import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJSON } from '../config/apiBase';
import './Blog.css';

export default function BlogPost() {
  const { id: slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { ok, data } = await fetchJSON(`/blogs/${slug}`);
        
        if (ok) {
          setPost(data.post);
        } else {
          setError(data?.error || 'Failed to load blog post');
        }
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Blog post fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="pt-40 text-center text-white bg-gradient-to-br from-blue-950 via-green-950 via-teal-950 to-cyan-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="pt-40 text-center text-white bg-gradient-to-br from-blue-950 via-green-950 via-teal-950 to-cyan-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <p>{error || 'Post not found.'}</p>
          <div className="mt-6">
            <Link to="/blog" className="text-blue-300 hover:text-blue-200">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen pt-32 pb-24 bg-gradient-to-br from-blue-950 via-green-950 via-teal-950 to-cyan-900 text-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <Link to="/blog" className="text-sm text-blue-300 hover:text-blue-200">
            &larr; Back to Blog
          </Link>
        </div>
        <h1 className="heading-page font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap gap-4 text-caption text-gray-200 mb-8">
          {post.category && <span className="uppercase tracking-wide bg-white/10 px-2 py-1 rounded">{post.category}</span>}
          {post.author && <span>By {post.author}</span>}
          {post.readTime && <span>{post.readTime}</span>}
          {post.date && <span>{new Date(post.date).toLocaleDateString()}</span>}
        </div>
        {post.excerpt && <p className="text-lg text-gray-100/90 mb-10">{post.excerpt}</p>}
        <article className="prose prose-invert max-w-none">
          {post.content && post.content.split(/\n{2,}/).map((block, i) => {
            const h2 = block.match(/^##\s+(.*)/);
            const h3 = block.match(/^###\s+(.*)/);
            if (h2) return <h2 key={i}>{h2[1]}</h2>;
            if (h3) return <h3 key={i}>{h3[1]}</h3>;
            return <p key={i}>{block}</p>;
          })}
          {!post.content && (
            <p className="text-gray-400 italic">No content available for this post.</p>
          )}
        </article>
      </div>
    </div>
  );
}
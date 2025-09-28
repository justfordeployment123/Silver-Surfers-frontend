import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Blog.css';

export default function BlogPost() {
  const { id: slug } = useParams();

  // Static dummy posts matching Blog.js
  const posts = useMemo(
    () => [
      {
        slug: 'making-websites-senior-friendly',
        title: 'Making Websites Senior-Friendly: 7 Practical Tips',
        excerpt:
          'Simple changes like larger fonts, clearer contrast, and better spacing can dramatically improve usability for older adults.',
        category: 'ACCESSIBILITY',
        author: 'SilverSurfers Team',
        date: '2025-08-15',
        readTime: '6 min read',
        content:
          '## Start with Readability\nUse at least 16px base font size and 1.6 line-height.\n\n## Boost Contrast\nAim for 7:1 contrast for body text.\n\n## Simplify Navigation\nGroup related items, reduce depth, and use clear labels.',
      },
      {
        slug: 'contrast-and-readability-basics',
        title: 'Contrast and Readability Basics for Seniors',
        excerpt:
          'WCAG contrast ratios, recommended font sizes, and real-world examples that help older eyes.',
        category: 'DESIGN',
        author: 'Ava Lee',
        date: '2025-08-01',
        readTime: '5 min read',
        content:
          '## Contrast Ratios\nBody text 7:1, large text 4.5:1.\n\n## Fonts That Help\nSans-serif, avoid thin weights.',
      },
      {
        slug: 'simplifying-navigation',
        title: 'Simplifying Navigation to Reduce Cognitive Load',
        excerpt:
          'Clear labels, fewer choices, and logical grouping make websites easier to use for everyone.',
        category: 'USABILITY',
        author: 'Jordan Park',
        date: '2025-07-20',
        readTime: '7 min read',
        content:
          '## Reduce Choices\nLimit top-level items.\n\n## Clear Labels\nUse everyday language, avoid jargon.',
      },
      {
        slug: 'case-study-senior-conversions-up',
        title: 'Case Study: Senior Conversions Up 40% After Small Changes',
        excerpt:
          'A healthcare site increased senior conversions with simple readability and layout tweaks.',
        category: 'CASE-STUDIES',
        author: 'SilverSurfers Research',
        date: '2025-07-05',
        readTime: '4 min read',
        content:
          '## What Changed\nFont size, spacing, and contrast.\n\n## The Result\nSenior conversion rate up 40%.',
      },
    ],
    []
  );

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-40 text-center text-white bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <p>Post not found.</p>
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
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900 text-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <Link to="/blog" className="text-sm text-blue-300 hover:text-blue-200">
            &larr; Back to Blog
          </Link>
        </div>
        <h1 className="heading-page font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap gap-4 text-caption text-gray-200 mb-8">
          <span className="uppercase tracking-wide bg-white/10 px-2 py-1 rounded">{post.category}</span>
          {post.author && <span>By {post.author}</span>}
          {post.readTime && <span>{post.readTime}</span>}
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <p className="text-lg text-gray-100/90 mb-10">{post.excerpt}</p>
        <article className="prose prose-invert max-w-none">
          {post.content.split(/\n{2,}/).map((block, i) => {
            const h2 = block.match(/^##\s+(.*)/);
            const h3 = block.match(/^###\s+(.*)/);
            if (h2) return <h2 key={i}>{h2[1]}</h2>;
            if (h3) return <h3 key={i}>{h3[1]}</h3>;
            return <p key={i}>{block}</p>;
          })}
        </article>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, Check } from 'lucide-react';

export default function ArticleDetailPage({ slug, navigate, onOpenLetsTalk }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (slug) {
      loadArticle(slug);
    }
  }, [slug]);

  const loadArticle = async (articleSlug) => {
    setLoading(true);
    try {
      const res = await api.getArticleBySlug(articleSlug);
      if (res.success) {
        setArticle(res.article);
      }
    } catch (err) {
      console.error('Error fetching article:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="pt-40 pb-20 max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
        Loading corporate whitepaper...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-40 pb-20 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Article Not Found</h2>
        <p className="text-sm text-gray-600">The requested article could not be located on the server.</p>
        <button
          onClick={() => navigate('/insights')}
          className="px-5 py-2.5 rounded-lg bg-gray-900 text-white font-bold text-xs"
        >
          Return to Insights
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <button
            onClick={() => navigate('/insights')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#7047EB] transition-colors py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Insights</span>
          </button>
        </div>

        {/* Article Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-bold bg-purple-50 text-[#7047EB] border border-purple-100">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.read_time || '5 min read'}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal border-l-4 border-[#7047EB] pl-4 italic bg-purple-50/40 py-2 rounded-r-lg">
            {article.summary}
          </p>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-[#7047EB] flex items-center justify-center font-bold text-sm">
                IVR
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{article.author}</h4>
                <span className="text-xs text-gray-400">IVR Tech Solutions Private Limited</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
              title="Share article URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm">
          <div className="prose prose-slate max-w-none text-gray-700 text-base leading-relaxed space-y-6">
            {article.content.split('\n\n').map((paragraph, idx) => {
              // Simple Markdown list or heading check
              if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
                return (
                  <div key={idx} className="bg-gray-50 p-5 rounded-2xl border border-gray-200/80 my-4">
                    {paragraph.split('\n').map((line, lIdx) => (
                      <p key={lIdx} className="text-sm text-gray-700 py-0.5">
                        {line}
                      </p>
                    ))}
                  </div>
                );
              }
              return (
                <p key={idx} className="text-sm sm:text-base leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Bottom Article CTA */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-gray-900">Have questions about this architecture?</h4>
              <p className="text-xs text-gray-500">Discuss custom software implementation with our engineering leads.</p>
            </div>
            <button
              onClick={onOpenLetsTalk}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white gradient-accent shadow hover:opacity-95 transition"
            >
              Schedule Technical Discussion
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

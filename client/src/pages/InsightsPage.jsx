import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Search, BookOpen, Clock, User, ArrowRight, Sparkles, Filter } from 'lucide-react';

const INSIGHTS_CATEGORIES = [
  'All',
  'Technology',
  'Software Development',
  'Web Development',
  'Artificial Intelligence',
  'Cloud Computing',
  'Company Updates',
  'Digital Transformation',
];

export default function InsightsPage({ navigate, onOpenArticle }) {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, searchTerm]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await api.getArticles({
        category: selectedCategory,
        search: searchTerm,
      });
      if (res.success) {
        setArticles(res.articles || []);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#7047EB] text-xs font-bold uppercase tracking-wider">
              <span>Thought Leadership & Technical Papers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Corporate <span className="gradient-text">Insights & News</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Perspectives on modern enterprise architecture, cloud telephony, practical AI implementation, and digital business strategies from IVR Tech Solutions engineering leads.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles by title, topic, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7047EB] focus:border-transparent outline-none bg-white transition"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {INSIGHTS_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'bg-[#F5F6F8] text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center text-sm text-gray-400">Loading corporate insights...</div>
        ) : articles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 space-y-3">
            <BookOpen className="w-8 h-8 text-gray-400 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">No articles found</h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
              We couldn't find any articles matching your search or category criteria. Try resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="text-xs font-bold text-[#7047EB] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.id}
                className="corporate-card p-7 flex flex-col justify-between group hover:border-[#7047EB]/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-50 text-[#7047EB] border border-purple-100">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.read_time || '5 min read'}</span>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#7047EB] transition-colors leading-snug">
                    {art.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate max-w-[140px]">{art.author}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenArticle) onOpenArticle(art.slug);
                      navigate(`/insights/${art.slug}`);
                    }}
                    className="text-xs font-bold text-[#7047EB] group-hover:text-[#3478E5] inline-flex items-center gap-1"
                  >
                    <span>Read Full</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LetsTalkModal from './components/LetsTalkModal';
import SearchModal from './components/SearchModal';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import InsightsPage from './pages/InsightsPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import LetsTalkPage from './pages/LetsTalkPage';
import AdminPage from './pages/AdminPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isLetsTalkOpen, setIsLetsTalkOpen] = useState(false);
  const [selectedServiceForRfp, setSelectedServiceForRfp] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Listen to browser forward/back buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom client navigation
  const navigate = (path) => {
    if (path.includes('#')) {
      const [base, hash] = path.split('#');
      if (base && base !== currentPath) {
        window.history.pushState({}, '', path);
        setCurrentPath(base);
      } else {
        window.history.pushState({}, '', path);
      }
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openLetsTalk = (serviceName = '') => {
    setSelectedServiceForRfp(serviceName);
    setIsLetsTalkOpen(true);
  };

  const closeLetsTalk = () => {
    setIsLetsTalkOpen(false);
    setSelectedServiceForRfp('');
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // Route Resolution
  const renderPage = () => {
    if (currentPath === '/') {
      return <HomePage navigate={navigate} onOpenLetsTalk={() => openLetsTalk()} />;
    }
    if (currentPath === '/about') {
      return <AboutPage navigate={navigate} onOpenLetsTalk={() => openLetsTalk()} />;
    }
    if (currentPath === '/services') {
      return (
        <ServicesPage
          navigate={navigate}
          onOpenLetsTalk={() => openLetsTalk()}
          onSelectService={(srv) => setSelectedServiceForRfp(srv)}
        />
      );
    }
    if (currentPath === '/work') {
      return <WorkPage navigate={navigate} onOpenLetsTalk={() => openLetsTalk()} />;
    }
    if (currentPath.startsWith('/insights/')) {
      const slug = currentPath.replace('/insights/', '');
      return <ArticleDetailPage slug={slug} navigate={navigate} onOpenLetsTalk={() => openLetsTalk()} />;
    }
    if (currentPath === '/insights') {
      return (
        <InsightsPage
          navigate={navigate}
          onOpenArticle={(slug) => navigate(`/insights/${slug}`)}
        />
      );
    }
    if (currentPath === '/careers') {
      return <CareersPage navigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/lets-talk') {
      return <LetsTalkPage navigate={navigate} />;
    }
    if (currentPath === '/admin') {
      return <AdminPage navigate={navigate} />;
    }
    if (currentPath === '/privacy') {
      return <PrivacyPage navigate={navigate} />;
    }
    if (currentPath === '/terms') {
      return <TermsPage navigate={navigate} />;
    }

    // Default Fallback: Home
    return <HomePage navigate={navigate} onOpenLetsTalk={() => openLetsTalk()} />;
  };

  const isAdmin = currentPath === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F8] text-[#111827]">
      {/* Sticky Header Navbar */}
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        onOpenLetsTalk={() => openLetsTalk()}
        onOpenSearch={openSearch}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Corporate Footer */}
      <Footer navigate={navigate} />

      {/* Global Modals */}
      <LetsTalkModal
        isOpen={isLetsTalkOpen}
        onClose={closeLetsTalk}
        initialService={selectedServiceForRfp}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        navigate={navigate}
      />

      {/* Floating Corporate WhatsApp button (hidden in admin console) */}
      {!isAdmin && <WhatsAppButton />}
    </div>
  );
}

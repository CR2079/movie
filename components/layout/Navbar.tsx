'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Film, Search, Bookmark, Menu, X, Compass, Tv, Sparkles, Heart, House } from 'lucide-react';
import { watchlistStorage } from '@/services/storage/watchlistStorage';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial count
    setWatchlistCount(watchlistStorage.getItems().length);

    // Subscribe to watchlist storage events
    const unsubscribe = watchlistStorage.subscribe((items) => {
      setWatchlistCount(items.length);
    });

    return () => unsubscribe();
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Início', href: '/', icon: <Film className="w-4 h-4" /> },
    { name: 'Filmes', href: '/movies', icon: <Compass className="w-4 h-4" /> },
    { name: 'Séries', href: '/series', icon: <Tv className="w-4 h-4" /> },
    { name: 'Gêneros', href: '/genres', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Minha Lista', href: '/watchlist', icon: <Bookmark className="w-4 h-4" />, badge: watchlistCount },
    { name: 'Sobre', href: '/about' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-lg shadow-black/40 py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group select-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
              <House className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center">
                HOUSE<span className="text-red-500">CINE</span>
              </span>
              <span className="text-[10px] text-zinc-400 tracking-widest uppercase -mt-1 font-semibold">
                Cinema Streaming
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'text-white bg-white/10 shadow-sm'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  {link.name}
                  {typeof link.badge === 'number' && link.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-600 text-white">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Search & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative">
              <input
                type="text"
                placeholder="Buscar filmes, séries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-52 xl:w-64 pl-9 pr-4 py-1.5 text-xs rounded-xl bg-zinc-900/80 border border-zinc-700/60 text-white placeholder-zinc-400 focus:outline-none focus:w-72 focus:border-red-500 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
            </form>

            {/* Mobile/Tablet Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Abrir busca"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Watchlist Quick Icon (Mobile) */}
            <Link
              href="/watchlist"
              className="md:hidden relative p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Minha lista"
            >
              <Bookmark className="w-5 h-5" />
              {watchlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold flex items-center justify-center rounded-full bg-red-600 text-white">
                  {watchlistCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Collapsible Search for Mobile */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden px-4 pt-3 pb-2 border-t border-zinc-800/80 bg-zinc-950/95"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar por título, diretor, ator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-red-500"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-zinc-950/98 backdrop-blur-xl flex flex-col p-6 md:hidden"
          >
            <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CINEPULSE</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-3 mt-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between p-3.5 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                        : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      {link.name}
                    </div>
                    {typeof link.badge === 'number' && link.badge > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-white text-zinc-900">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-zinc-800 text-xs text-zinc-500 text-center">
              © {new Date().getFullYear()} CinePulse Movie Portal.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Star, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { Movie } from '@/types/movie';
import { Button } from '@/components/ui/Button';
import { WatchlistButton } from './WatchlistButton';
import { TrailerModal } from './TrailerModal';

interface HeroBannerProps {
  movies: Movie[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // If no movies provided, fallback gracefully
  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[currentIndex] || movies[0];

  useEffect(() => {
    if (movies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [movies.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const releaseYear = currentMovie.release_date
    ? new Date(currentMovie.release_date).getFullYear()
    : '2024';

  return (
    <div className="relative w-full h-[75vh] min-h-[550px] max-h-[820px] overflow-hidden bg-zinc-950">
      {/* Background Backdrops */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={currentMovie.backdrop_path}
            alt={currentMovie.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/40 to-black/60" />
      <div className="absolute inset-0 hero-gradient-x hidden md:block" />

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl space-y-4"
          >
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-bold tracking-wider uppercase text-[10px]">
                {currentMovie.media_type === 'tv' ? 'Série em Alta' : 'Filme em Destaque'}
              </span>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{currentMovie.vote_average.toFixed(1)}</span>
              </div>

              <span className="text-zinc-300 font-medium">{releaseYear}</span>

              {currentMovie.runtime && (
                <span className="text-zinc-400">• {Math.floor(currentMovie.runtime / 60)}h {currentMovie.runtime % 60}m</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
              {currentMovie.title}
            </h1>

            {/* Tagline or Overview */}
            <p className="text-sm sm:text-base text-zinc-300 line-clamp-3 leading-relaxed drop-shadow">
              {currentMovie.overview}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Play className="w-5 h-5 fill-white" />}
                onClick={() => setIsTrailerOpen(true)}
              >
                Assistir Trailer
              </Button>

              <Link href={`/movie/${currentMovie.id}`}>
                <Button
                  variant="glass"
                  size="lg"
                  leftIcon={<Info className="w-5 h-5" />}
                >
                  Mais Informações
                </Button>
              </Link>

              <WatchlistButton movie={currentMovie} variant="full" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Arrows & Indicators */}
        {movies.length > 1 && (
          <div className="absolute right-4 sm:right-8 bottom-12 flex items-center gap-4">
            <div className="flex gap-1.5 mr-2">
              {movies.slice(0, 5).map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-red-600' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full glass-panel hover:bg-white/20 text-white transition-all cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full glass-panel hover:bg-white/20 text-white transition-all cursor-pointer"
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        movie={currentMovie}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />
    </div>
  );
};

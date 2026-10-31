'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Play, Info } from 'lucide-react';
import { Movie } from '@/types/movie';
import { WatchlistButton } from './WatchlistButton';
import { TrailerModal } from './TrailerModal';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  className?: string;
  priority?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  className,
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '2024';

  const posterSrc = imageError
    ? 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80'
    : movie.poster_path;

  return (
    <>
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'group relative flex flex-col rounded-2xl overflow-hidden glass-panel border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-lg hover:shadow-2xl hover:shadow-black/60',
          className
        )}
      >
        {/* Poster Image Container */}
        <div className="relative w-full aspect-[2/3] overflow-hidden bg-zinc-900">
          <img
            src={posterSrc}
            alt={movie.title}
            onError={() => setImageError(true)}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Rating Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>

          {/* Watchlist Quick Button */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <WatchlistButton movie={movie} variant="icon" />
          </div>

          {/* Hover Overlay with Trailer Quick Action */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsTrailerOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-lg shadow-red-600/40 cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Trailer</span>
              </button>

              <Link
                href={`/movie/${movie.id}`}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                title="Ver detalhes"
              >
                <Info className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Card Info */}
        <Link href={`/movie/${movie.id}`} className="p-3.5 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="font-semibold text-sm text-zinc-100 group-hover:text-red-400 transition-colors line-clamp-1">
              {movie.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              {movie.overview}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 mt-3 pt-2 border-t border-zinc-800/60">
            <span>{releaseYear}</span>
            <span className="uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
              {movie.media_type === 'tv' ? 'Série' : 'Filme'}
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Trailer Modal */}
      <TrailerModal
        movie={movie}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />
    </>
  );
};

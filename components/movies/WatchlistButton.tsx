'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, Check } from 'lucide-react';
import { Movie } from '@/types/movie';
import { watchlistStorage } from '@/services/storage/watchlistStorage';
import { useToast } from '@/components/ui/Toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WatchlistButtonProps {
  movie: Movie;
  variant?: 'icon' | 'full' | 'compact';
  className?: string;
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  movie,
  variant = 'icon',
  className
}) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsInWatchlist(watchlistStorage.isInWatchlist(movie.id));

    const unsubscribe = watchlistStorage.subscribe(() => {
      setIsInWatchlist(watchlistStorage.isInWatchlist(movie.id));
    });

    return () => unsubscribe();
  }, [movie.id]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const added = watchlistStorage.toggleWatchlist(movie);
    if (added) {
      toast(`"${movie.title}" adicionado à sua lista!`, 'success');
    } else {
      toast(`"${movie.title}" removido da sua lista.`, 'info');
    }
  };

  if (variant === 'icon') {
    return (
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className={cn(
          'p-2 rounded-full transition-all cursor-pointer backdrop-blur-md shadow-lg',
          isInWatchlist
            ? 'bg-red-600 text-white'
            : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80 border border-white/10',
          className
        )}
        title={isInWatchlist ? 'Remover da minha lista' : 'Adicionar à minha lista'}
        aria-label="Minha lista"
      >
        {isInWatchlist ? (
          <Check className="w-4 h-4" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
      </motion.button>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleToggle}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors backdrop-blur-sm',
          isInWatchlist
            ? 'bg-red-600 text-white'
            : 'bg-zinc-800/90 text-zinc-200 hover:bg-zinc-700 border border-zinc-700/50',
          className
        )}
      >
        {isInWatchlist ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
        <span>{isInWatchlist ? 'Salvo' : 'Minha Lista'}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleToggle}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all',
        isInWatchlist
          ? 'bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700'
          : 'glass-panel text-white hover:bg-white/15',
        className
      )}
    >
      {isInWatchlist ? (
        <>
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Salvo na Minha Lista</span>
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4" />
          <span>Adicionar à Minha Lista</span>
        </>
      )}
    </motion.button>
  );
};

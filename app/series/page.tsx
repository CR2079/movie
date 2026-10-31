'use client';

import React, { useState, useEffect } from 'react';
import { Tv, Sparkles } from 'lucide-react';
import { Movie } from '@/types/movie';
import { movieService } from '@/services/api/tmdbService';
import { MovieCard } from '@/components/movies/MovieCard';
import { MovieCardSkeleton } from '@/components/ui/Skeleton';

export default function SeriesPage() {
  const [series, setSeries] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSeries() {
      setIsLoading(true);
      try {
        const data = await movieService.getPopularSeries();
        setSeries(data);
      } catch (err) {
        console.error('Erro ao carregar séries:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadSeries();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-400 text-xs font-semibold">
          <Tv className="w-3.5 h-3.5" />
          <span>Produções Televisivas & Streaming</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Séries & Shows Mais Assistidos
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Maratone as melhores séries do momento. Histórias envolventes, temporadas eletrizantes e produções consagradas pelas principais plataformas.
        </p>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : series.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3 max-w-md mx-auto">
          <Tv className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Nenhuma série disponível no momento</h3>
          <p className="text-xs text-zinc-400">Verifique sua conexão ou tente novamente mais tarde.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {series.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      )}
    </div>
  );
}

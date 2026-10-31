'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Shield,
  Smile,
  Compass,
  Ghost,
  Heart,
  Music,
  Globe,
  Film
} from 'lucide-react';
import { Genre } from '@/types/movie';
import { movieService } from '@/services/api/tmdbService';

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    async function loadGenres() {
      const data = await movieService.getGenres();
      setGenres(data);
    }
    loadGenres();
  }, []);

  // Icon mapping helper
  const getGenreIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('ação') || n.includes('action')) return <Flame className="w-6 h-6 text-orange-500" />;
    if (n.includes('aventura')) return <Compass className="w-6 h-6 text-emerald-400" />;
    if (n.includes('comédia')) return <Smile className="w-6 h-6 text-amber-400" />;
    if (n.includes('terror') || n.includes('horror')) return <Ghost className="w-6 h-6 text-rose-500" />;
    if (n.includes('romance')) return <Heart className="w-6 h-6 text-pink-400" />;
    if (n.includes('música')) return <Music className="w-6 h-6 text-purple-400" />;
    if (n.includes('ficção')) return <Sparkles className="w-6 h-6 text-cyan-400" />;
    return <Film className="w-6 h-6 text-red-500" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Categorias & Temáticas</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explorar por Gêneros
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Seja fã de ação visceral, ficção científica alucinante ou dramas profundos, encontre filmes sob medida para o seu humor de hoje.
        </p>
      </div>

      {/* Genres Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/movies?genre=${genre.id}`}
            className="group relative p-6 rounded-2xl glass-panel border border-zinc-800/80 hover:border-red-500/50 hover:bg-zinc-900/90 transition-all shadow-lg flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl group-hover:bg-red-600/15 transition-all -z-10" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-zinc-700 transition-all">
                {getGenreIcon(genre.name)}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                {genre.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                {genre.description || `Explore os melhores filmes e séries de ${genre.name} selecionados pela crítica.`}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors pt-3 border-t border-zinc-800/60">
              <span>Acessar Títulos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-red-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Film, X, TrendingUp } from 'lucide-react';
import { Movie } from '@/types/movie';
import { movieService } from '@/services/api/tmdbService';
import { MovieCard } from '@/components/movies/MovieCard';
import { MovieCardSkeleton } from '@/components/ui/Skeleton';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Movie[]>([]);
  const [suggested, setSuggested] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load recommendations if empty
  useEffect(() => {
    async function loadTrending() {
      const data = await movieService.getTrending();
      setSuggested(data.slice(0, 5));
    }
    loadTrending();
  }, []);

  // Perform search
  useEffect(() => {
    let isCancelled = false;

    async function executeSearch() {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await movieService.searchMovies(query);
        if (!isCancelled) {
          setResults(data);
        }
      } catch (err) {
        console.error('Erro na pesquisa:', err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    const timer = setTimeout(() => {
      executeSearch();
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const handleClear = () => {
    setQuery('');
    router.replace('/search');
  };

  const popularSearches = ['Duna', 'Oppenheimer', 'Interestelar', 'Cyberpunk', 'Homem-Aranha'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Search Header and Input */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Pesquisa & Descoberta
        </h1>
        <p className="text-sm text-zinc-400">
          Encontre títulos, diretores, sagas ou palavras-chave em toda a base de filmes e séries.
        </p>

        {/* Input Field */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Digite o nome do filme, série ou gênero..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-base shadow-xl focus:outline-none focus:border-red-500 transition-colors"
          />
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-4" />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-3.5 p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs text-zinc-500 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Buscas comuns:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 text-xs rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      {query.trim() && (
        <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400 pb-2 border-b border-zinc-800">
          <span>
            Resultados para <strong className="text-white">"{query}"</strong>
          </span>
          <span>{results.length} produções encontradas</span>
        </div>
      )}

      {/* Results Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : query.trim() && results.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto my-8">
          <Film className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Nenhum resultado para "{query}"</h3>
          <p className="text-xs text-zinc-400">
            Experimente buscar com outra grafia ou selecione um dos títulos recomendados abaixo.
          </p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        /* Empty Query State: Show Suggestions */
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold text-lg">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <span>Sugestões em Alta para Você</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {suggested.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-zinc-400">
        Carregando busca...
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}

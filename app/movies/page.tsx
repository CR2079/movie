'use client';

import React, { useState, useEffect, useMemo, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { Film, Sparkles } from 'lucide-react';
import { Movie, Genre, SortOption } from '@/types/movie';
import { movieService } from '@/services/api/tmdbService';
import { MovieCard } from '@/components/movies/MovieCard';
import { FilterBar } from '@/components/movies/FilterBar';
import { MovieCardSkeleton } from '@/components/ui/Skeleton';
import { Suspense } from 'react';

function MoviesCatalogContent() {
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get('genre') ? Number(searchParams.get('genre')) : null;
  const initialSort = (searchParams.get('sort') as SortOption) || 'popularity.desc';

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(initialGenre);
  const [selectedSort, setSelectedSort] = useState<SortOption>(initialSort);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [allMovies, allGenres] = await Promise.all([
          movieService.getTrending(),
          movieService.getGenres()
        ]);
        setMovies(allMovies);
        setGenres(allGenres);
      } catch (err) {
        console.error('Falha ao carregar catálogo:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Update selected genre if URL param changes
  useEffect(() => {
    const genreParam = searchParams.get('genre');
    if (genreParam) {
      setSelectedGenreId(Number(genreParam));
    }
  }, [searchParams]);

  // Filtering & Sorting Logic
  const filteredMovies = useMemo(() => {
    let list = [...movies];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.overview.toLowerCase().includes(q)
      );
    }

    if (selectedGenreId !== null) {
      list = list.filter(
        (m) =>
          m.genre_ids?.includes(selectedGenreId) ||
          m.genres?.some((g) => g.id === selectedGenreId)
      );
    }

    if (selectedSort === 'vote_average.desc') {
      list.sort((a, b) => b.vote_average - a.vote_average);
    } else if (selectedSort === 'release_date.desc') {
      list.sort(
        (a, b) =>
          new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    } else if (selectedSort === 'title.asc') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    return list;
  }, [movies, searchQuery, selectedGenreId, selectedSort]);

  const handleReset = () => {
    setSelectedGenreId(null);
    setSelectedSort('popularity.desc');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-semibold">
          <Film className="w-3.5 h-3.5" />
          <span>Catálogo Geral</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Todos os Filmes & Produções
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Navegue pela nossa biblioteca cinematográfica. Filtre por gênero, descubra lançamentos ou pesquise pelos seus títulos favoritos.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        onSelectGenre={setSelectedGenreId}
        selectedSort={selectedSort}
        onSelectSort={setSelectedSort}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
      />

      {/* Catalog Results Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400 pb-2 border-b border-zinc-800">
        <span>
          Exibindo <strong className="text-white">{filteredMovies.length}</strong> produções encontradas
        </span>
        {selectedGenreId && (
          <span className="text-red-400 font-medium">
            Gênero: {genres.find((g) => g.id === selectedGenreId)?.name || 'Selecionado'}
          </span>
        )}
      </div>

      {/* Grid Display */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Nenhum filme encontrado</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Não encontramos resultados para os filtros selecionados. Tente buscar por outros termos ou redefinir a busca.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-lg shadow-red-600/30 transition-colors cursor-pointer"
          >
            Redefinir Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    }>
      <MoviesCatalogContent />
    </Suspense>
  );
}

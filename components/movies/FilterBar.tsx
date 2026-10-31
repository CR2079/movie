'use client';

import React from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Genre, SortOption } from '@/types/movie';

interface FilterBarProps {
  genres: Genre[];
  selectedGenreId: number | null;
  onSelectGenre: (id: number | null) => void;
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  genres,
  selectedGenreId,
  onSelectGenre,
  selectedSort,
  onSelectSort,
  searchQuery,
  onSearchChange,
  onReset
}) => {
  const hasActiveFilters = Boolean(selectedGenreId || searchQuery || selectedSort !== 'popularity.desc');

  return (
    <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-zinc-800 space-y-4 mb-8">
      {/* Top Bar: Search and Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar por título ou sinopse..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-red-500 transition-colors"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
        </div>

        {/* Sort & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-1.5 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-zinc-400">Ordenar:</span>
            <select
              value={selectedSort}
              onChange={(e) => onSelectSort(e.target.value as SortOption)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="popularity.desc" className="bg-zinc-900 text-white">Mais Populares</option>
              <option value="vote_average.desc" className="bg-zinc-900 text-white">Melhor Avaliados</option>
              <option value="release_date.desc" className="bg-zinc-900 text-white">Lançamentos Recentes</option>
              <option value="title.asc" className="bg-zinc-900 text-white">Título (A-Z)</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl border border-rose-500/20 transition-colors cursor-pointer"
              title="Limpar todos os filtros"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          )}
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div>
        <div className="flex items-center gap-2 mb-2.5 text-xs text-zinc-400 font-medium">
          <Filter className="w-3.5 h-3.5 text-red-500" />
          <span>Filtrar por Gênero:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectGenre(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedGenreId === null
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30 font-semibold'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
            }`}
          >
            Todos
          </button>
          {genres.map((genre) => {
            const isSelected = selectedGenreId === genre.id;
            return (
              <button
                key={genre.id}
                onClick={() => onSelectGenre(isSelected ? null : genre.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30 font-semibold'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                }`}
              >
                {genre.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

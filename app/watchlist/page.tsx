'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, Trash2, CheckCircle2, Clock, PlayCircle, Film, ArrowRight } from 'lucide-react';
import { WatchlistItem, WatchlistStatus } from '@/types/movie';
import { watchlistStorage } from '@/services/storage/watchlistStorage';
import { MovieCard } from '@/components/movies/MovieCard';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    setItems(watchlistStorage.getItems());

    const unsubscribe = watchlistStorage.subscribe((newItems) => {
      setItems(newItems);
    });

    return () => unsubscribe();
  }, []);

  const handleClearAll = () => {
    if (confirm('Tem certeza de que deseja limpar todos os itens da sua lista?')) {
      watchlistStorage.clearWatchlist();
      toast('Sua lista foi limpa com sucesso.', 'info');
    }
  };

  const handleStatusChange = (movieId: string | number, newStatus: WatchlistStatus) => {
    watchlistStorage.updateStatus(movieId, newStatus);
    toast('Status atualizado!', 'success');
  };

  const filteredItems = items.filter((item) => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const countPlan = items.filter((i) => i.status === 'plan_to_watch').length;
  const countWatching = items.filter((i) => i.status === 'watching').length;
  const countCompleted = items.filter((i) => i.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Biblioteca do Usuário</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Minha Lista de Filmes
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Você possui <strong>{items.length}</strong> produções salvas para acompanhar.
          </p>
        </div>

        {items.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Trash2 className="w-4 h-4" />}
            onClick={handleClearAll}
          >
            Limpar Minha Lista
          </Button>
        )}
      </div>

      {/* Status Filter Tabs */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'glass-panel text-zinc-400 hover:text-white'
            }`}
          >
            Todos ({items.length})
          </button>

          <button
            onClick={() => setFilterStatus('plan_to_watch')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === 'plan_to_watch'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'glass-panel text-zinc-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Quero Assistir ({countPlan})</span>
          </button>

          <button
            onClick={() => setFilterStatus('watching')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === 'watching'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'glass-panel text-zinc-400 hover:text-white'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Assistindo ({countWatching})</span>
          </button>

          <button
            onClick={() => setFilterStatus('completed')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === 'completed'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'glass-panel text-zinc-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Já Assistidos ({countCompleted})</span>
          </button>
        </div>
      )}

      {/* Grid or Empty State */}
      {items.length === 0 ? (
        <div className="glass-panel p-16 rounded-3xl text-center space-y-4 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <Bookmark className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Sua lista está vazia</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Navegue pelos filmes em destaque ou use a barra de busca para salvar títulos que você deseja assistir depois.
          </p>
          <div className="pt-2">
            <Link href="/movies">
              <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explorar Catálogo de Filmes
              </Button>
            </Link>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="glass-panel p-10 rounded-2xl text-center text-zinc-400 text-sm">
          Nenhum filme nesta categoria de status.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredItems.map(({ movie, status }) => (
            <div key={movie.id} className="flex flex-col gap-2">
              <MovieCard movie={movie} />

              {/* Status Switcher */}
              <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px]">
                <span className="text-zinc-500">Status:</span>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(movie.id, e.target.value as WatchlistStatus)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="plan_to_watch" className="bg-zinc-900 text-white">Quero Assistir</option>
                  <option value="watching" className="bg-zinc-900 text-white">Assistindo</option>
                  <option value="completed" className="bg-zinc-900 text-white">Já Assistido</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

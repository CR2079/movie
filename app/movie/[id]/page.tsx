'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Star,
  Clock,
  Calendar,
  DollarSign,
  Play,
  ArrowLeft,
  Share2,
  Film,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { movieService } from '@/services/api/tmdbService';
import { MovieDetail, Movie } from '@/types/movie';
import { Button } from '@/components/ui/Button';
import { WatchlistButton } from '@/components/movies/WatchlistButton';
import { TrailerModal } from '@/components/movies/TrailerModal';
import { CastCarousel } from '@/components/movies/CastCarousel';
import { ReviewsSection } from '@/components/movies/ReviewsSection';
import { MovieRow } from '@/components/movies/MovieRow';
import { formatCurrency, formatRuntime, formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params?.id as string;

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    async function loadMovieDetails() {
      if (!id) return;
      setIsLoading(true);
      try {
        const details = await movieService.getMovieById(id);
        setMovie(details);

        // Load similar / recommendations
        const trending = await movieService.getTrending();
        setSimilarMovies(trending.filter((m) => String(m.id) !== String(id)).slice(0, 8));
      } catch (err) {
        console.error('Erro ao carregar detalhes do filme:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovieDetails();
  }, [id]);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast('Link do filme copiado para a área de transferência!', 'success');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-zinc-400 font-medium">Carregando detalhes da produção...</span>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4 space-y-4">
        <Film className="w-12 h-12 text-zinc-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">Filme não encontrado</h2>
        <p className="text-xs text-zinc-400">O título solicitado pode ter sido removido ou o identificador está incorreto.</p>
        <Link href="/movies">
          <Button variant="primary">Voltar ao Catálogo</Button>
        </Link>
      </div>
    );
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '2024';

  return (
    <div className="pb-20 space-y-12">
      {/* Backdrop Hero Container */}
      <div className="relative w-full h-[60vh] min-h-[480px] max-h-[700px] overflow-hidden bg-zinc-950">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="w-full h-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/60 to-black/70" />

        {/* Back navigation & Share */}
        <div className="absolute top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass-panel text-white hover:bg-white/20 text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl glass-panel text-white hover:bg-white/20 transition-all cursor-pointer"
            title="Compartilhar"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Movie Content: Poster + Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-44 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Poster with Watchlist and Trailer */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center sm:items-start gap-4">
            <div className="relative w-full max-w-[280px] mx-auto md:mx-0 rounded-2xl overflow-hidden glass-panel border border-zinc-700/60 shadow-2xl shadow-black/80 aspect-[2/3]">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <WatchlistButton movie={movie} variant="icon" />
              </div>
            </div>

            <div className="w-full max-w-[280px] mx-auto md:mx-0 flex flex-col gap-2.5">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Play className="w-4 h-4 fill-white" />}
                onClick={() => setIsTrailerOpen(true)}
                className="w-full"
              >
                Assistir Trailer Oficial
              </Button>

              <WatchlistButton movie={movie} variant="full" className="w-full" />
            </div>
          </div>

          {/* Right Column: Title, Metadata, Synopsis, Stats */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            <div>
              {/* Category and Rating */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs mb-3">
                <span className="px-2.5 py-1 rounded bg-red-600 text-white font-bold uppercase tracking-wider text-[10px]">
                  {movie.media_type === 'tv' ? 'Série' : 'Filme'}
                </span>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{movie.vote_average.toFixed(1)} / 10</span>
                  <span className="text-[10px] text-zinc-400 font-normal">({movie.vote_count} votos)</span>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>

                {movie.runtime && (
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
              </div>

              {/* Title & Tagline */}
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-sm sm:text-base italic text-zinc-400 mt-2 font-light">
                  "{movie.tagline}"
                </p>
              )}
            </div>

            {/* Genre Pills */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/movies?genre=${genre.id}`}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Synopsis */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                Sinopse
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                {movie.overview}
              </p>
            </div>

            {/* Key Facts / Production Info Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl glass-panel border border-zinc-800">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Status</span>
                <p className="text-sm font-semibold text-white mt-0.5">{movie.status || 'Lançado'}</p>
              </div>

              <div className="p-3.5 rounded-xl glass-panel border border-zinc-800">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Ano</span>
                <p className="text-sm font-semibold text-white mt-0.5">{releaseYear}</p>
              </div>

              <div className="p-3.5 rounded-xl glass-panel border border-zinc-800">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Orçamento</span>
                <p className="text-sm font-semibold text-white mt-0.5">{formatCurrency(movie.budget)}</p>
              </div>

              <div className="p-3.5 rounded-xl glass-panel border border-zinc-800">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Receita</span>
                <p className="text-sm font-semibold text-white mt-0.5">{formatCurrency(movie.revenue)}</p>
              </div>
            </div>

            {/* Cast Carousel */}
            <CastCarousel cast={movie.cast} />

            {/* User Reviews Section */}
            <ReviewsSection initialReviews={movie.reviews} movieId={movie.id} />
          </div>
        </div>
      </div>

      {/* Recommended / Similar Movies */}
      {similarMovies.length > 0 && (
        <MovieRow
          title="Títulos Semelhantes que Você Pode Gostar"
          movies={similarMovies}
          icon={<TrendingUp className="w-6 h-6" />}
        />
      )}

      {/* Trailer Modal */}
      <TrailerModal
        movie={movie}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />
    </div>
  );
}

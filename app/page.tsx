import React from 'react';
import Link from 'next/link';
import { Flame, Trophy, PlayCircle, Tv, Sparkles, Film, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { movieService } from '@/services/api/tmdbService';
import { HeroBanner } from '@/components/movies/HeroBanner';
import { MovieRow } from '@/components/movies/MovieRow';
import { Button } from '@/components/ui/Button';


export default async function HomePage() {
  const [trending, topRated, nowPlaying, popularSeries, genres] = await Promise.all([
    movieService.getTrending(),
    movieService.getTopRated(),
    movieService.getNowPlaying(),
    movieService.getPopularSeries(),
    movieService.getGenres()
  ]);

  return (
    <div className="space-y-6 pb-16">
      {/* Hero Banner Slider */}
      <HeroBanner movies={trending.slice(0, 5)} />

      {/* Feature Highlights Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl glass-dropdown border border-zinc-700/60 shadow-xl">
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-red-600/20 text-red-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Trailers em Alta Definição</h4>
              <p className="text-xs text-zinc-400">Assista com um clique sem anúncios invasivos</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 sm:border-l border-zinc-800">
            <div className="p-2.5 rounded-xl bg-amber-600/20 text-amber-400 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Crítica & Avaliações</h4>
              <p className="text-xs text-zinc-400">Scores atualizados do TMDB e opiniões da comunidade</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 sm:border-l border-zinc-800">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Minha Lista Personalizada</h4>
              <p className="text-xs text-zinc-400">Salve seus filmes e séries favoritos instantaneamente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Movies Row */}
      <MovieRow
        title="Em Alta Esta Semana"
        movies={trending}
        viewAllLink="/movies"
        icon={<Flame className="w-6 h-6" />}
      />

      {/* Top Rated Row */}
      <MovieRow
        title="Obras-Primas Mais Bem Avaliadas"
        movies={topRated}
        viewAllLink="/movies?sort=vote_average.desc"
        icon={<Trophy className="w-6 h-6" />}
      />

      {/* Now Playing In Theaters */}
      <MovieRow
        title="Em Exibição nos Cinemas"
        movies={nowPlaying}
        viewAllLink="/movies"
        icon={<PlayCircle className="w-6 h-6" />}
      />

      {/* Popular Series Row */}
      <MovieRow
        title="Séries Populares no Streaming"
        movies={popularSeries}
        viewAllLink="/series"
        icon={<Tv className="w-6 h-6" />}
      />

      {/* Genre Exploration Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Explorar por Gêneros
            </h2>
          </div>
          <Link
            href="/genres"
            className="text-sm text-zinc-400 hover:text-red-400 font-medium flex items-center gap-1 transition-colors"
          >
            Ver todos os gêneros <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {genres.slice(0, 12).map((genre) => (
            <Link
              key={genre.id}
              href={`/movies?genre=${genre.id}`}
              className="group p-4 rounded-2xl glass-panel hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-red-500/50 transition-all text-center flex flex-col items-center justify-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-900 group-hover:bg-red-600/20 text-zinc-400 group-hover:text-red-400 flex items-center justify-center transition-colors">
                <Film className="w-5 h-5" />
              </div>
              <span className="font-semibold text-sm text-zinc-200 group-hover:text-white transition-colors">
                {genre.name}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                Catálogo
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-zinc-700/60 p-8 sm:p-12 text-center flex flex-col items-center space-y-4">
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/30 via-black/40 to-indigo-950/30 -z-10" />
          <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wider">
            Experiência Completa
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white max-w-xl">
            Crie sua Lista de Filmes e Nunca Mais Perca um Lançamento
          </h2>
          <p className="text-sm text-zinc-300 max-w-lg">
            Acompanhe trailers, organize o que quer assistir e tenha acesso instantâneo aos melhores títulos do cinema global.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 justify-center">
            <Link href="/movies">
              <Button variant="primary" size="lg">
                Explorar Todos os Filmes
              </Button>
            </Link>
            <Link href="/watchlist">
              <Button variant="secondary" size="lg">
                Acessar Minha Lista
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

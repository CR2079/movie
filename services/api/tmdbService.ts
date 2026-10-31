import { Movie, MovieDetail, Genre, MovieFilterOptions } from '@/types/movie';
import { IMovieRepository } from './movieRepository.interface';
import { MOCK_MOVIES, MOCK_GENRES } from './mockData';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

interface TMDBMovieResult {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
}

export class TMDBService implements IMovieRepository {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
  }

  private hasApiKey(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim() !== '');
  }

  private mapTMDBMovie(item: TMDBMovieResult, mediaType: 'movie' | 'tv' = 'movie'): Movie {
    const poster = item.poster_path 
      ? `${TMDB_IMAGE_BASE}/w500${item.poster_path}`
      : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80';
    
    const backdrop = item.backdrop_path
      ? `${TMDB_IMAGE_BASE}/original${item.backdrop_path}`
      : 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80';

    return {
      id: item.id,
      title: item.title || item.name || 'Título Desconhecido',
      overview: item.overview || 'Sinopse não disponível no momento.',
      poster_path: poster,
      backdrop_path: backdrop,
      release_date: item.release_date || item.first_air_date || '2024-01-01',
      vote_average: Number((item.vote_average || 7.0).toFixed(1)),
      vote_count: item.vote_count || 100,
      popularity: item.popularity || 50,
      genre_ids: item.genre_ids || [],
      genres: item.genres || [],
      media_type: mediaType,
      runtime: item.runtime || 120,
      tagline: item.tagline || ''
    };
  }

  private async fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
    if (!this.hasApiKey()) return null;

    try {
      const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
      url.searchParams.set('api_key', this.apiKey);
      url.searchParams.set('language', 'pt-BR');

      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });

      const response = await fetch(url.toString(), {
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        return null;
      }

      return await response.json() as T;
    } catch {
      return null;
    }
  }

  async getTrending(page: number = 1): Promise<Movie[]> {
    const data = await this.fetchFromTMDB<{ results: TMDBMovieResult[] }>('/trending/movie/week', { page: String(page) });
    if (data && data.results) {
      return data.results.map(m => this.mapTMDBMovie(m, 'movie'));
    }
    return MOCK_MOVIES.slice(0, 8);
  }

  async getTopRated(page: number = 1): Promise<Movie[]> {
    const data = await this.fetchFromTMDB<{ results: TMDBMovieResult[] }>('/movie/top_rated', { page: String(page) });
    if (data && data.results) {
      return data.results.map(m => this.mapTMDBMovie(m, 'movie'));
    }
    return [...MOCK_MOVIES].sort((a, b) => b.vote_average - a.vote_average);
  }

  async getNowPlaying(page: number = 1): Promise<Movie[]> {
    const data = await this.fetchFromTMDB<{ results: TMDBMovieResult[] }>('/movie/now_playing', { page: String(page) });
    if (data && data.results) {
      return data.results.map(m => this.mapTMDBMovie(m, 'movie'));
    }
    return MOCK_MOVIES.filter(m => m.media_type === 'movie');
  }

  async getUpcoming(page: number = 1): Promise<Movie[]> {
    const data = await this.fetchFromTMDB<{ results: TMDBMovieResult[] }>('/movie/upcoming', { page: String(page) });
    if (data && data.results) {
      return data.results.map(m => this.mapTMDBMovie(m, 'movie'));
    }
    return MOCK_MOVIES.slice(2, 6);
  }

  async getPopularSeries(page: number = 1): Promise<Movie[]> {
    const data = await this.fetchFromTMDB<{ results: TMDBMovieResult[] }>('/tv/popular', { page: String(page) });
    if (data && data.results) {
      return data.results.map(m => this.mapTMDBMovie(m, 'tv'));
    }
    return MOCK_MOVIES.filter(m => m.media_type === 'tv');
  }

  async getMovieById(id: string | number): Promise<MovieDetail> {
    const numericId = Number(id);
    const mock = MOCK_MOVIES.find(m => m.id === numericId || String(m.id) === String(id));
    
    if (this.hasApiKey()) {
      const data = await this.fetchFromTMDB<any>(`/movie/${id}`, {
        append_to_response: 'credits,videos,similar,reviews'
      });

      if (data) {
        const base = this.mapTMDBMovie(data, 'movie');
        return {
          ...base,
          budget: data.budget,
          revenue: data.revenue,
          status: data.status,
          cast: data.credits?.cast?.slice(0, 10).map((c: any) => ({
            id: c.id,
            name: c.name,
            character: c.character,
            profile_path: c.profile_path ? `${TMDB_IMAGE_BASE}/w185${c.profile_path}` : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
          })) || mock?.cast || [],
          similar: data.similar?.results?.slice(0, 6).map((m: any) => this.mapTMDBMovie(m, 'movie')) || mock?.similar || [],
          videos: data.videos?.results || [],
          reviews: mock?.reviews || []
        };
      }
    }

    if (mock) return mock;
    // Fallback to first movie if not found
    return MOCK_MOVIES[0];
  }

  async searchMovies(query: string, page: number = 1): Promise<Movie[]> {
    if (!query.trim()) return [];
    
    const data = await this.fetchFromTMDB<{ results: TMDBMovieResult[] }>('/search/multi', {
      query: query.trim(),
      page: String(page)
    });

    if (data && data.results) {
      return data.results
        .filter(item => item.poster_path || item.backdrop_path)
        .map(item => this.mapTMDBMovie(item, item.name ? 'tv' : 'movie'));
    }

    const q = query.toLowerCase();
    return MOCK_MOVIES.filter(m => 
      m.title.toLowerCase().includes(q) || 
      m.overview.toLowerCase().includes(q)
    );
  }

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<Movie[]> {
    const data = await this.fetchFromTMDB<{ results: TMDBMovieResult[] }>('/discover/movie', {
      with_genres: String(genreId),
      page: String(page)
    });

    if (data && data.results) {
      return data.results.map(m => this.mapTMDBMovie(m, 'movie'));
    }

    return MOCK_MOVIES.filter(m => m.genre_ids?.includes(genreId) || m.genres?.some(g => g.id === genreId));
  }

  async getFilteredMovies(options: MovieFilterOptions): Promise<{ movies: Movie[]; totalPages: number; totalResults: number }> {
    let movies = [...MOCK_MOVIES];

    if (options.query) {
      const q = options.query.toLowerCase();
      movies = movies.filter(m => m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q));
    }

    if (options.genreId) {
      movies = movies.filter(m => m.genre_ids?.includes(options.genreId!) || m.genres?.some(g => g.id === options.genreId));
    }

    if (options.year) {
      movies = movies.filter(m => {
        const y = new Date(m.release_date).getFullYear();
        return y === options.year;
      });
    }

    if (options.minRating) {
      movies = movies.filter(m => m.vote_average >= options.minRating!);
    }

    if (options.sortBy) {
      if (options.sortBy === 'vote_average.desc') {
        movies.sort((a, b) => b.vote_average - a.vote_average);
      } else if (options.sortBy === 'release_date.desc') {
        movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
      } else if (options.sortBy === 'title.asc') {
        movies.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        movies.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      }
    }

    return {
      movies,
      totalPages: 1,
      totalResults: movies.length
    };
  }

  async getGenres(): Promise<Genre[]> {
    const data = await this.fetchFromTMDB<{ genres: Genre[] }>('/genre/movie/list');
    if (data && data.genres) {
      return data.genres;
    }
    return MOCK_GENRES;
  }
}

// Single instance export following SOLID Singleton/DI best practices
export const movieService = new TMDBService();

import { Movie, MovieDetail, Genre, MovieFilterOptions } from '@/types/movie';

export interface IMovieRepository {
  getTrending(page?: number): Promise<Movie[]>;
  getTopRated(page?: number): Promise<Movie[]>;
  getNowPlaying(page?: number): Promise<Movie[]>;
  getUpcoming(page?: number): Promise<Movie[]>;
  getPopularSeries(page?: number): Promise<Movie[]>;
  getMovieById(id: string | number): Promise<MovieDetail>;
  searchMovies(query: string, page?: number): Promise<Movie[]>;
  getMoviesByGenre(genreId: number, page?: number): Promise<Movie[]>;
  getFilteredMovies(options: MovieFilterOptions): Promise<{ movies: Movie[]; totalPages: number; totalResults: number }>;
  getGenres(): Promise<Genre[]>;
}

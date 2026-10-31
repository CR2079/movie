export interface Genre {
  id: number;
  name: string;
  slug?: string;
  description?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface VideoTrailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  rating: number;
  created_at: string;
}

export interface Movie {
  id: number | string;
  title: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity?: number;
  genre_ids?: number[];
  genres?: Genre[];
  media_type?: 'movie' | 'tv';
  runtime?: number;
  tagline?: string;
  trailer_url?: string;
  trailer_key?: string;
  status?: string;
}

export interface MovieDetail extends Movie {
  budget?: number;
  revenue?: number;
  cast?: CastMember[];
  crew?: CrewMember[];
  similar?: Movie[];
  reviews?: Review[];
  videos?: VideoTrailer[];
}

export type WatchlistStatus = 'plan_to_watch' | 'watching' | 'completed';

export interface WatchlistItem {
  movie: Movie;
  addedAt: string;
  status: WatchlistStatus;
  userRating?: number;
  notes?: string;
}

export type SortOption = 
  | 'popularity.desc' 
  | 'vote_average.desc' 
  | 'release_date.desc' 
  | 'title.asc';

export interface MovieFilterOptions {
  genreId?: number | null;
  year?: number | null;
  minRating?: number | null;
  sortBy?: SortOption;
  query?: string;
  page?: number;
}

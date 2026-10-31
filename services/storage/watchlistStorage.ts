import { Movie, WatchlistItem, WatchlistStatus } from '@/types/movie';

const STORAGE_KEY = 'cinepulse_watchlist_v1';
const EVENT_NAME = 'cinepulse_watchlist_updated';

export class WatchlistStorageService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  getItems(): WatchlistItem[] {
    if (!this.isBrowser()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  isInWatchlist(movieId: string | number): boolean {
    const items = this.getItems();
    return items.some(item => String(item.movie.id) === String(movieId));
  }

  getItem(movieId: string | number): WatchlistItem | undefined {
    const items = this.getItems();
    return items.find(item => String(item.movie.id) === String(movieId));
  }

  toggleWatchlist(movie: Movie, status: WatchlistStatus = 'plan_to_watch'): boolean {
    if (!this.isBrowser()) return false;
    let items = this.getItems();
    const existingIndex = items.findIndex(item => String(item.movie.id) === String(movie.id));

    let isAdded = false;
    if (existingIndex >= 0) {
      items.splice(existingIndex, 1);
      isAdded = false;
    } else {
      const newItem: WatchlistItem = {
        movie,
        addedAt: new Date().toISOString(),
        status
      };
      items.unshift(newItem);
      isAdded = true;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { items, count: items.length } }));
    } catch (e) {
      console.error('Falha ao salvar no LocalStorage:', e);
    }

    return isAdded;
  }

  updateStatus(movieId: string | number, status: WatchlistStatus): void {
    if (!this.isBrowser()) return;
    const items = this.getItems().map(item => {
      if (String(item.movie.id) === String(movieId)) {
        return { ...item, status };
      }
      return item;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { items, count: items.length } }));
  }

  removeFromWatchlist(movieId: string | number): void {
    if (!this.isBrowser()) return;
    const items = this.getItems().filter(item => String(item.movie.id) !== String(movieId));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { items, count: items.length } }));
  }

  clearWatchlist(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { items: [], count: 0 } }));
  }

  subscribe(callback: (items: WatchlistItem[]) => void): () => void {
    if (!this.isBrowser()) return () => {};
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ items: WatchlistItem[] }>;
      callback(customEvent.detail?.items || this.getItems());
    };

    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener(EVENT_NAME, handler);
      window.removeEventListener('storage', handler);
    };
  }
}

export const watchlistStorage = new WatchlistStorageService();

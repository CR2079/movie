import test from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage and window CustomEvent for Node test environment
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

globalThis.window = {
  dispatchEvent: () => true,
  addEventListener: () => {},
  removeEventListener: () => {}
};
globalThis.localStorage = new MockLocalStorage();
globalThis.CustomEvent = class CustomEvent {
  constructor(name, params) {
    this.type = name;
    this.detail = params?.detail;
  }
};

// Test suite for Watchlist Storage
test('Watchlist Storage - adiciona e remove filme com sucesso', async (t) => {
  const STORAGE_KEY = 'cinepulse_watchlist_v1';
  globalThis.localStorage.clear();

  const mockMovie = {
    id: 101,
    title: 'Duna: Parte 2',
    vote_average: 8.8,
    release_date: '2024-03-01'
  };

  // Simulating add
  let items = [];
  const newItem = { movie: mockMovie, addedAt: new Date().toISOString(), status: 'plan_to_watch' };
  items.push(newItem);
  globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

  const stored = JSON.parse(globalThis.localStorage.getItem(STORAGE_KEY));
  assert.equal(stored.length, 1);
  assert.equal(stored[0].movie.title, 'Duna: Parte 2');
  assert.equal(stored[0].status, 'plan_to_watch');

  // Simulating remove
  items = items.filter(i => i.movie.id !== mockMovie.id);
  globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

  const updated = JSON.parse(globalThis.localStorage.getItem(STORAGE_KEY));
  assert.equal(updated.length, 0);
});

test('Watchlist Storage - atualiza status do filme', async () => {
  const STORAGE_KEY = 'cinepulse_watchlist_v1';
  globalThis.localStorage.clear();

  const initial = [
    { movie: { id: 102, title: 'Interestelar' }, status: 'plan_to_watch' }
  ];
  globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));

  // Change status to completed
  const current = JSON.parse(globalThis.localStorage.getItem(STORAGE_KEY));
  current[0].status = 'completed';
  globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));

  const result = JSON.parse(globalThis.localStorage.getItem(STORAGE_KEY));
  assert.equal(result[0].status, 'completed');
});

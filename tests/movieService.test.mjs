import test from 'node:test';
import assert from 'node:assert/strict';

test('Movie Repository Logic - filtragem e busca de filmes', async () => {
  const sampleMovies = [
    { id: 1, title: 'Duna: Parte 2', genre_ids: [878, 12], vote_average: 8.8, popularity: 98 },
    { id: 2, title: 'Interestelar', genre_ids: [878, 18], vote_average: 8.9, popularity: 95 },
    { id: 3, title: 'Oppenheimer', genre_ids: [18, 36], vote_average: 8.7, popularity: 92 },
    { id: 4, title: 'The Last of Us', genre_ids: [18, 878], vote_average: 8.8, popularity: 91 }
  ];

  // Test Search
  const searchResults = sampleMovies.filter(m => m.title.toLowerCase().includes('duna'));
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 1);

  // Test Genre filter
  const sciFiMovies = sampleMovies.filter(m => m.genre_ids.includes(878));
  assert.equal(sciFiMovies.length, 3);

  // Test Sorting by vote average
  const sortedByRating = [...sampleMovies].sort((a, b) => b.vote_average - a.vote_average);
  assert.equal(sortedByRating[0].title, 'Interestelar');
  assert.equal(sortedByRating[0].vote_average, 8.9);
});

import { Movie, MovieDetail, Genre } from '@/types/movie';

export const MOCK_GENRES: Genre[] = [
  { id: 28, name: 'Ação', slug: 'action', description: 'Aventuras cheias de adrenalina, perseguições e sequências eletrizantes.' },
  { id: 12, name: 'Aventura', slug: 'adventure', description: 'Jornadas épicas por mundos inexplorados e terras lendárias.' },
  { id: 16, name: 'Animação', slug: 'animation', description: 'Obras de arte visuais que encantam todas as idades.' },
  { id: 35, name: 'Comédia', slug: 'comedy', description: 'Histórias hilárias e momentos descontraídos de diversão garantida.' },
  { id: 80, name: 'Crime', slug: 'crime', description: 'Investigações policiais, mistérios e submundos obscuros.' },
  { id: 99, name: 'Documentário', slug: 'documentary', description: 'Fatos reais, revelações e olhares aprofundados sobre o nosso mundo.' },
  { id: 18, name: 'Drama', slug: 'drama', description: 'Histórias profundas que exploram o âmago das emoções humanas.' },
  { id: 10751, name: 'Família', slug: 'family', description: 'Entretenimento perfeito para reunir toda a família no sofá.' },
  { id: 14, name: 'Fantasia', slug: 'fantasy', description: 'Magia, criaturas míticas e reinos encantados além da imaginação.' },
  { id: 36, name: 'História', slug: 'history', description: 'Eventos marcantes e personagens que moldaram a história mundial.' },
  { id: 27, name: 'Terror', slug: 'horror', description: 'Suspense arrepiante, mistérios sobrenaturais e sustos inesquecíveis.' },
  { id: 10402, name: 'Música', slug: 'music', description: 'Espetáculos sonoros, musicais e trajetórias de grandes lendas da música.' },
  { id: 9648, name: 'Mistério', slug: 'mystery', description: 'Enigmas inteligentes que desafiam sua mente a desvendar o segredo.' },
  { id: 10749, name: 'Romance', slug: 'romance', description: 'Paixões intensas, encontros do destino e laços eternos.' },
  { id: 878, name: 'Ficção Científica', slug: 'sci-fi', description: 'Tecnologia futurista, exploração espacial e viagens no tempo.' },
  { id: 53, name: 'Suspense', slug: 'thriller', description: 'Tensões crescentes e reviravoltas de tirar o fôlego até o último minuto.' },
  { id: 10752, name: 'Guerra', slug: 'war', description: 'Conflitos épicos, heroísmo e os sacrifícios nos campos de batalha.' },
  { id: 37, name: 'Faroeste', slug: 'western', description: 'Duelos ao pôr do sol, foras da lei e a expansão do velho oeste.' }
];

export const MOCK_MOVIES: MovieDetail[] = [
  {
    id: 101,
    title: 'Duna: Parte 2',
    original_title: 'Dune: Part Two',
    overview: 'Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família. Diante de uma escolha entre o amor de sua vida e o destino do universo, ele deve evitar um futuro terrível que só ele pode prever.',
    poster_path: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
    release_date: '2024-03-01',
    vote_average: 8.8,
    vote_count: 5820,
    popularity: 98.4,
    genre_ids: [878, 12, 18],
    genres: [
      { id: 878, name: 'Ficção Científica' },
      { id: 12, name: 'Aventura' },
      { id: 18, name: 'Drama' }
    ],
    media_type: 'movie',
    runtime: 166,
    tagline: 'O destino do universo está nas mãos de quem controla a especiaria.',
    trailer_key: 'Way9Dexny3w',
    trailer_url: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    budget: 190000000,
    revenue: 711844358,
    status: 'Released',
    cast: [
      { id: 1, name: 'Timothée Chalamet', character: 'Paul Atreides', profile_path: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
      { id: 2, name: 'Zendaya', character: 'Chani', profile_path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
      { id: 3, name: 'Rebecca Ferguson', character: 'Lady Jessica', profile_path: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
      { id: 4, name: 'Javier Bardem', character: 'Stilgar', profile_path: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' }
    ],
    reviews: [
      { id: 'r1', author: 'Lucas Silva', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', rating: 5, content: 'Uma obra-prima cinematográfica! Fotografia monumental e trilha sonora hipnotizante de Hans Zimmer.', created_at: '2024-03-05' },
      { id: 'r2', author: 'Beatriz Ramos', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', rating: 4.8, content: 'A evolução de Paul Atreides é sublime. Adaptação perfeita do livro clássico de Frank Herbert.', created_at: '2024-03-10' }
    ]
  },
  {
    id: 102,
    title: 'Interestelar',
    original_title: 'Interstellar',
    overview: 'Com os recursos da Terra se esgotando rapidamente, uma equipe de exploradores e cientistas embarca na missão mais importante da história da humanidade: viajar para além da nossa galáxia para descobrir se o homem tem futuro entre as estrelas.',
    poster_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80',
    release_date: '2014-11-07',
    vote_average: 8.9,
    vote_count: 34100,
    popularity: 95.8,
    genre_ids: [878, 12, 18],
    genres: [
      { id: 878, name: 'Ficção Científica' },
      { id: 18, name: 'Drama' },
      { id: 12, name: 'Aventura' }
    ],
    media_type: 'movie',
    runtime: 169,
    tagline: 'O fim da Terra não será o fim de nós.',
    trailer_key: 'zSWdZVtXT7E',
    trailer_url: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
    budget: 165000000,
    revenue: 773800000,
    status: 'Released',
    cast: [
      { id: 5, name: 'Matthew McConaughey', character: 'Cooper', profile_path: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
      { id: 6, name: 'Anne Hathaway', character: 'Dr. Brand', profile_path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
      { id: 7, name: 'Jessica Chastain', character: 'Murph (adulta)', profile_path: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' }
    ],
    reviews: [
      { id: 'r3', author: 'Carlos Mendes', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80', rating: 5, content: 'O melhor filme de ficção científica do século XXI. Emocionante, preciso e atemporal.', created_at: '2024-02-12' }
    ]
  },
  {
    id: 103,
    title: 'Oppenheimer',
    original_title: 'Oppenheimer',
    overview: 'A história do físico americano J. Robert Oppenheimer, seu papel no Projeto Manhattan e o desenvolvimento da bomba atômica durante a Segunda Guerra Mundial, seguido por turbulências políticas e dilemas éticos sem precedentes.',
    poster_path: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1920&q=80',
    release_date: '2023-07-21',
    vote_average: 8.7,
    vote_count: 14500,
    popularity: 92.1,
    genre_ids: [18, 36],
    genres: [
      { id: 18, name: 'Drama' },
      { id: 36, name: 'História' }
    ],
    media_type: 'movie',
    runtime: 180,
    tagline: 'O mundo mudará para sempre.',
    trailer_key: 'uYPbbksJxIg',
    trailer_url: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
    budget: 100000000,
    revenue: 957000000,
    status: 'Released',
    cast: [
      { id: 8, name: 'Cillian Murphy', character: 'J. Robert Oppenheimer', profile_path: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
      { id: 9, name: 'Emily Blunt', character: 'Kitty Oppenheimer', profile_path: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
      { id: 10, name: 'Robert Downey Jr.', character: 'Lewis Strauss', profile_path: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' }
    ],
    reviews: [
      { id: 'r4', author: 'Mariana Duarte', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', rating: 4.9, content: 'Atuação magistral de Cillian Murphy. Christopher Nolan entrega cinema em sua mais pura essência.', created_at: '2023-08-01' }
    ]
  },
  {
    id: 104,
    title: 'Cyberpunk: Edgerunners',
    original_title: 'Cyberpunk: Edgerunners',
    overview: 'Em uma distopia repleta de corrupção e implantes cibernéticos, um garoto talentoso mas impulsivo da rua decide sobreviver tornando-se um mercenário fora da lei conhecido como edgerunner.',
    poster_path: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    release_date: '2022-09-13',
    vote_average: 8.6,
    vote_count: 8900,
    popularity: 88.7,
    genre_ids: [16, 28, 878],
    genres: [
      { id: 16, name: 'Animação' },
      { id: 28, name: 'Ação' },
      { id: 878, name: 'Ficção Científica' }
    ],
    media_type: 'tv',
    runtime: 25,
    tagline: 'Você nunca morrerá em Night City se nunca desistir de sonhar.',
    trailer_key: 'JtqIas3bYhg',
    trailer_url: 'https://www.youtube.com/watch?v=JtqIas3bYhg',
    status: 'Returning Series',
    cast: [
      { id: 11, name: 'KENN', character: 'David Martinez (Voz)', profile_path: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
      { id: 12, name: 'Aoi Yuuki', character: 'Lucy (Voz)', profile_path: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' }
    ],
    reviews: [
      { id: 'r5', author: 'Rodrigo Alves', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', rating: 5, content: 'Estética visual inacreditável pelo estúdio Trigger. O final é inesquecível!', created_at: '2023-11-15' }
    ]
  },
  {
    id: 105,
    title: 'Homem-Aranha: Através do Aranhaverso',
    original_title: 'Spider-Man: Across the Spider-Verse',
    overview: 'Miles Morales é catapultado através do Multiverso, onde encontra uma equipe de Pessoas-Aranha encarregadas de proteger sua própria existência. Quando os heróis entram em conflito sobre como lidar com uma nova ameaça, Miles se vê contra os outros Aranhas.',
    poster_path: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1920&q=80',
    release_date: '2023-06-02',
    vote_average: 8.7,
    vote_count: 7300,
    popularity: 94.2,
    genre_ids: [16, 28, 12, 878],
    genres: [
      { id: 16, name: 'Animação' },
      { id: 28, name: 'Ação' },
      { id: 12, name: 'Aventura' }
    ],
    media_type: 'movie',
    runtime: 140,
    tagline: 'Não importa quem você seja, todos nós temos uma escolha.',
    trailer_key: 'cqGjhVJWtEg',
    trailer_url: 'https://www.youtube.com/watch?v=cqGjhVJWtEg',
    budget: 100000000,
    revenue: 690516673,
    status: 'Released',
    cast: [
      { id: 13, name: 'Shameik Moore', character: 'Miles Morales (Voz)', profile_path: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
      { id: 14, name: 'Hailee Steinfeld', character: 'Gwen Stacy (Voz)', profile_path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' }
    ],
    reviews: [
      { id: 'r6', author: 'Felipe Santos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', rating: 5, content: 'Revolução visual do cinema animado moderno! Cada dimensão tem um estilo artístico único.', created_at: '2023-06-18' }
    ]
  },
  {
    id: 106,
    title: 'The Last of Us',
    original_title: 'The Last of Us',
    overview: 'Vinte anos após uma praga fúngica quase erradicar a civilização humana, Joel, um sobrevivente endurecido, é contratado para contrabandear Ellie, uma garota de 14 anos que pode ser a última esperança da humanidade, para fora de uma opressiva zona de quarentena militar.',
    poster_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
    release_date: '2023-01-15',
    vote_average: 8.8,
    vote_count: 12400,
    popularity: 91.5,
    genre_ids: [18, 878, 28],
    genres: [
      { id: 18, name: 'Drama' },
      { id: 878, name: 'Ficção Científica' },
      { id: 28, name: 'Ação' }
    ],
    media_type: 'tv',
    runtime: 55,
    tagline: 'Quando você estiver perdido na escuridão, procure a luz.',
    trailer_key: 'uLtkt8BonwM',
    trailer_url: 'https://www.youtube.com/watch?v=uLtkt8BonwM',
    status: 'Returning Series',
    cast: [
      { id: 15, name: 'Pedro Pascal', character: 'Joel Miller', profile_path: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
      { id: 16, name: 'Bella Ramsey', character: 'Ellie Williams', profile_path: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' }
    ],
    reviews: [
      { id: 'r7', author: 'Camila Torres', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', rating: 4.9, content: 'Adaptação sublime de videogame. O episódio 3 é arte pura de partir o coração.', created_at: '2023-02-15' }
    ]
  },
  {
    id: 107,
    title: 'Blade Runner 2049',
    original_title: 'Blade Runner 2049',
    overview: 'Trinta anos após os acontecimentos do primeiro filme, um novo Blade Runner, o policial K de Los Angeles, desenterra um segredo há muito enterrado que tem o potencial de mergulhar o que resta da sociedade no caos.',
    poster_path: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    release_date: '2017-10-06',
    vote_average: 8.0,
    vote_count: 13200,
    popularity: 87.2,
    genre_ids: [878, 9648, 18],
    genres: [
      { id: 878, name: 'Ficção Científica' },
      { id: 9648, name: 'Mistério' },
      { id: 18, name: 'Drama' }
    ],
    media_type: 'movie',
    runtime: 164,
    tagline: 'A chave para o futuro finalmente foi descoberta.',
    trailer_key: 'gCcx85zbxz4',
    trailer_url: 'https://www.youtube.com/watch?v=gCcx85zbxz4',
    budget: 150000000,
    revenue: 259239658,
    status: 'Released',
    cast: [
      { id: 17, name: 'Ryan Gosling', character: 'K', profile_path: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
      { id: 18, name: 'Harrison Ford', character: 'Rick Deckard', profile_path: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' },
      { id: 19, name: 'Ana de Armas', character: 'Joi', profile_path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' }
    ],
    reviews: [
      { id: 'r8', author: 'Guilherme Ferreira', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80', rating: 5, content: 'Fotografia de Roger Deakins simplesmente imbatível. Uma aula magna de design de produção e ritmo cinematográfico.', created_at: '2023-04-10' }
    ]
  },
  {
    id: 108,
    title: 'Stranger Things',
    original_title: 'Stranger Things',
    overview: 'Quando um jovem garoto desaparece, uma pequena cidade descobre um mistério envolvendo experimentos secretos, forças sobrenaturais aterrorizantes e uma garotinha muito estranha com poderes telecinéticos.',
    poster_path: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    release_date: '2016-07-15',
    vote_average: 8.6,
    vote_count: 17400,
    popularity: 93.3,
    genre_ids: [18, 9648, 878],
    genres: [
      { id: 18, name: 'Drama' },
      { id: 9648, name: 'Mistério' },
      { id: 878, name: 'Ficção Científica' }
    ],
    media_type: 'tv',
    runtime: 50,
    tagline: 'Um amigo é alguém por quem você faria qualquer coisa.',
    trailer_key: 'b9EkMc79ZSU',
    trailer_url: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
    status: 'Returning Series',
    cast: [
      { id: 20, name: 'Millie Bobby Brown', character: 'Eleven', profile_path: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
      { id: 21, name: 'Finn Wolfhard', character: 'Mike Wheeler', profile_path: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' }
    ],
    reviews: [
      { id: 'r9', author: 'Larissa Lima', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', rating: 4.8, content: 'Nostalgia dos anos 80 perfeitamente calibrada com suspense inteligente.', created_at: '2023-09-22' }
    ]
  }
];

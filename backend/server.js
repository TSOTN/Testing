const express = require('express');
const cors = require('cors');
const pool = require('./db');


// Datos simulados (movidos desde el frontend)
const data = [
  {
    juego: 'GTA VI',
    juegoImg: 'https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg',
    juegoDesc: 'Acción en mundo abierto, crimen organizado y persecuciones intensas en Vice City. El esperado regreso a la ciudad del vicio.',
    pelicula: 'Heat',
    peliculaImg: 'https://img.youtube.com/vi/2Gfetl9o2V8/maxresdefault.jpg',
    peliculaDesc: 'Clásico del cine criminal (1995) con Al Pacino y Robert De Niro. Atracos perfectos y duelos entre policías y ladrones.'
  },
  {
    juego: 'Cyberpunk 2077',
    juegoImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
    juegoDesc: 'RPG de mundo abierto en Night City, una megaurbe obsesionada con el poder, el glamur y las modificaciones corporales.',
    pelicula: 'Blade Runner 2049',
    peliculaImg: 'https://img.youtube.com/vi/gCcx85zbxz4/maxresdefault.jpg',
    peliculaDesc: 'Secuela del clásico sci-fi. Explora un futuro distópico donde la línea entre humanos y replicantes se difumina.'
  },
  {
    juego: 'Red Dead Redemption 2',
    juegoImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
    juegoDesc: 'Western épico que sigue a Arthur Morgan y la banda de Van der Linde en el ocaso del salvaje oeste americano.',
    pelicula: 'The Assassination of Jesse James',
    peliculaImg: 'https://img.youtube.com/vi/C7f-qGZpCjI/maxresdefault.jpg',
    peliculaDesc: 'Drama western sobre el forajido Jesse James y su eventual traición. Contemplativo y melancólico.'
  },
  {
    juego: 'The Last of Us',
    juegoImg: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg',
    juegoDesc: 'Aventura de supervivencia post-apocalíptica. Joel y Ellie atraviesan Estados Unidos devastado por una infección fúngica.',
    pelicula: 'Children of Men',
    peliculaImg: 'https://img.youtube.com/vi/2VtIy7rcp2E/maxresdefault.jpg',
    peliculaDesc: 'Thriller distópico donde la humanidad enfrenta la extinción. Un hombre protege a la única mujer embarazada del mundo.'
  },
  {
    juego: 'Assassin\'s Creed Valhalla',
    juegoImg: 'https://cdn.akamai.steamstatic.com/steam/apps/2208920/header.jpg',
    juegoDesc: 'Serie de acción-aventura donde asesinos históricos luchan contra Templarios usando tecnología ancestral.',
    pelicula: 'The Matrix',
    peliculaImg: 'https://img.youtube.com/vi/vKQi3bBA1y8/maxresdefault.jpg',
    peliculaDesc: 'Revolución del cine sci-fi. Realidades simuladas, conspiraciones y combates imposibles que desafían la física.'
  },
  {
    juego: 'God of War',
    juegoImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg',
    juegoDesc: 'Kratos y su hijo Atreus en un viaje por los reinos nórdicos. Mitología, combate brutal y redención paterna.',
    pelicula: 'Gladiator',
    peliculaImg: 'https://img.youtube.com/vi/owK1qxDselE/maxresdefault.jpg',
    peliculaDesc: 'Épica romana de Ridley Scott. Un general convertido en gladiador busca venganza contra el emperador corrupto.'
  },
  {
    juego: 'Bioshock',
    juegoImg: 'https://cdn.akamai.steamstatic.com/steam/apps/7670/header.jpg',
    juegoDesc: 'FPS ambientado en Rapture, ciudad submarina utópica convertida en pesadilla. Filosofía, horror y decisiones morales.',
    pelicula: 'The Truman Show',
    peliculaImg: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Trumanshow.jpg',
    peliculaDesc: 'Comedia dramática sobre un hombre que descubre que su vida es un reality show. Control, libertad y realidad artificial.'
  },
  {
    juego: 'Hades',
    juegoImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg',
    juegoDesc: 'Roguelike de acción donde Zagreus, hijo de Hades, intenta escapar del inframundo. Mitología griega y combate frenético.',
    pelicula: 'Clash of the Titans',
    peliculaImg: 'https://img.youtube.com/vi/T6DJcgm3wNY/maxresdefault.jpg',
    peliculaDesc: 'Aventura de fantasía sobre Perseo enfrentando a dioses y monstruos. Mitología clásica con efectos espectaculares.'
  },
  {
    juego: 'Silent Hill 2',
    juegoImg: 'https://steamcdn-a.akamaihd.net/steam/apps/2124490/header.jpg',
    juegoDesc: 'Horror psicológico donde James Sunderland busca a su esposa muerta en un pueblo lleno de pesadillas y culpa.',
    pelicula: 'Jacob\'s Ladder',
    peliculaImg: 'https://img.youtube.com/vi/rJk5E_8b_yg/maxresdefault.jpg',
    peliculaDesc: 'Thriller de terror psicológico. Un veterano de Vietnam experimenta visiones aterradoras que cuestionan su realidad.'
  },
  {
    juego: 'Portal',
    juegoImg: 'https://steamcdn-a.akamaihd.net/steam/apps/400/header.jpg',
    juegoDesc: 'Puzzle en primera persona con pistola de portales. Escapa de los laboratorios de Aperture Science resolviendo acertijos.',
    pelicula: 'Cube',
    peliculaImg: 'https://img.youtube.com/vi/YAWSkYqqkMA/maxresdefault.jpg',
    peliculaDesc: 'Sci-fi de terror. Extraños despiertan atrapados en habitaciones cúbicas mortales llenas de trampas letales.'
  }
];

const posts = [
  {
    id: 1,
    author: '@CyberNeon',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNeon',
    timestamp: 'Hace 2 horas',
    frontTitle: '🎮 Cyberpunk 2077',
    frontDesc: 'Acabo de terminar Cyberpunk 2077... ¡increíble! La historia es tan inmersiva que pierdes la noción del tiempo.',
    frontImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
    backTitle: '🎬 Blade Runner 2049',
    backDesc: 'Si te gustó Cyberpunk, debes ver esta. Explora un futuro distópico donde la línea entre humanos y replicantes se difumina.',
    backImg: 'https://img.youtube.com/vi/gCcx85zbxz4/maxresdefault.jpg',
    likes: 234,
    comments: 45,
    liked: false
  },
  {
    id: 3,
    author: '@CinemaLover',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CinemaLover',
    timestamp: 'Hace 6 horas',
    frontTitle: '🎬 Blade Runner 2049',
    frontDesc: 'Blade Runner 2049 es una obra de arte visual. Cada fotograma parece una pintura. Ridley Scott es un genio.',
    frontImg: 'https://img.youtube.com/vi/gCcx85zbxz4/maxresdefault.jpg',
    backTitle: '🎮 Cyberpunk 2077',
    backDesc: 'Si amaste la atmósfera cyberpunk de BR2049, este juego es perfecto para ti. Night City te espera.',
    backImg: 'https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00giTzYtH8PF1.png',
    likes: 567,
    comments: 92,
    liked: false
  },
  {
    id: 5,
    author: '@ActionJunkie',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ActionJunkie',
    timestamp: 'Hace 10 horas',
    frontTitle: '🎮 GTA VI',
    frontDesc: 'GTA VI será el juego más esperado del año. Vice City volverá con todo. ¡No puedo esperar!',
    frontImg: 'https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg',
    backTitle: '🎬 Heat',
    backDesc: 'Si esperas GTA VI por sus atracos épicos, Heat es la película que necesitas. Clásico del cine criminal con Al Pacino.',
    backImg: 'https://pics.filmaffinity.com/heat-911641527-large.jpg',
    likes: 678,
    comments: 134,
    liked: false
  },
  {
    id: 6,
    author: '@AnimeOtaku',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnimeOtaku',
    timestamp: 'Hace 12 horas',
    frontTitle: '📺 Attack on Titan',
    frontDesc: 'Acabo de terminar Attack on Titan y estoy devastado. La mejor serie de anime que he visto. La trama es impecable.',
    frontImg: 'https://m.media-amazon.com/images/M/MV5BZjliODY5MzQtMmViZC00MTZmLWFhMWMtMjMwM2I3OGY1MTRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    backTitle: '🎮 Horizon Zero Dawn',
    backDesc: 'Si te fascinó la lucha contra titanes, este juego te encantará. Aloy cazando máquinas gigantes en un mundo post-apocalíptico.',
    backImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1151640/header.jpg',
    likes: 892,
    comments: 156,
    liked: false
  },
  {
    id: 7,
    author: '@SeriesAddict',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SeriesAddict',
    timestamp: 'Hace 14 horas',
    frontTitle: '📺 Stranger Things',
    frontDesc: 'Stranger Things temporada 4 me voló la mente. Los 80s, el horror, la nostalgia... todo perfecto.',
    frontImg: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    backTitle: '🎮 Alan Wake 2',
    backDesc: 'Si amas el horror atmosférico de Stranger Things, Alan Wake 2 es tu juego. Terror psicológico y misterio sobrenatural.',
    backImg: 'https://cdn.akamai.steamstatic.com/steam/apps/108710/header.jpg',
    likes: 521,
    comments: 89,
    liked: false
  },
  {
    id: 8,
    author: '@RetroGamer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RetroGamer',
    timestamp: 'Hace 16 horas',
    frontTitle: '🎮 Elden Ring',
    frontDesc: 'Elden Ring es una obra maestra. 300 horas y todavía encuentro cosas nuevas. FromSoftware no falla.',
    frontImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
    backTitle: '📺 Game of Thrones',
    backDesc: 'Si disfrutaste el mundo oscuro de Elden Ring, Game of Thrones (temporadas 1-6) te atrapará con su fantasía épica.',
    backImg: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg',
    likes: 1024,
    comments: 203,
    liked: false
  },
];

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error conectando a la DB' });
  }
});

app.get('/api/recommendations', (req, res) => {
  res.json(data);
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Railway asigna el puerto automáticamente, si no existe usa 3000 para desarrollo local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});


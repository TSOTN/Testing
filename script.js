document.getElementById('year').textContent = new Date().getFullYear();

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const body = document.body;

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const isLightMode = body.classList.contains('light-mode');

  // Cambiar icono y guardar preferencia
  themeToggle.textContent = isLightMode ? '☀️' : '🌙';
  localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});

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

// Array de Posts para el Feed
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
    id: 2,
    author: '@GamingLegend',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GamingLegend',
    timestamp: 'Hace 4 horas',
    frontTitle: '🎮 Red Dead Redemption 2',
    frontDesc: 'Red Dead Redemption 2 sigue siendo el mejor juego de acción de la historia. Arthur Morgan es un personaje magistral.',
    frontImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
    backTitle: '🎬 The Assassination of Jesse James',
    backDesc: 'Drama western puro. Si disfrutaste RDR2, esta película te atrapará desde el primer segundo con su narrativa melancólica.',
    backImg: 'https://m.media-amazon.com/images/M/MV5BMTY2NDI2MTc2NV5BMl5BanBnXkFtZTcwNjA2NTQzMw@@._V1_.jpg',
    likes: 456,
    comments: 78,
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
    id: 4,
    author: '@PixelMaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelMaster',
    timestamp: 'Hace 8 horas',
    frontTitle: '🎮 Hades',
    frontDesc: 'Hades es adictivo. He jugado 200 horas y sigo queriendo más. El juego roguelike perfecto.',
    frontImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg',
    backTitle: '🎬 Clash of the Titans',
    backDesc: 'Si te encantó la mitología de Hades, esta aventura épica con dioses y monstruos es tu película.',
    backImg: 'https://imgs.search.brave.com/hxgTcZr0dFvWfp1MRGAJ2zXfPyePDmmvcnZ3qrqrDMU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvODM0/NTkwOS5qcGc',
    likes: 345,
    comments: 56,
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
  {
    id: 9,
    author: '@MangaFan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MangaFan',
    timestamp: 'Hace 18 horas',
    frontTitle: '📺 Cowboy Bebop (Anime)',
    frontDesc: 'Cowboy Bebop es atemporal. Jazz, space cowboys y filosofía existencial. Una joya del anime de los 90s.',
    frontImg: 'https://alfabetajuega.com/hero/2023/03/cowboy-bebop-orden-cronologico.jpg?width=768&aspect_ratio=16:9&format=nowebp',
    backTitle: '🎮 Mass Effect Trilogy',
    backDesc: 'Si te gustó la exploración espacial y los personajes de Bebop, Mass Effect te dará eso y más. Épica espacial inolvidable.',
    backImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1328670/header.jpg',
    likes: 743,
    comments: 121,
    liked: false
  }
];

// No mantener referencia persistente a `#results` (se reemplaza al cargar/explorar)
let currentMode = 'game'; // 'game' o 'movie'

function renderCards(items) {
  const resultsContainer = document.getElementById('results');
  if (!resultsContainer) return; // contenedor no presente (p.ej. estamos en Explorar)

  resultsContainer.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card-container';
    card.innerHTML = `
      <div class="card" data-index="${index}">
        <div class="card-front">
          <img src="${item.juegoImg}" alt="${item.juego}" onerror="this.src='https://via.placeholder.com/300x200/111122/00ffff?text=${encodeURIComponent(item.juego)}'" />
          <h2>🎮 ${item.juego}</h2>
          <p class="relation">${item.juegoDesc}</p>
          <button class="flip-card-btn" onclick="flipCard(${index})">Ver película recomendada ➜</button>
        </div>
        <div class="card-back">
          <img src="${item.peliculaImg}" alt="${item.pelicula}" onerror="this.src='https://via.placeholder.com/300x200/111122/ff00c8?text=${encodeURIComponent(item.pelicula)}'" />
          <h2>🎬 ${item.pelicula}</h2>
          <p class="relation">${item.peliculaDesc}</p>
          <button class="flip-card-btn" onclick="flipCard(${index})">← Ver videojuego</button>
        </div>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
}

function flipCard(index) {
  const card = document.querySelector(`.card[data-index="${index}"]`);
  if (!card) return;
  card.classList.toggle('flipped');
}

function flipAll() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.toggle('flipped'));
}

function showGames() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('flipped'));
}

function showMovies() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.add('flipped'));
}

function filterContent() {
  const term = document.getElementById('search').value.toLowerCase();
  const filtered = data.filter(d =>
    d.juego.toLowerCase().includes(term) || d.pelicula.toLowerCase().includes(term)
  );
  renderCards(filtered.length ? filtered : data);
}

function filterContentSidebar() {
  const term = document.getElementById('search-sidebar').value.toLowerCase();
  const filtered = posts.filter(p =>
    p.author.toLowerCase().includes(term) || p.frontTitle.toLowerCase().includes(term) || p.backTitle.toLowerCase().includes(term)
  );
  renderFeed(filtered.length ? filtered : posts);
}

// Render Feed
function renderFeed(feedPosts = posts) {
  const feedContainer = document.getElementById('feed');
  if (!feedContainer) return;

  feedContainer.innerHTML = '';
  feedPosts.forEach((post, index) => {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'post-card-container';
    cardContainer.innerHTML = `
      <div class="post-card" data-index="${index}">
        <div class="post-card-front">
          <img src="${post.frontImg}" alt="${post.frontTitle}" onerror="this.src='https://via.placeholder.com/300x200/111122/00ffff?text=${encodeURIComponent(post.frontTitle)}'" />
          <h2>${post.frontTitle}</h2>
          <p>${post.frontDesc}</p>
          <button class="flip-card-btn" onclick="flipPostCard(${index})">Ver recomendación ➜</button>
          <div class="post-actions">
            <div class="post-action ${post.liked ? 'liked' : ''}" onclick="toggleLike(${index})">
              <span class="post-action-icon">${post.liked ? '❤️' : '🤍'}</span>
              <span class="post-count">${post.likes}</span>
            </div>
            <div class="post-action">
              <span class="post-action-icon">💬</span>
              <span class="post-count">${post.comments}</span>
            </div>
            <div class="post-action">
              <span class="post-action-icon">↗️</span>
            </div>
          </div>
        </div>
        <div class="post-card-back">
          <img src="${post.backImg}" alt="${post.backTitle}" onerror="this.src='https://via.placeholder.com/300x200/111122/ff00c8?text=${encodeURIComponent(post.backTitle)}'" />
          <h2>${post.backTitle}</h2>
          <p>${post.backDesc}</p>
          <button class="flip-card-btn" onclick="flipPostCard(${index})">← Volver</button>
          <div class="post-actions">
            <div class="post-action ${post.liked ? 'liked' : ''}" onclick="toggleLike(${index})">
              <span class="post-action-icon">${post.liked ? '❤️' : '🤍'}</span>
              <span class="post-count">${post.likes}</span>
            </div>
            <div class="post-action">
              <span class="post-action-icon">💬</span>
              <span class="post-count">${post.comments}</span>
            </div>
            <div class="post-action">
              <span class="post-action-icon">↗️</span>
            </div>
          </div>
        </div>
      </div>
    `;
    feedContainer.appendChild(cardContainer);
  });
}

function flipPostCard(index) {
  const card = document.querySelector(`.post-card[data-index="${index}"]`);
  if (!card) return;
  card.classList.toggle('flipped');
}

function toggleLike(index) {
  posts[index].liked = !posts[index].liked;
  posts[index].likes += posts[index].liked ? 1 : -1;
  renderFeed();
}


// Sidebar Navigation Functionality
const navItems = document.querySelectorAll('.nav-item');

function handleNavClick(e) {
  const title = this.getAttribute('title');

  // Remove active state from all items
  navItems.forEach(nav => {
    nav.classList.remove('active');
    nav.setAttribute('aria-pressed', 'false');
  });

  // Set active on clicked/focused item
  this.classList.add('active');
  this.setAttribute('aria-pressed', 'true');

  // Hide/show search box in sidebar
  const searchBox = document.querySelector('.search-box-sidebar');
  if (title === 'Búsqueda') {
    searchBox.classList.add('active');
    document.getElementById('search-sidebar').focus();
  } else {
    searchBox.classList.remove('active');
  }

  switch (title) {
    case 'Inicio':
      // Restaurar la vista principal (home)
      restoreHomeSection();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    case 'Búsqueda':
      // Solo mostrar la búsqueda en el sidebar
      break;
    case 'Explorar':
      // Cargar la sección Explorar inline (SPA sin salir de la página)
      loadExploreSection();
      break;
    case 'Mensajería':
      // Cargar la sección Mensajería
      loadMessagingSection();
      break;
    case 'Notificaciones':
      // Cargar la sección Notificaciones
      loadNotificationsSection();
      break;
    case 'Crear':
      loadCreateSection();
      break;
    case 'Perfil':
      loadProfileSection();
      break;
    case 'Más':
      console.log('Más clicked');
      break;
  }
}

navItems.forEach(item => {
  item.addEventListener('click', handleNavClick);
  item.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavClick.call(this, e);
    }
  });
});

// Set first nav item as active by default
if (navItems.length) {
  navItems[0].classList.add('active');
  navItems[0].setAttribute('aria-pressed', 'true');
}

renderFeed();

// --- Integración SPA para sección Explorar (sin salir de la página) ---

// Guardar HTML original de home
const originalMainHTML = document.querySelector('.main-content').innerHTML;
let exploreCssLoaded = false;

// Datos de Explorar (globales para reutilizar)
const exploreData = [
  { type: 'juego', title: 'Hollow Knight', img: 'https://steamcdn-a.akamaihd.net/steam/apps/367520/header.jpg', desc: 'Metroidvania sombrío y preciso.' },
  { type: 'pelicula', title: 'Akira', img: 'https://img.youtube.com/vi/0sK3D3t2JTE/maxresdefault.jpg', desc: 'Clásico anime cyberpunk.' },
  { type: 'juego', title: 'Ori and the Blind Forest', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/387290/header.jpg', desc: 'Plataformas y emoción.' },
  { type: 'pelicula', title: 'Ghost in the Shell', img: 'https://img.youtube.com/vi/ztWT3rjVQ2M/maxresdefault.jpg', desc: 'Identidad y tecnología.' },
  { type: 'juego', title: 'Celeste', img: 'https://cdn.akamai.steamstatic.com/steam/apps/504230/header.jpg', desc: 'Plataformas desafiantes.' },
  { type: 'pelicula', title: 'Paprika', img: 'https://img.youtube.com/vi/VIhC8T7A8qI/maxresdefault.jpg', desc: 'Sueños y realidad entrelazados.' }
];

// Función para renderizar items de Explorar
function renderExploreItems(items) {
  const grid = document.getElementById('explore-grid');
  if (!grid) return;

  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'explore-card';
    const icon = item.type === 'juego' ? '🎮' : '🎬';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x180/111122/00ffff?text=${encodeURIComponent(item.title)}'"/>
      <h3>${icon} ${item.title}</h3>
      <p>${item.desc}</p>
    `;
    grid.appendChild(card);
  });
}

// Función para inicializar eventos de Explorar
function initExploreEvents() {
  const searchInput = document.getElementById('explore-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase();
      const filtered = exploreData.filter(item =>
        item.title.toLowerCase().includes(term) || item.desc.toLowerCase().includes(term)
      );
      renderExploreItems(filtered.length ? filtered : exploreData);
    });
  }

  const filterGamesBtn = document.getElementById('filter-games-btn');
  const filterMoviesBtn = document.getElementById('filter-movies-btn');

  if (filterGamesBtn) {
    filterGamesBtn.addEventListener('click', () => {
      renderExploreItems(exploreData.filter(item => item.type === 'juego'));
    });
  }

  if (filterMoviesBtn) {
    filterMoviesBtn.addEventListener('click', () => {
      renderExploreItems(exploreData.filter(item => item.type === 'pelicula'));
    });
  }
}

function loadExploreSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;

  // Cargar CSS de Explorar si no está cargado
  if (!exploreCssLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'explorar/styles.css';
    document.head.appendChild(link);
    exploreCssLoaded = true;
  }

  // Cargar el HTML fragmento de Explorar
  fetch('explorar/index.html')
    .then(res => res.text())
    .then(html => {
      // Insertar el contenido (sin etiquetas html/body)
      mainEl.innerHTML = html;

      // Renderizar items iniciales
      renderExploreItems(exploreData);

      // Inicializar eventos
      initExploreEvents();
    })
    .catch(err => console.error('Error cargando Explorar:', err));
}

let messagingCssLoaded = false;

function loadMessagingSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;

  // Cargar CSS de Mensajería si no está cargado
  if (!messagingCssLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'mensajeria/styles.css';
    document.head.appendChild(link);
    messagingCssLoaded = true;
  }

  // Cargar el HTML fragmento de Mensajería
  fetch('mensajeria/index.html')
    .then(res => res.text())
    .then(html => {
      // Insertar el contenido
      mainEl.innerHTML = html;

      // Cargar el script de mensajería
      const script = document.createElement('script');
      script.src = 'mensajeria/script.js';
      document.body.appendChild(script);
    })
    .catch(err => console.error('Error cargando Mensajería:', err));
}

let notificationsCssLoaded = false;

function loadNotificationsSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;

  // Cargar CSS de Notificaciones si no está cargado
  if (!notificationsCssLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'notificaciones/styles.css';
    document.head.appendChild(link);
    notificationsCssLoaded = true;
  }

  // Cargar el HTML fragmento de Notificaciones
  fetch('notificaciones/index.html')
    .then(res => res.text())
    .then(html => {
      // Insertar el contenido
      mainEl.innerHTML = html;

      // Cargar el script de notificaciones
      const script = document.createElement('script');
      script.src = 'notificaciones/script.js';
      document.body.appendChild(script);
    })
    .catch(err => console.error('Error cargando Notificaciones:', err));
}

let profileCssLoaded = false;

function loadProfileSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;

  // Cargar CSS de Perfil si no está cargado
  if (!profileCssLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'perfil/styles.css';
    document.head.appendChild(link);
    profileCssLoaded = true;
  }

  // Cargar el HTML fragmento de Perfil
  fetch('perfil/index.html')
    .then(res => res.text())
    .then(html => {
      // Insertar el contenido
      mainEl.innerHTML = html;

      // Cargar el script de perfil
      const script = document.createElement('script');
      script.src = 'perfil/script.js';
      document.body.appendChild(script);
    })
    .catch(err => console.error('Error cargando Perfil:', err));
}

let createCssLoaded = false;

function loadCreateSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;

  // Cargar CSS de Crear si no está cargado
  if (!createCssLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'crear/styles.css';
    document.head.appendChild(link);
    createCssLoaded = true;
  }

  // Cargar el HTML fragmento de Crear
  fetch('crear/index.html')
    .then(res => res.text())
    .then(html => {
      // Insertar el contenido
      mainEl.innerHTML = html;

      // Cargar el script de crear
      const script = document.createElement('script');
      script.src = 'crear/script.js';
      document.body.appendChild(script);
    })
    .catch(err => console.error('Error cargando Crear:', err));
}

function restoreHomeSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;
  mainEl.innerHTML = originalMainHTML;
  renderFeed();
}

// --- Fin integración SPA ---
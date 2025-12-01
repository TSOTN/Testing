document.getElementById('year').textContent = new Date().getFullYear();

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
          <h3>🎮 ${item.juego}</h3>
          <p class="relation">${item.juegoDesc}</p>
          <button class="flip-card-btn" onclick="flipCard(${index})">Ver película recomendada ➜</button>
        </div>
        <div class="card-back">
          <img src="${item.peliculaImg}" alt="${item.pelicula}" onerror="this.src='https://via.placeholder.com/300x200/111122/ff00c8?text=${encodeURIComponent(item.pelicula)}'" />
          <h3>🎬 ${item.pelicula}</h3>
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

  switch (title) {
    case 'Inicio':
      // Restaurar la vista principal (home)
      restoreHomeSection();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    case 'Búsqueda':
      document.getElementById('search').focus();
      break;
    case 'Explorar':
      // Cargar la sección Explorar inline (SPA sin salir de la página)
      loadExploreSection();
      break;
    case 'Mensajería':
      console.log('Mensajería clicked');
      break;
    case 'Notificaciones':
      console.log('Notificaciones clicked');
      break;
    case 'Crear':
      console.log('Crear clicked');
      break;
    case 'Perfil':
      console.log('Perfil clicked');
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

renderCards(data);

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

function restoreHomeSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;
  mainEl.innerHTML = originalMainHTML;
  renderCards(data);
}

// --- Fin integración SPA ---
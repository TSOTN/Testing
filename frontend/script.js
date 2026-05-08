// Ejecutar cuando el DOM esté listo
(function init() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    return;
  }

  // Año en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Theme Toggle Functionality
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const body = document.body;

  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLightMode = body.classList.contains('light-mode');

      // Cambiar icono y guardar preferencia
      themeToggle.textContent = isLightMode ? '☀️' : '🌙';
      localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
  }
})();

let data = [];

// Array de Posts para el Feed
let posts = [];

// No mantener referencia persistente a `#results` (se reemplaza al cargar/explorar)
let currentMode = 'game'; // 'game' o 'movie'

function renderCards(items) {
  const resultsContainer = document.getElementById('results');
  if (!resultsContainer) return; // contenedor no presente (p.ej. estamos en Explorar)

  resultsContainer.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card-container';
    const loadingAttr = index < 2 ? 'eager' : 'lazy';
    card.innerHTML = `
      <div class="card" data-index="${index}">
        <div class="card-front">
          <img src="${item.juegoImg}" alt="${item.juego}" loading="${loadingAttr}" width="300" height="200" decoding="async" onerror="this.src='https://via.placeholder.com/300x200/111122/00ffff?text=${encodeURIComponent(item.juego)}'" />
          <h2>🎮 ${item.juego}</h2>
          <p class="relation">${item.juegoDesc}</p>
          <button class="flip-card-btn" onclick="flipCard(${index})">Ver película recomendada ➜</button>
        </div>
        <div class="card-back">
          <img src="${item.peliculaImg}" alt="${item.pelicula}" loading="lazy" width="300" height="200" decoding="async" onerror="this.src='https://via.placeholder.com/300x200/111122/ff00c8?text=${encodeURIComponent(item.pelicula)}'" />
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
    // Lazy load images except the first one (LCP optimization)
    const loadingAttr = index === 0 ? 'eager' : 'lazy';
    const fetchPriority = index === 0 ? 'high' : 'auto';

    cardContainer.innerHTML = `
      <div class="post-card" data-index="${index}">
        <div class="post-card-front">
          <img src="${post.frontImg}" alt="${post.frontTitle}" loading="${loadingAttr}" fetchpriority="${fetchPriority}" width="280" height="200" decoding="async" onerror="this.src='https://via.placeholder.com/300x200/111122/00ffff?text=${encodeURIComponent(post.frontTitle)}'" />
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
          <img src="${post.backImg}" alt="${post.backTitle}" loading="lazy" width="280" height="200" decoding="async" onerror="this.src='https://via.placeholder.com/300x200/111122/ff00c8?text=${encodeURIComponent(post.backTitle)}'" />
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
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');

  if (navItems.length === 0) return; // Si no hay elementos, salir

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
        if (!isLoggedIn()) {
          loadAuthSection();
        } else {
          loadCreateSection();
        }
        break;
      case 'Perfil':
        if (!isLoggedIn()) {
          loadAuthSection();
        } else {
          loadProfileSection();
        }
        break;
      case 'Más':
        loadMasSection();
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
}

// Configuración del backend - detecta automáticamente si está en producción o desarrollo
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? null // null = modo desarrollo, intentará puertos locales
  : 'https://testing-ivmx.onrender.com'; // ✅ URL de producción en Render

// Función auxiliar para hacer fetch con reintentos en diferentes puertos (solo desarrollo)
async function fetchWithFallback(endpoint) {
  // Si hay una URL de producción configurada, úsala directamente
  if (API_BASE_URL) {
    try {
      console.log(`🌐 Conectando a backend en producción: ${API_BASE_URL}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (response.ok) {
        console.log(`✅ ¡Conexión exitosa con backend en producción!`);
        return await response.json();
      }
    } catch (error) {
      console.error(`❌ Error conectando a producción: ${error.message}`);
      throw error;
    }
  }

  // Modo desarrollo: intenta puertos locales
  const ports = [3001, 3000]; // Primero intenta Docker (3001), luego directo (3000)

  for (const port of ports) {
    try {
      console.log(`🔄 Intentando conectar al backend en puerto ${port}...`);
      const response = await fetch(`http://localhost:${port}${endpoint}`);
      if (response.ok) {
        console.log(`✅ ¡Conexión exitosa! Backend respondiendo en puerto ${port}`);
        return await response.json();
      } else {
        console.warn(`⚠️ Puerto ${port} respondió con status ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ Puerto ${port} no disponible: ${error.message}`);
      continue;
    }
  }
  throw new Error('No se pudo conectar al backend en ningún puerto');
}

// Render feed inicial e inicializar navegación cuando el DOM esté listo
async function initApp() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
    return;
  }

  try {
    console.log('🚀 Iniciando conexión con el backend...');

    // Estilo TikTok: siempre mostrar la app (feed visible sin login)
    document.getElementById('landing-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id || 0;
    const postsUrl = userId ? `/api/posts?user_id=${userId}` : '/api/posts';
    posts = await fetchWithFallback(postsUrl);
    console.log(`📦 Posts cargados: ${posts.length} posts recibidos del backend`);

    // Si el backend responde pero no hay posts, usamos los de prueba
    if (posts.length === 0) {
      console.log('📋 Base de datos vacía. Cargando datos de prueba (mock data)...');
      posts = [
        { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', timestamp: 'Hace 2h', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg', frontTitle: 'Cyberpunk 2077', frontDesc: 'RPG de mundo abierto en un futuro distópico.', backImg: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png', backTitle: 'Blade Runner 2049', backDesc: 'Un nuevo blade runner descubre un secreto mucho tiempo enterrado.', liked: false, likes: 124, comments: 45 },
        { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2', timestamp: 'Hace 5h', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg', frontTitle: 'Red Dead Redemption 2', frontDesc: 'Épica historia de forajidos en el corazón de América.', backImg: 'https://upload.wikimedia.org/wikipedia/en/d/d4/The_Hateful_Eight.jpg', backTitle: 'The Hateful Eight', backDesc: 'Ocho extraños atrapados en una cabaña durante una tormenta.', liked: true, likes: 892, comments: 120 },
        { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3', timestamp: 'Hace 1d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg', frontTitle: 'Dark Souls III', frontDesc: 'Desafía a la oscuridad en este RPG de acción aclamado.', backImg: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Berserk_%281997_anime%29%2C_DVD_cover_1.jpg', backTitle: 'Berserk (1997)', backDesc: 'La historia de Guts y su búsqueda de venganza en un mundo oscuro.', liked: false, likes: 567, comments: 89 },
        { author: '@PixelFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4', timestamp: 'Hace 1d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/header.jpg', frontTitle: 'The Last of Us Part I', frontDesc: 'Un viaje brutal y emotivo a través de un mundo post-apocalíptico.', backImg: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Children_of_men_ver4.jpg', backTitle: 'Children of Men', backDesc: 'La humanidad al borde de la extinción y la esperanza en una persona.', liked: false, likes: 832, comments: 211 },
        { author: '@GamerCinefilo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5', timestamp: 'Hace 2d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg', frontTitle: 'Ghost of Tsushima', frontDesc: 'Conviértete en el Fantasma para salvar a tu isla de la invasión mongola.', backImg: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Seven_Samurai_Poster.png', backTitle: 'Seven Samurai', backDesc: 'La obra maestra de Akira Kurosawa sobre el honor y el sacrificio.', liked: true, likes: 1045, comments: 154 },
        { author: '@HorrorFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6', timestamp: 'Hace 2d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg', frontTitle: 'Resident Evil 4', frontDesc: 'Sobrevive a las hordas infectadas en una aldea remota.', backImg: 'https://upload.wikimedia.org/wikipedia/en/1/16/Dawn_of_the_Dead_2004_movie.jpg', backTitle: 'Dawn of the Dead', backDesc: 'Un clásico de zombis y supervivencia con un ritmo frenético.', liked: false, likes: 423, comments: 67 },
        { author: '@SciFiGeek', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7', timestamp: 'Hace 3d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/7670/header.jpg', frontTitle: 'BioShock', frontDesc: 'Explora la distópica y sumergida ciudad de Rapture.', backImg: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Snowpiercer_poster.jpg', backTitle: 'Snowpiercer', backDesc: 'Lucha de clases en un tren distópico y claustrofóbico.', liked: true, likes: 789, comments: 92 },
        { author: '@SpaceExplorer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=8', timestamp: 'Hace 4d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/header.jpg', frontTitle: 'Mass Effect', frontDesc: 'Épica ópera espacial que decidirá el destino de la galaxia.', backImg: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', backTitle: 'Interstellar', backDesc: 'Un viaje a través de las estrellas buscando la salvación de la humanidad.', liked: false, likes: 1542, comments: 310 },
        { author: '@IndieLover', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=9', timestamp: 'Hace 4d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg', frontTitle: 'Hollow Knight', frontDesc: 'Adéntrate en las profundidades de Hallownest, un reino olvidado.', backImg: 'https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png', backTitle: 'Spirited Away', backDesc: 'Magia, melancolía y criaturas misteriosas en una aventura inolvidable.', liked: true, likes: 2314, comments: 405 },
        { author: '@MindBender', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10', timestamp: 'Hace 5d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/header.jpg', frontTitle: 'Control', frontDesc: 'Realidades que se fracturan y misterios en la Casa Inmemorial.', backImg: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', backTitle: 'Inception', backDesc: 'Manipulación de sueños, arquitectura imposible y acción pura.', liked: false, likes: 981, comments: 142 },
        { author: '@KojimaFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=11', timestamp: 'Hace 5d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/header.jpg', frontTitle: 'Death Stranding', frontDesc: 'Conecta un mundo fracturado rodeado de entidades misteriosas.', backImg: 'https://m.media-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_.jpg', backTitle: 'Annihilation', backDesc: 'Una expedición a un área afectada por fenómenos incomprensibles.', liked: true, likes: 654, comments: 88 },
        { author: '@Tarnished', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12', timestamp: 'Hace 6d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg', frontTitle: 'Elden Ring', frontDesc: 'Un majestuoso viaje de fantasía oscura para restaurar el Círculo de Elden.', backImg: 'https://upload.wikimedia.org/wikipedia/en/0/09/The_Green_Knight_poster.jpeg', backTitle: 'The Green Knight', backDesc: 'Caballería, mitos artúricos oscuros y un mundo lleno de misticismo.', liked: false, likes: 3421, comments: 512 }
      ];
    }
    renderFeed();

    data = await fetchWithFallback('/api/recommendations');
    console.log(`📦 Recomendaciones cargadas: ${data.length}`);
    console.log('✅ ¡Frontend conectado correctamente al backend!');

    if (user.username) {
      console.log(`👤 Sesión: ${user.username}`);
    } else {
      console.log('🔓 Navegando como invitado. Inicia sesión en "Más" cuando quieras.');
    }

  } catch (error) {
    console.error('❌ ERROR: No se pudo conectar al backend:', error.message);
    console.log('📋 Cargando datos de prueba (mock data) como respaldo...');

    posts = [
      { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', timestamp: 'Hace 2h', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg', frontTitle: 'Cyberpunk 2077', frontDesc: 'RPG de mundo abierto en un futuro distópico.', backImg: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png', backTitle: 'Blade Runner 2049', backDesc: 'Un nuevo blade runner descubre un secreto mucho tiempo enterrado.', liked: false, likes: 124, comments: 45 },
      { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2', timestamp: 'Hace 5h', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg', frontTitle: 'Red Dead Redemption 2', frontDesc: 'Épica historia de forajidos en el corazón de América.', backImg: 'https://upload.wikimedia.org/wikipedia/en/d/d4/The_Hateful_Eight.jpg', backTitle: 'The Hateful Eight', backDesc: 'Ocho extraños atrapados en una cabaña durante una tormenta.', liked: true, likes: 892, comments: 120 },
      { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3', timestamp: 'Hace 1d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg', frontTitle: 'Dark Souls III', frontDesc: 'Desafía a la oscuridad en este RPG de acción aclamado.', backImg: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Berserk_%281997_anime%29%2C_DVD_cover_1.jpg', backTitle: 'Berserk (1997)', backDesc: 'La historia de Guts y su búsqueda de venganza en un mundo oscuro.', liked: false, likes: 567, comments: 89 },
      { author: '@PixelFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4', timestamp: 'Hace 1d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/header.jpg', frontTitle: 'The Last of Us Part I', frontDesc: 'Un viaje brutal y emotivo a través de un mundo post-apocalíptico.', backImg: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Children_of_men_ver4.jpg', backTitle: 'Children of Men', backDesc: 'La humanidad al borde de la extinción y la esperanza en una persona.', liked: false, likes: 832, comments: 211 },
      { author: '@GamerCinefilo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5', timestamp: 'Hace 2d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg', frontTitle: 'Ghost of Tsushima', frontDesc: 'Conviértete en el Fantasma para salvar a tu isla de la invasión mongola.', backImg: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Seven_Samurai_Poster.png', backTitle: 'Seven Samurai', backDesc: 'La obra maestra de Akira Kurosawa sobre el honor y el sacrificio.', liked: true, likes: 1045, comments: 154 },
      { author: '@HorrorFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6', timestamp: 'Hace 2d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg', frontTitle: 'Resident Evil 4', frontDesc: 'Sobrevive a las hordas infectadas en una aldea remota.', backImg: 'https://upload.wikimedia.org/wikipedia/en/1/16/Dawn_of_the_Dead_2004_movie.jpg', backTitle: 'Dawn of the Dead', backDesc: 'Un clásico de zombis y supervivencia con un ritmo frenético.', liked: false, likes: 423, comments: 67 },
      { author: '@SciFiGeek', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7', timestamp: 'Hace 3d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/7670/header.jpg', frontTitle: 'BioShock', frontDesc: 'Explora la distópica y sumergida ciudad de Rapture.', backImg: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Snowpiercer_poster.jpg', backTitle: 'Snowpiercer', backDesc: 'Lucha de clases en un tren distópico y claustrofóbico.', liked: true, likes: 789, comments: 92 },
      { author: '@SpaceExplorer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=8', timestamp: 'Hace 4d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/header.jpg', frontTitle: 'Mass Effect', frontDesc: 'Épica ópera espacial que decidirá el destino de la galaxia.', backImg: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', backTitle: 'Interstellar', backDesc: 'Un viaje a través de las estrellas buscando la salvación de la humanidad.', liked: false, likes: 1542, comments: 310 },
      { author: '@IndieLover', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=9', timestamp: 'Hace 4d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg', frontTitle: 'Hollow Knight', frontDesc: 'Adéntrate en las profundidades de Hallownest, un reino olvidado.', backImg: 'https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png', backTitle: 'Spirited Away', backDesc: 'Magia, melancolía y criaturas misteriosas en una aventura inolvidable.', liked: true, likes: 2314, comments: 405 },
      { author: '@MindBender', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10', timestamp: 'Hace 5d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/header.jpg', frontTitle: 'Control', frontDesc: 'Realidades que se fracturan y misterios en la Casa Inmemorial.', backImg: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', backTitle: 'Inception', backDesc: 'Manipulación de sueños, arquitectura imposible y acción pura.', liked: false, likes: 981, comments: 142 },
      { author: '@KojimaFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=11', timestamp: 'Hace 5d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/header.jpg', frontTitle: 'Death Stranding', frontDesc: 'Conecta un mundo fracturado rodeado de entidades misteriosas.', backImg: 'https://m.media-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_.jpg', backTitle: 'Annihilation', backDesc: 'Una expedición a un área afectada por fenómenos incomprensibles.', liked: true, likes: 654, comments: 88 },
      { author: '@Tarnished', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12', timestamp: 'Hace 6d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg', frontTitle: 'Elden Ring', frontDesc: 'Un majestuoso viaje de fantasía oscura para restaurar el Círculo de Elden.', backImg: 'https://upload.wikimedia.org/wikipedia/en/0/09/The_Green_Knight_poster.jpeg', backTitle: 'The Green Knight', backDesc: 'Caballería, mitos artúricos oscuros y un mundo lleno de misticismo.', liked: false, likes: 3421, comments: 512 }
    ];

    // Renderizamos con los datos de prueba
    renderFeed();

    // Siempre mostrar app (estilo TikTok) aunque falle el backend
    document.getElementById('landing-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';
  }

  initNavigation();
}

initApp();

// --- Integración SPA para sección Explorar (sin salir de la página) ---

// Guardar HTML original de home
const originalMainHTML = document.querySelector('.main-content').innerHTML;
let exploreCssLoaded = false;

// Datos de Explorar (globales para reutilizar)
const exploreData = [
  { type: 'juego', title: 'Hollow Knight', img: 'https://steamcdn-a.akamaihd.net/steam/apps/367520/header.jpg', desc: 'Metroidvania sombrío y preciso.' },
  { type: 'pelicula', title: 'Akira', img: 'https://upload.wikimedia.org/wikipedia/en/5/5d/AKIRA_%281988_poster%29.jpg', desc: 'Clásico anime cyberpunk.' },
  { type: 'juego', title: 'Ori and the Blind Forest', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/387290/header.jpg', desc: 'Plataformas y emoción.' },
  { type: 'pelicula', title: 'Your Name', img: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png', desc: 'Destino, magia y un amor atemporal.' },
  { type: 'juego', title: 'Celeste', img: 'https://cdn.akamai.steamstatic.com/steam/apps/504230/header.jpg', desc: 'Plataformas desafiantes.' },
  { type: 'pelicula', title: 'Paprika', img: 'https://upload.wikimedia.org/wikipedia/en/1/16/Paprikaposter.jpg', desc: 'Sueños y realidad entrelazados.' },
  { type: 'serie', title: 'Stranger Things', img: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg', desc: 'Misterio ochentero, terror y amistad en Hawkins.' },
  { type: 'serie', title: 'Attack on Titan', img: 'https://m.media-amazon.com/images/M/MV5BZjliODY5MzQtMmViZC00MTZmLWFhMWMtMjMwM2I3OGY1MTRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', desc: 'Titanes, guerra y giros brutales. Épica total.' },
  { type: 'serie', title: 'Black Mirror', img: 'https://static.tvmaze.com/uploads/images/original_untouched/564/1411764.jpg', desc: 'Tecnología + dilemas morales en episodios autoconclusivos.' }
];

function ensureExploreModal() {
  if (document.getElementById('explore-modal-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'explore-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.style.cssText = [
    'position: fixed',
    'inset: 0',
    'background: rgba(0,0,0,0.65)',
    'backdrop-filter: blur(6px)',
    'display: none',
    'align-items: center',
    'justify-content: center',
    'padding: 18px',
    'z-index: 9999'
  ].join(';');

  overlay.innerHTML = `
    <div id="explore-modal" style="
      width: min(720px, 100%);
      background: var(--card);
      border: 1px solid rgba(255,255,255,0.10);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.45);
      position: relative;
    ">
      <button id="explore-modal-close" type="button" aria-label="Cerrar" style="
        position: absolute;
        top: 12px;
        right: 12px;
        width: 40px;
        height: 40px;
        border-radius: 12px;
        border: 2px solid var(--accent1);
        background: rgba(0,255,255,0.08);
        color: var(--accent1);
        cursor: pointer;
        font-size: 18px;
      ">✕</button>
      <div id="explore-modal-hero" style="height: 220px; position: relative; overflow: hidden; background: #0b0b12;">
        <img id="explore-modal-img" alt="" style="width:100%;height:100%;object-fit:cover;opacity:0.92;transform: scale(1.02);filter: saturate(1.15) contrast(1.05);" />
        <canvas id="explore-hk-canvas" width="1200" height="500" style="position:absolute;inset:0;width:100%;height:100%;display:none;"></canvas>
        <div id="explore-modal-glow" style="position:absolute;inset:0;background: radial-gradient(circle at 30% 20%, rgba(0,255,255,0.18), transparent 45%), radial-gradient(circle at 70% 80%, rgba(255,0,200,0.14), transparent 50%);"></div>
      </div>
      <div style="padding: 18px 18px 16px 18px;">
        <div style="display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;">
          <h2 id="explore-modal-title" style="margin:0;font-size:1.35rem;color:var(--text);letter-spacing:0.2px;"></h2>
          <span id="explore-modal-badge" style="display:none;padding:6px 10px;border-radius:999px;border:1px solid rgba(0,255,255,0.35);background:rgba(0,255,255,0.08);color:var(--accent1);font-size:0.78rem;">Sello desbloqueado</span>
        </div>
        <p id="explore-modal-desc" style="margin:10px 0 0 0;color:var(--muted);line-height:1.45;"></p>
        <div id="explore-modal-surprise" style="margin-top:14px;padding:14px;border-radius:14px;border:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.12);"></div>
      </div>
    </div>
  `;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.style.display = 'none';
  });

  document.body.appendChild(overlay);

  const closeBtn = document.getElementById('explore-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', () => { overlay.style.display = 'none'; });
}

function showExploreModal(item) {
  ensureExploreModal();
  const overlay = document.getElementById('explore-modal-overlay');
  const img = document.getElementById('explore-modal-img');
  const title = document.getElementById('explore-modal-title');
  const desc = document.getElementById('explore-modal-desc');
  const surprise = document.getElementById('explore-modal-surprise');
  const badge = document.getElementById('explore-modal-badge');
  const canvas = document.getElementById('explore-hk-canvas');

  if (!overlay || !img || !title || !desc || !surprise || !badge || !canvas) return;

  // Base content
  img.src = item.img;
  img.alt = item.title;
  title.textContent = `${item.type === 'juego' ? '🎮' : '🎬'} ${item.title}`;
  desc.textContent = item.desc;
  badge.style.display = 'none';
  canvas.style.display = 'none';
  surprise.innerHTML = '';

  // Surprise logic
  if (item.title === 'Hollow Knight') {
    const key = 'pf_hk_seal_unlocked';
    const already = localStorage.getItem(key) === '1';
    localStorage.setItem(key, '1');

    badge.style.display = 'inline-flex';
    badge.textContent = already ? 'Sello del Vacío (ya lo tienes)' : 'Sello del Vacío desbloqueado';

    surprise.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;">
        <div>
          <div style="color:var(--accent1);font-weight:700;letter-spacing:0.4px;">Easter egg: “El Vacío te reconoce”</div>
          <div style="color:var(--muted);margin-top:6px;font-size:0.9rem;">Has desbloqueado un sello secreto. Mira el cielo…</div>
        </div>
        <button id="hk-replay" type="button" style="
          padding:10px 14px;border-radius:12px;border:2px solid var(--accent2);
          background: rgba(255,0,200,0.10); color: var(--accent2); cursor:pointer;
          font-family:'Orbitron', sans-serif; font-size:0.85rem;
        ">Repetir sorpresa</button>
      </div>
      <div style="margin-top:12px;color:var(--muted);font-size:0.85rem;">
        Pista: si vuelves a abrir Explorar, el sello se guarda en tu navegador.
      </div>
    `;

    const run = () => runHollowKnightSurprise();
    setTimeout(run, 80);
    const replay = document.getElementById('hk-replay');
    if (replay) replay.addEventListener('click', run);
  } else {
    const snippets = [
      'Sorpresa rápida: te acabo de “emparejar” esto con otra recomendación del universo Pixel & Frames.',
      'Plot twist: si esto te gustó, tu próxima obsesión ya está a 1 click.',
      'Modo cine/gaming: activado. Hoy toca descubrir algo nuevo.'
    ];
    const pick = snippets[Math.floor(Math.random() * snippets.length)];
    surprise.innerHTML = `
      <div style="color:var(--text);font-weight:700;">${pick}</div>
      <div style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;">
        <span style="padding:6px 10px;border-radius:999px;border:1px solid rgba(0,255,255,0.25);background:rgba(0,255,255,0.06);color:var(--accent1);font-size:0.78rem;">Neón</span>
        <span style="padding:6px 10px;border-radius:999px;border:1px solid rgba(255,0,200,0.22);background:rgba(255,0,200,0.06);color:var(--accent2);font-size:0.78rem;">Retro-futuro</span>
        <span style="padding:6px 10px;border-radius:999px;border:1px solid rgba(255,255,255,0.10);background:rgba(0,0,0,0.10);color:var(--muted);font-size:0.78rem;">Descubre</span>
      </div>
    `;
  }

  overlay.style.display = 'flex';
}

function runHollowKnightSurprise() {
  ensureExploreModal();
  const canvas = document.getElementById('explore-hk-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.style.display = 'block';

  const DPR = Math.min(2, window.devicePixelRatio || 1);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * DPR));
  canvas.height = Math.max(1, Math.floor(rect.height * DPR));
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

  const w = rect.width;
  const h = rect.height;

  const particles = Array.from({ length: 140 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.8 + Math.random() * 2.2,
    vx: -0.3 + Math.random() * 0.6,
    vy: -0.9 + Math.random() * 1.6,
    a: 0.12 + Math.random() * 0.55
  }));

  const start = performance.now();
  const duration = 1800;

  function frame(now) {
    const t = now - start;
    const k = Math.min(1, t / duration);

    ctx.clearRect(0, 0, w, h);

    // soft vignette
    const g = ctx.createRadialGradient(w * 0.5, h * 0.55, 40, w * 0.5, h * 0.55, Math.max(w, h) * 0.65);
    g.addColorStop(0, `rgba(0, 255, 255, ${0.12 * (1 - k)})`);
    g.addColorStop(0.6, `rgba(10, 10, 18, ${0.14})`);
    g.addColorStop(1, `rgba(0, 0, 0, ${0.55})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // particles (void fireflies)
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) p.y = h + 10;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(0, 255, 255, ${p.a * (1 - k * 0.15)})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // glyph
    ctx.save();
    ctx.translate(w * 0.5, h * 0.55);
    ctx.globalAlpha = 0.95 * (1 - Math.max(0, k - 0.85) / 0.15);
    ctx.strokeStyle = `rgba(255, 255, 255, 0.55)`;
    ctx.lineWidth = 1.2;
    ctx.shadowBlur = 18;
    ctx.shadowColor = 'rgba(0,255,255,0.55)';

    const s = 0.75 + k * 0.3;
    ctx.scale(s, s);
    ctx.beginPath();
    ctx.moveTo(0, -70);
    ctx.bezierCurveTo(55, -60, 55, 40, 0, 70);
    ctx.bezierCurveTo(-55, 40, -55, -60, 0, -70);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-18, -25);
    ctx.lineTo(-32, -10);
    ctx.lineTo(-18, 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(18, -25);
    ctx.lineTo(32, -10);
    ctx.lineTo(18, 5);
    ctx.stroke();

    ctx.restore();

    if (t < duration) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

// Función para renderizar items de Explorar
function renderExploreItems(items) {
  const grid = document.getElementById('explore-grid');
  if (!grid) return;

  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'explore-card';
    const icon = item.type === 'juego' ? '🎮' : item.type === 'pelicula' ? '🎬' : '📺';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" loading="lazy" width="400" height="180" decoding="async" onerror="this.src='https://via.placeholder.com/400x180/111122/00ffff?text=${encodeURIComponent(item.title)}'"/>
      <h3>${icon} ${item.title}</h3>
      <p>${item.desc}</p>
    `;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => showExploreModal(item));
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
  const filterSeriesBtn = document.getElementById('filter-series-btn');
  const filterMoviesBtn = document.getElementById('filter-movies-btn');

  if (filterGamesBtn) {
    filterGamesBtn.addEventListener('click', () => {
      renderExploreItems(exploreData.filter(item => item.type === 'juego'));
    });
  }

  if (filterSeriesBtn) {
    filterSeriesBtn.addEventListener('click', () => {
      renderExploreItems(exploreData.filter(item => item.type === 'serie'));
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
    link.href = '/explorar/styles.css';
    document.head.appendChild(link);
    exploreCssLoaded = true;
  }

  // Cargar el HTML fragmento de Explorar
  fetch('/explorar/index.html')
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
let messagingScriptLoaded = false;

function loadMessagingSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;

  // Cargar CSS de Mensajería si no está cargado
  if (!messagingCssLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/mensajeria/styles.css';
    document.head.appendChild(link);
    messagingCssLoaded = true;
  }

  // Cargar el HTML fragmento de Mensajería
  fetch('/mensajeria/index.html')
    .then(res => res.text())
    .then(html => {
      // Insertar el contenido
      mainEl.innerHTML = html;

      // Cargar el script de mensajería
      if (!messagingScriptLoaded) {
        const script = document.createElement('script');
        script.src = '/mensajeria/script.js';
        document.body.appendChild(script);
        messagingScriptLoaded = true;
      } else if (typeof initMensajeria === 'function') {
        initMensajeria();
      }
    })
    .catch(err => console.error('Error cargando Mensajería:', err));
}

let notificationsCssLoaded = false;
let notificationsScriptLoaded = false;

function loadNotificationsSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;

  // Cargar CSS de Notificaciones si no está cargado
  if (!notificationsCssLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/notificaciones/styles.css';
    document.head.appendChild(link);
    notificationsCssLoaded = true;
  }

  // Cargar el HTML fragmento de Notificaciones
  fetch('/notificaciones/index.html')
    .then(res => res.text())
    .then(html => {
      // Insertar el contenido
      mainEl.innerHTML = html;

      // Cargar el script de notificaciones
      if (!notificationsScriptLoaded) {
        const script = document.createElement('script');
        script.src = '/notificaciones/script.js';
        document.body.appendChild(script);
        notificationsScriptLoaded = true;
      } else if (typeof initNotificaciones === 'function') {
        initNotificaciones();
      }
    })
    .catch(err => console.error('Error cargando Notificaciones:', err));
}

let profileCssLoaded = false;
let profileScriptLoaded = false;

function loadProfileSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;

  // Cargar CSS de Perfil si no está cargado
  if (!profileCssLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/perfil/styles.css';
    document.head.appendChild(link);
    profileCssLoaded = true;
  }

  // Cargar el HTML fragmento de Perfil
  fetch('/perfil/index.html')
    .then(res => res.text())
    .then(html => {
      // Insertar el contenido
      mainEl.innerHTML = html;

      // Cargar el script de perfil
      if (!profileScriptLoaded) {
        const script = document.createElement('script');
        script.src = '/perfil/script.js';
        document.body.appendChild(script);
        profileScriptLoaded = true;
      } else if (typeof initializeProfile === 'function') {
        initializeProfile();
      }
    })
    .catch(err => console.error('Error cargando Perfil:', err));
}

let createCssLoaded = false;
let createScriptLoaded = false;

// --- Auth System Integration ---

function isLoggedIn() {
  return !!localStorage.getItem('token');
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.reload();
}

let authCssLoaded = false;

// Nuevo cargador para la Landing Page (Gatekeeper)
function loadAuthIntoLanding() {
  const landingEl = document.getElementById('landing-container');
  if (!landingEl) return;

  // Cargar CSS de Auth si no está cargado
  if (!authCssLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/auth/styles.css';
    document.head.appendChild(link);
    authCssLoaded = true;
  }

  // Cargar el HTML fragmento de Auth
  fetch('/auth/index.html')
    .then(res => res.text())
    .then(html => {
      landingEl.innerHTML = html;

      // Cargar script de Auth
      // Eliminar script anterior si existe para reiniciar eventos
      const oldScript = document.getElementById('auth-script');
      if (oldScript) oldScript.remove();

      const script = document.createElement('script');
      script.src = '/auth/script.js';
      script.id = 'auth-script';
      document.body.appendChild(script);
    })
    .catch(err => console.error('Error cargando Auth:', err));
}

function loadAuthSection() {
  // Mostrar inicio de sesión dentro de la app (estilo TikTok): va a la sección "Más" que incluye auth
  loadMasSection();
}

let masCssLoaded = false;

function loadMasSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;

  if (!masCssLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/auth/styles.css';
    document.head.appendChild(link);
    masCssLoaded = true;
  }

  if (isLoggedIn()) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    mainEl.innerHTML = `
      <div class="mas-section">
        <h1>Más</h1>
        <p class="subtitle">Opciones de tu cuenta</p>
        <div class="mas-panel">
          <div class="mas-user">
            <img src="${user.avatar_url || user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (user.username || '')}" alt="" class="mas-avatar" />
            <div>
              <strong>${user.username || 'Usuario'}</strong>
              <span class="mas-handle">@${user.username || 'usuario'}</span>
            </div>
          </div>
          <button type="button" class="mas-logout-btn" id="mas-logout-btn">Cerrar sesión</button>
        </div>
      </div>
    `;
    const logoutBtn = document.getElementById('mas-logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => { logout(); });
    return;
  }

  // No logueado: mostrar formulario de Iniciar sesión / Registrarse
  fetch('/auth/index.html')
    .then(res => res.text())
    .then(html => {
      mainEl.innerHTML = '<div class="mas-section"><h1>Más</h1><p class="subtitle">Inicia sesión o regístrate cuando quieras</p>' + html + '</div>';
      const oldScript = document.getElementById('auth-script');
      if (oldScript) oldScript.remove();
      const script = document.createElement('script');
      script.src = '/auth/script.js';
      script.id = 'auth-script';
      document.body.appendChild(script);
    })
    .catch(err => console.error('Error cargando Más/Auth:', err));
}


function loadCreateSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;

  // Cargar CSS de Crear si no está cargado
  if (!createCssLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/crear/styles.css';
    document.head.appendChild(link);
    createCssLoaded = true;
  }

  // Cargar el HTML fragmento de Crear
  fetch('/crear/index.html')
    .then(res => res.text())
    .then(html => {
      // Insertar el contenido
      mainEl.innerHTML = html;

      // Cargar el script de crear
      if (!createScriptLoaded) {
        const script = document.createElement('script');
        script.src = '/crear/script.js';
        document.body.appendChild(script);
        createScriptLoaded = true;
      } else if (typeof initializeCreate === 'function') {
        initializeCreate();
      }
    })
    .catch(err => console.error('Error cargando Crear:', err));
}

async function restoreHomeSection() {
  const mainEl = document.querySelector('.main-content');
  if (!mainEl) return;
  mainEl.innerHTML = originalMainHTML;
  // Volver a cargar posts desde el servidor para ver los últimos (incluido el que acabas de publicar)
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id || 0;
    const postsUrl = userId ? `/api/posts?user_id=${userId}` : '/api/posts';
    posts = await fetchWithFallback(postsUrl);
    
    // Si la base de datos está vacía, mostrar mock data
    if (posts.length === 0) {
      posts = [
        { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', timestamp: 'Hace 2h', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg', frontTitle: 'Cyberpunk 2077', frontDesc: 'RPG de mundo abierto en un futuro distópico.', backImg: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png', backTitle: 'Blade Runner 2049', backDesc: 'Un nuevo blade runner descubre un secreto mucho tiempo enterrado.', liked: false, likes: 124, comments: 45 },
        { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2', timestamp: 'Hace 5h', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg', frontTitle: 'Red Dead Redemption 2', frontDesc: 'Épica historia de forajidos en el corazón de América.', backImg: 'https://upload.wikimedia.org/wikipedia/en/d/d4/The_Hateful_Eight.jpg', backTitle: 'The Hateful Eight', backDesc: 'Ocho extraños atrapados en una cabaña durante una tormenta.', liked: true, likes: 892, comments: 120 },
        { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3', timestamp: 'Hace 1d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg', frontTitle: 'Dark Souls III', frontDesc: 'Desafía a la oscuridad en este RPG de acción aclamado.', backImg: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Berserk_%281997_anime%29%2C_DVD_cover_1.jpg', backTitle: 'Berserk (1997)', backDesc: 'La historia de Guts y su búsqueda de venganza en un mundo oscuro.', liked: false, likes: 567, comments: 89 },
        { author: '@PixelFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4', timestamp: 'Hace 1d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/header.jpg', frontTitle: 'The Last of Us Part I', frontDesc: 'Un viaje brutal y emotivo a través de un mundo post-apocalíptico.', backImg: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Children_of_men_ver4.jpg', backTitle: 'Children of Men', backDesc: 'La humanidad al borde de la extinción y la esperanza en una persona.', liked: false, likes: 832, comments: 211 },
        { author: '@GamerCinefilo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5', timestamp: 'Hace 2d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg', frontTitle: 'Ghost of Tsushima', frontDesc: 'Conviértete en el Fantasma para salvar a tu isla de la invasión mongola.', backImg: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Seven_Samurai_Poster.png', backTitle: 'Seven Samurai', backDesc: 'La obra maestra de Akira Kurosawa sobre el honor y el sacrificio.', liked: true, likes: 1045, comments: 154 },
        { author: '@HorrorFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6', timestamp: 'Hace 2d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg', frontTitle: 'Resident Evil 4', frontDesc: 'Sobrevive a las hordas infectadas en una aldea remota.', backImg: 'https://upload.wikimedia.org/wikipedia/en/1/16/Dawn_of_the_Dead_2004_movie.jpg', backTitle: 'Dawn of the Dead', backDesc: 'Un clásico de zombis y supervivencia con un ritmo frenético.', liked: false, likes: 423, comments: 67 },
        { author: '@SciFiGeek', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7', timestamp: 'Hace 3d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/7670/header.jpg', frontTitle: 'BioShock', frontDesc: 'Explora la distópica y sumergida ciudad de Rapture.', backImg: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Snowpiercer_poster.jpg', backTitle: 'Snowpiercer', backDesc: 'Lucha de clases en un tren distópico y claustrofóbico.', liked: true, likes: 789, comments: 92 },
        { author: '@SpaceExplorer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=8', timestamp: 'Hace 4d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/header.jpg', frontTitle: 'Mass Effect', frontDesc: 'Épica ópera espacial que decidirá el destino de la galaxia.', backImg: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', backTitle: 'Interstellar', backDesc: 'Un viaje a través de las estrellas buscando la salvación de la humanidad.', liked: false, likes: 1542, comments: 310 },
        { author: '@IndieLover', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=9', timestamp: 'Hace 4d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg', frontTitle: 'Hollow Knight', frontDesc: 'Adéntrate en las profundidades de Hallownest, un reino olvidado.', backImg: 'https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png', backTitle: 'Spirited Away', backDesc: 'Magia, melancolía y criaturas misteriosas en una aventura inolvidable.', liked: true, likes: 2314, comments: 405 },
        { author: '@MindBender', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10', timestamp: 'Hace 5d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/header.jpg', frontTitle: 'Control', frontDesc: 'Realidades que se fracturan y misterios en la Casa Inmemorial.', backImg: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', backTitle: 'Inception', backDesc: 'Manipulación de sueños, arquitectura imposible y acción pura.', liked: false, likes: 981, comments: 142 },
        { author: '@KojimaFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=11', timestamp: 'Hace 5d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/header.jpg', frontTitle: 'Death Stranding', frontDesc: 'Conecta un mundo fracturado rodeado de entidades misteriosas.', backImg: 'https://m.media-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_.jpg', backTitle: 'Annihilation', backDesc: 'Una expedición a un área afectada por fenómenos incomprensibles.', liked: true, likes: 654, comments: 88 },
        { author: '@Tarnished', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12', timestamp: 'Hace 6d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg', frontTitle: 'Elden Ring', frontDesc: 'Un majestuoso viaje de fantasía oscura para restaurar el Círculo de Elden.', backImg: 'https://upload.wikimedia.org/wikipedia/en/0/09/The_Green_Knight_poster.jpeg', backTitle: 'The Green Knight', backDesc: 'Caballería, mitos artúricos oscuros y un mundo lleno de misticismo.', liked: false, likes: 3421, comments: 512 }
      ];
    }
  } catch (e) {
    console.warn('No se pudieron actualizar los posts:', e.message);
  }
  renderFeed();
}

// --- Fin integración SPA ---
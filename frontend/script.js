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
      { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', timestamp: 'Hace 2h', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg', frontTitle: 'Cyberpunk 2077', frontDesc: 'RPG de mundo abierto en un futuro distópico.', backImg: 'https://m.media-amazon.com/images/M/MV5BMDk4MTNhNGMtZTE2Ni00MTIxLTk2NzUtYjI1ZWM5NmRkODM5XkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_.jpg', backTitle: 'Blade Runner 2049', backDesc: 'Un nuevo blade runner descubre un secreto mucho tiempo enterrado.', liked: false, likes: 124, comments: 45 },
      { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2', timestamp: 'Hace 5h', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg', frontTitle: 'Red Dead Redemption 2', frontDesc: 'Épica historia de forajidos en el corazón de América.', backImg: 'https://m.media-amazon.com/images/M/MV5BMjA5ZjA3ZjMtMzA2ZC00ZGY5LTg3ZTEtMDQ0MjEzNWYxMjFjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', backTitle: 'The Hateful Eight', backDesc: 'Ocho extraños atrapados en una cabaña durante una tormenta.', liked: true, likes: 892, comments: 120 },
      { author: '@Invitado', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3', timestamp: 'Hace 1d', frontImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg', frontTitle: 'Dark Souls III', frontDesc: 'Desafía a la oscuridad en este RPG de acción aclamado.', backImg: 'https://m.media-amazon.com/images/M/MV5BNDQ2ZGRhYjYtYjBmYy00ZjBiLTg3ZDktOTRlYzIwMWNhMjgwXkEyXkFqcGdeQXVyNjE5MjUyOTM@._V1_.jpg', backTitle: 'Berserk (1997)', backDesc: 'La historia de Guts y su búsqueda de venganza en un mundo oscuro.', liked: false, likes: 567, comments: 89 }
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
      <img src="${item.img}" alt="${item.title}" loading="lazy" width="400" height="180" decoding="async" onerror="this.src='https://via.placeholder.com/400x180/111122/00ffff?text=${encodeURIComponent(item.title)}'"/>
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
let messagingScriptLoaded = false;

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
      if (!messagingScriptLoaded) {
        const script = document.createElement('script');
        script.src = 'mensajeria/script.js';
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
      if (!notificationsScriptLoaded) {
        const script = document.createElement('script');
        script.src = 'notificaciones/script.js';
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
      if (!profileScriptLoaded) {
        const script = document.createElement('script');
        script.src = 'perfil/script.js';
        document.body.appendChild(script);
        profileScriptLoaded = true;
      } else if (typeof initializeProfile === 'function') {
        initializeProfile();
      }
    })
    .catch(err => console.error('Error cargando Perfil:', err));
}

let createCssLoaded = false;

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
    link.href = 'auth/styles.css';
    document.head.appendChild(link);
    authCssLoaded = true;
  }

  // Cargar el HTML fragmento de Auth
  fetch('auth/index.html')
    .then(res => res.text())
    .then(html => {
      landingEl.innerHTML = html;

      // Cargar script de Auth
      // Eliminar script anterior si existe para reiniciar eventos
      const oldScript = document.getElementById('auth-script');
      if (oldScript) oldScript.remove();

      const script = document.createElement('script');
      script.src = 'auth/script.js';
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
    link.href = 'auth/styles.css';
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
  fetch('auth/index.html')
    .then(res => res.text())
    .then(html => {
      mainEl.innerHTML = '<div class="mas-section"><h1>Más</h1><p class="subtitle">Inicia sesión o regístrate cuando quieras</p>' + html + '</div>';
      const oldScript = document.getElementById('auth-script');
      if (oldScript) oldScript.remove();
      const script = document.createElement('script');
      script.src = 'auth/script.js';
      script.id = 'auth-script';
      document.body.appendChild(script);
    })
    .catch(err => console.error('Error cargando Más/Auth:', err));
let createCssLoaded = false;
let createScriptLoaded = false;

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
      if (!createScriptLoaded) {
        const script = document.createElement('script');
        script.src = 'crear/script.js';
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
  } catch (e) {
    console.warn('No se pudieron actualizar los posts:', e.message);
  }
  renderFeed();
}

// --- Fin integración SPA ---
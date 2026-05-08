// Módulo Explorar: datos y lógica de renderizado
// Se ejecuta cuando el usuario navega a la sección Explorar

const exploreData = [
  { type: 'juego', title: 'Hollow Knight', img: 'https://steamcdn-a.akamaihd.net/steam/apps/367520/header.jpg', desc: 'Metroidvania sombrío y preciso.' },
  { type: 'pelicula', title: 'Akira', img: 'https://m.media-amazon.com/images/M/MV5BM2M0MzYwZmQtYjE5ZC00YzMyLWJkYWYtZTAxNzQzN2ZjYjA3XkEyXkFqcGdeQXVyMTQxNzMzNTI@._V1_.jpg', desc: 'Clásico anime cyberpunk.' },
  { type: 'juego', title: 'Ori and the Blind Forest', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/387290/header.jpg', desc: 'Plataformas y emoción.' },
  { type: 'pelicula', title: 'Your Name', img: 'https://m.media-amazon.com/images/M/MV5BODdhYWJlMzEtYzg4MC00NWM2LWE1MTktOTAxMGMwMzc4ZmZhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', desc: 'Destino, magia y un amor atemporal.' },
  { type: 'juego', title: 'Celeste', img: 'https://cdn.akamai.steamstatic.com/steam/apps/504230/header.jpg', desc: 'Plataformas desafiantes.' },
  { type: 'pelicula', title: 'Paprika', img: 'https://m.media-amazon.com/images/M/MV5BNjc5NDk3NjUtNWNhMy00MDA1LTljNTgtNDI0YTAyMjY3MzY1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', desc: 'Sueños y realidad entrelazados.' }
];

function initExplore() {
  const grid = document.getElementById('explore-grid');
  if (!grid) return;

  // Renderizar todos los items inicialmente
  renderExploreItems(exploreData);

  // Eventos de búsqueda y filtros
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

function renderExploreItems(items) {
  const grid = document.getElementById('explore-grid');
  if (!grid) return;

  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'explore-card';
    const icon = item.type === 'juego' ? '🎮' : '🎬';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x180/111122/00ffff?text=${encodeURIComponent(item.title)}'" />
      <h3>${icon} ${item.title}</h3>
      <p>${item.desc}</p>
    `;
    grid.appendChild(card);
  });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExplore);
} else {
  initExplore();
}


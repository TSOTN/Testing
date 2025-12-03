// Variables de usuario
const currentUser = {
  name: 'Alex Gaming',
  handle: '@alexgaming',
  bio: '🎮 Videojuegos | 🎬 Cine | 📚 Crítica',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  posts: 42,
  followers: 1200,
  following: 856,
  saved: []
};

// Datos de posts del usuario
const userPosts = [
  {
    id: 1,
    frontTitle: 'Elden Ring',
    frontDesc: 'Un juego épico de FromSoftware',
    frontImg: 'https://images.unsplash.com/photo-1538481143235-5d630894cb4e?w=500&h=300&fit=crop',
    backTitle: 'La mejor experiencia',
    backDesc: 'Recomiendo jugarlo en dificultad hard, vale la pena el desafío.',
    backImg: 'https://images.unsplash.com/photo-1538481143235-5d630894cb4e?w=500&h=300&fit=crop',
    likes: 324,
    comments: 45,
    liked: false,
    saved: false
  },
  {
    id: 2,
    frontTitle: 'Dune: Part Two',
    frontDesc: 'Épica espacial de Villeneuve',
    frontImg: 'https://images.unsplash.com/photo-1489599849228-ed5169a45347?w=500&h=300&fit=crop',
    backTitle: 'Cinematografía magistral',
    backDesc: 'Una continuación que superó mis expectativas. Hans Zimmer en su máxima expresión.',
    backImg: 'https://images.unsplash.com/photo-1489599849228-ed5169a45347?w=500&h=300&fit=crop',
    likes: 287,
    comments: 52,
    liked: true,
    saved: false
  },
  {
    id: 3,
    frontTitle: 'Baldur\'s Gate 3',
    frontDesc: 'El RPG que todos esperaban',
    frontImg: 'https://images.unsplash.com/photo-1535880434868-48b988b1b961?w=500&h=300&fit=crop',
    backTitle: 'Increíblemente inmersivo',
    backDesc: 'Más de 100 horas de juego con decisiones que realmente importan.',
    backImg: 'https://images.unsplash.com/photo-1535880434868-48b988b1b961?w=500&h=300&fit=crop',
    likes: 501,
    comments: 78,
    liked: false,
    saved: true
  },
  {
    id: 4,
    frontTitle: 'Oppenheimer',
    frontDesc: 'Drama histórico de Nolan',
    frontImg: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=300&fit=crop',
    backTitle: 'Perspectiva cautivadora',
    backDesc: 'Nolan vuelve a brillar con una narrativa compleja y actuaciones excepcionales.',
    backImg: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=300&fit=crop',
    likes: 412,
    comments: 67,
    liked: true,
    saved: true
  },
  {
    id: 5,
    frontTitle: 'Starfield',
    frontDesc: 'Aventura espacial de Bethesda',
    frontImg: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&h=300&fit=crop',
    backTitle: 'Libertad de exploración',
    backDesc: 'Un universo vasto que invita a la aventura. El futuro de los RPGs espaciales.',
    backImg: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&h=300&fit=crop',
    likes: 198,
    comments: 34,
    liked: false,
    saved: false
  },
  {
    id: 6,
    frontTitle: 'The Killers Live',
    frontDesc: 'Concierto épico en vivo',
    frontImg: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    backTitle: 'Energía pura',
    backDesc: 'Los mejores conciertos son cuando sientes la música en el corazón.',
    backImg: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    likes: 156,
    comments: 28,
    liked: true,
    saved: false
  }
];

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeProfile);

function initializeProfile() {
  setupTabListeners();
  renderProfileHeader();
  renderProfilePosts('all');
}

// Mostrar/Ocultar tabs
function setupTabListeners() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remover clase active de todos los tabs
      tabButtons.forEach(b => b.classList.remove('active'));
      // Agregar clase active al tab clickeado
      btn.classList.add('active');
      
      // Remover clase active de todo el contenido
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Agregar clase active al contenido correspondiente
      const tabName = btn.getAttribute('data-tab');
      document.getElementById(`tab-${tabName}`).classList.add('active');
      
      // Renderizar contenido apropiado
      if (tabName === 'posts') {
        renderProfilePosts('all');
      } else if (tabName === 'likes') {
        renderProfilePosts('likes');
      } else if (tabName === 'saved') {
        renderProfilePosts('saved');
      }
    });
  });
  
  // Activar primer tab por defecto
  if (tabButtons.length > 0) {
    tabButtons[0].click();
  }
}

function renderProfileHeader() {
  const profileSection = document.querySelector('.profile-section');
  
  // Actualizar información del perfil
  const nameEl = profileSection.querySelector('.profile-name');
  const handleEl = profileSection.querySelector('.profile-handle');
  const bioEl = profileSection.querySelector('.profile-bio');
  const avatarEl = profileSection.querySelector('.profile-avatar');
  
  if (nameEl) nameEl.textContent = currentUser.name;
  if (handleEl) handleEl.textContent = currentUser.handle;
  if (bioEl) bioEl.textContent = currentUser.bio;
  if (avatarEl) avatarEl.src = currentUser.avatar;
  
  // Actualizar stats
  const stats = profileSection.querySelectorAll('.stat-number');
  if (stats[0]) stats[0].textContent = currentUser.posts;
  if (stats[1]) stats[1].textContent = formatNumber(currentUser.followers);
  if (stats[2]) stats[2].textContent = formatNumber(currentUser.following);
}

function renderProfilePosts(filter) {
  const tabContent = document.getElementById(`tab-${filter === 'all' ? 'posts' : filter}`);
  if (!tabContent) return;
  
  let postsToShow = userPosts;
  
  if (filter === 'likes') {
    postsToShow = userPosts.filter(post => post.liked);
  } else if (filter === 'saved') {
    postsToShow = userPosts.filter(post => post.saved);
  }
  
  if (postsToShow.length === 0) {
    tabContent.innerHTML = `
      <div class="empty-state-profile">
        <div class="empty-state-icon-profile">
          ${filter === 'likes' ? '❤️' : filter === 'saved' ? '🔖' : '📝'}
        </div>
        <p class="empty-state-text-profile">
          ${filter === 'likes' ? 'Sin posts con likes' : filter === 'saved' ? 'Sin posts guardados' : 'Sin posts'}
        </p>
      </div>
    `;
    return;
  }
  
  const postsHTML = postsToShow.map((post, index) => `
    <div class="profile-post-card" data-index="${index}">
      <div class="post-card-front">
        <img src="${post.frontImg}" alt="${post.frontTitle}">
        <h3>${post.frontTitle}</h3>
        <p>${post.frontDesc}</p>
        <button class="flip-card-btn" onclick="flipProfileCard(${index})">Ver más</button>
        <div class="post-actions">
          <div class="post-action ${post.liked ? 'liked' : ''}" onclick="toggleProfileLike(${index})">
            <span class="post-action-icon">❤️</span>
            <span>${post.likes}</span>
          </div>
          <div class="post-action">
            <span class="post-action-icon">💬</span>
            <span>${post.comments}</span>
          </div>
        </div>
      </div>
      <div class="post-card-back">
        <img src="${post.backImg}" alt="${post.backTitle}">
        <h3>${post.backTitle}</h3>
        <p>${post.backDesc}</p>
        <button class="flip-card-btn" onclick="flipProfileCard(${index})">Volver</button>
        <div class="post-actions">
          <div class="post-action ${post.liked ? 'liked' : ''}" onclick="toggleProfileLike(${index})">
            <span class="post-action-icon">❤️</span>
            <span>${post.likes}</span>
          </div>
          <div class="post-action">
            <span class="post-action-icon">💬</span>
            <span>${post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  tabContent.innerHTML = `<div class="profile-posts">${postsHTML}</div>`;
}

function flipProfileCard(index) {
  const card = document.querySelector(`.profile-post-card[data-index="${index}"]`);
  if (card) {
    card.classList.toggle('flipped');
  }
}

function toggleProfileLike(index) {
  if (userPosts[index]) {
    userPosts[index].liked = !userPosts[index].liked;
    
    // Actualizar el tab activo actual
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
      const tabName = activeTab.getAttribute('data-tab');
      const filterType = tabName === 'posts' ? 'all' : tabName;
      renderProfilePosts(filterType);
    }
  }
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

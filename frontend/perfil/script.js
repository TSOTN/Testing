// Perfil Script - Real Data Integration

// Helpers reutilizados de script.js (asegurarnos de que existan o redefinirlos)
// Nota: API_BASE_URL debería estar accesible, si no, lo definimos localmente
const PROFILE_API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? (window.API_BASE_URL ? window.API_BASE_URL : 'http://localhost:3000') // Fallback si script.js no exportó
  : 'https://testing-ivmx.onrender.com';

let userPosts = [];
let currentUser = {};

document.addEventListener('DOMContentLoaded', initializeProfile);

async function initializeProfile() {
  // 1. Cargar Usuario del LocalStorage
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    // Si no hay usuario, redirigir al login (aunque el gatekeeper ya debería haberlo hecho)
    window.location.reload();
    return;
  }

  currentUser = JSON.parse(storedUser);

  // Adaptar datos si faltan campos
  if (!currentUser.avatar) currentUser.avatar = currentUser.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default';
  if (!currentUser.bio) currentUser.bio = '¡Hola! Soy nuevo en Pixel & Frames.';

  renderProfileHeader();
  setupTabListeners();
  setupEditProfile(); // Initialize Edit Modal

  // 2. Cargar Posts del Usuario desde Backend
  await fetchUserPosts();
}

function setupEditProfile() {
  const modal = document.getElementById('edit-profile-modal');
  const btn = document.querySelector('.edit-profile-btn');
  const closeBtn = document.querySelector('.close-modal');
  const form = document.getElementById('edit-profile-form');

  const bioInput = document.getElementById('edit-bio');
  const avatarInput = document.getElementById('edit-avatar');
  const avatarPreview = document.getElementById('avatar-preview');

  if (!modal || !btn || !form) return;

  // Open Modal
  btn.onclick = () => {
    modal.style.display = "flex";
    bioInput.value = currentUser.bio || '';
    avatarInput.value = currentUser.avatar || '';
    avatarPreview.src = currentUser.avatar || 'https://via.placeholder.com/80';
  }

  // Close Modal
  closeBtn.onclick = () => {
    modal.style.display = "none";
  }

  // Close on click outside
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Preview Avatar
  avatarInput.oninput = () => {
    avatarPreview.src = avatarInput.value;
  }

  // Handle Submit
  form.onsubmit = async (e) => {
    e.preventDefault();

    const newBio = bioInput.value;
    const newAvatar = avatarInput.value;

    // Optimistic UI Update (optional)
    const saveBtn = form.querySelector('.save-btn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Guardando...';
    saveBtn.disabled = true;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${PROFILE_API_URL}/api/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bio: newBio, avatar_url: newAvatar })
      });

      if (!res.ok) throw new Error('Error al actualizar perfil');

      const updatedUser = await res.json();

      // Update current user object
      currentUser.bio = updatedUser.bio;
      currentUser.avatar = updatedUser.avatar_url;

      // Update LocalStorage 'user' object
      const userToStore = {
        ...currentUser,
        avatar_url: updatedUser.avatar_url,
        bio: updatedUser.bio
      };
      localStorage.setItem('user', JSON.stringify(userToStore));

      // Update UI
      renderProfileHeader();

      // Close Modal
      modal.style.display = "none";
      alert('¡Perfil actualizado con éxito! ✨');

    } catch (error) {
      console.error(error);
      alert('Hubo un error al guardar los cambios.');
    } finally {
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }
  }
}

// ... rest of the file ...

async function fetchUserPosts() {
  try {
    const token = localStorage.getItem('token');
    // Pedimos posts donde el author_id sea mi id
    // Endpoint: /api/posts?author_id=XYZ
    const response = await fetch(`${PROFILE_API_URL}/api/posts?author_id=${currentUser.id}&user_id=${currentUser.id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Error cargando posts del perfil');

    userPosts = await response.json();

    // Actualizar contador de posts en el header
    const stats = document.querySelectorAll('.stat-number');
    if (stats[0]) stats[0].textContent = userPosts.length;

    // Renderizar posts
    renderProfilePosts('all');

  } catch (error) {
    console.error('❌ Error fetching profile posts:', error);
    // Fallback UI si falla
    const container = document.getElementById('tab-posts');
    if (container) container.innerHTML = '<p style="text-align:center; padding: 20px;">No se pudieron cargar los posts. Intenta recargar.</p>';
  }
}

function renderProfileHeader() {
  const profileSection = document.querySelector('.profile-section');
  if (!profileSection) return;

  const nameEl = profileSection.querySelector('.profile-name');
  const handleEl = profileSection.querySelector('.profile-handle');
  const bioEl = profileSection.querySelector('.profile-bio');
  const avatarEl = profileSection.querySelector('.profile-avatar');

  if (nameEl) nameEl.textContent = currentUser.username; // Usar username real
  if (handleEl) handleEl.textContent = '@' + currentUser.username;
  if (bioEl) bioEl.textContent = currentUser.bio;
  if (avatarEl) avatarEl.src = currentUser.avatar;

  // Stats iniciales (se actualizan al cargar posts)
  const stats = profileSection.querySelectorAll('.stat-number');
  if (stats[0]) stats[0].textContent = '-'; // Posts
  if (stats[1]) stats[1].textContent = formatNumber(120); // Seguidores (Mock por ahora)
  if (stats[2]) stats[2].textContent = formatNumber(45); // Siguiendo (Mock por ahora)
}

function renderProfilePosts(filter) {
  const tabContent = document.getElementById(`tab-${filter === 'all' ? 'posts' : filter}`);
  if (!tabContent) return;

  let postsToShow = userPosts;

  if (filter === 'likes') {
    postsToShow = userPosts.filter(post => post.liked);
  } else if (filter === 'saved') {
    postsToShow = userPosts.filter(post => post.saved); // 'saved' aún no existe en DB real, estará vacío
  }

  if (postsToShow.length === 0) {
    tabContent.innerHTML = `
      <div class="empty-state-profile">
        <div class="empty-state-icon-profile">
          ${filter === 'likes' ? '❤️' : filter === 'saved' ? '🔖' : '📝'}
        </div>
        <p class="empty-state-text-profile">
          ${filter === 'likes' ? 'Aún no diste like a nada' : filter === 'saved' ? 'No tienes guardados' : 'Aún no has publicado nada. ¡Crea tu primer post!'}
        </p>
      </div>
    `;
    return;
  }

  const postsHTML = postsToShow.map((post, index) => `
    <div class="profile-post-card" data-index="${index}">
      <div class="post-card-front">
        <img src="${post.frontImg}" alt="${post.frontTitle}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
        <h3>${post.frontTitle}</h3>
        <p>${post.frontDesc}</p>
        <button class="flip-card-btn" onclick="flipProfileCard(${index})">Ver recomendación</button>
        <div class="post-actions">
          <div class="post-action ${post.liked ? 'liked' : ''}">
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
        <img src="${post.backImg}" alt="${post.backTitle}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
        <h3>${post.backTitle}</h3>
        <p>${post.backDesc}</p>
        <button class="flip-card-btn" onclick="flipProfileCard(${index})">Volver</button>
      </div>
    </div>
  `).join('');

  tabContent.innerHTML = `<div class="profile-posts">${postsHTML}</div>`;
}

function setupTabListeners() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });

      const tabName = btn.getAttribute('data-tab');
      const targetTab = document.getElementById(`tab-${tabName}`);
      if (targetTab) targetTab.classList.add('active');

      if (tabName === 'posts') renderProfilePosts('all');
      else if (tabName === 'likes') renderProfilePosts('likes');
      else if (tabName === 'saved') renderProfilePosts('saved');
    });
  });
}

function flipProfileCard(index) {
  const card = document.querySelector(`.profile-post-card[data-index="${index}"]`);
  if (card) {
    card.classList.toggle('flipped');
  }
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

// Exponer funciones globales si es necesario (el HTML puede usarlas en onclick)
window.flipProfileCard = flipProfileCard;

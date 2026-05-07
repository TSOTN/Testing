// Variables del formulario
let gameImageURL = '';
let movieImageURL = '';

function initializeCreate() {
  setupImageUploads();
  setupFormEvents();
}

// Inicializar (soporta carga dinámica via SPA)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCreate);
} else {
  initializeCreate();
}

// Manejo de cargas de imagen
function setupImageUploads() {
  // Juego - por URL
  const gameImageInput = document.getElementById('game-image');
  if (gameImageInput) {
    gameImageInput.addEventListener('input', (e) => {
      gameImageURL = e.target.value;
      updateImagePreview('game-preview', gameImageURL);
    });
  }

  // Juego - por archivo
  const gameFileInput = document.getElementById('game-file');
  if (gameFileInput) {
    gameFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          gameImageURL = event.target.result;
          document.getElementById('game-image').value = '';
          updateImagePreview('game-preview', gameImageURL);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Película - por URL
  const movieImageInput = document.getElementById('movie-image');
  if (movieImageInput) {
    movieImageInput.addEventListener('input', (e) => {
      movieImageURL = e.target.value;
      updateImagePreview('movie-preview', movieImageURL);
    });
  }

  // Película - por archivo
  const movieFileInput = document.getElementById('movie-file');
  if (movieFileInput) {
    movieFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          movieImageURL = event.target.result;
          document.getElementById('movie-image').value = '';
          updateImagePreview('movie-preview', movieImageURL);
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function updateImagePreview(previewId, imageURL) {
  const preview = document.getElementById(previewId);
  if (!preview) return;

  if (imageURL) {
    preview.innerHTML = `<img src="${imageURL}" alt="Preview" onerror="this.parentElement.textContent='❌'" />`;
  } else {
    preview.textContent = '🖼️';
  }
}

// Setup de eventos del formulario
function setupFormEvents() {
  const form = document.getElementById('create-post-form');
  const previewBtn = document.getElementById('preview-btn');
  const closePreviewBtn = document.getElementById('close-preview');
  const previewModal = document.getElementById('preview-modal');

  if (previewBtn) {
    previewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showPreview();
    });
  }

  if (closePreviewBtn) {
    closePreviewBtn.addEventListener('click', hidePreview);
  }

  if (previewModal) {
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) {
        hidePreview();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      publishPost();
    });
  }
}

function showPreview() {
  const gameTitle = document.getElementById('game-title').value;
  const gameDesc = document.getElementById('game-description').value;
  const movieTitle = document.getElementById('movie-title').value;
  const movieDesc = document.getElementById('movie-description').value;

  if (!gameTitle || !gameDesc || !movieTitle || !movieDesc) {
    alert('Por favor completa todos los campos obligatorios');
    return;
  }

  // Rellenar preview
  document.getElementById('preview-game-title').textContent = `🎮 ${gameTitle}`;
  document.getElementById('preview-game-desc').textContent = gameDesc;
  document.getElementById('preview-movie-title').textContent = `🎬 ${movieTitle}`;
  document.getElementById('preview-movie-desc').textContent = movieDesc;

  // Imágenes
  const gamePreviewImg = document.getElementById('preview-game-img');
  const moviePreviewImg = document.getElementById('preview-movie-img');

  if (gameImageURL) {
    gamePreviewImg.src = gameImageURL;
  } else {
    gamePreviewImg.src = 'https://via.placeholder.com/400x250/111122/00ffff?text=Game';
  }

  if (movieImageURL) {
    moviePreviewImg.src = movieImageURL;
  } else {
    moviePreviewImg.src = 'https://via.placeholder.com/400x250/111122/ff00c8?text=Movie';
  }

  // Mostrar modal
  document.getElementById('preview-modal').style.display = 'flex';

  // Resetear flip
  document.querySelector('.preview-post-card').classList.remove('flipped');
}

function hidePreview() {
  document.getElementById('preview-modal').style.display = 'none';
}

function publishPost() {
  const gameTitle = document.getElementById('game-title').value;
  const gameDesc = document.getElementById('game-description').value;
  const movieTitle = document.getElementById('movie-title').value;
  const movieDesc = document.getElementById('movie-description').value;
  const tags = document.getElementById('tags').value;

  // Validación
  if (!gameTitle || !gameDesc || !movieTitle || !movieDesc) {
    alert('Por favor completa todos los campos obligatorios');
    return;
  }

  // Crear objeto del nuevo post
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : { username: 'Anónimo', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anon' };

  // Preparar datos para backend
  const postData = {
    frontTitle: `🎮 ${gameTitle}`,
    frontDesc: gameDesc,
    frontImg: gameImageURL || 'https://via.placeholder.com/400x250/111122/00ffff?text=Game',
    backTitle: `🎬 ${movieTitle}`,
    backDesc: movieDesc,
    backImg: movieImageURL || 'https://via.placeholder.com/400x250/111122/ff00c8?text=Movie'
  };

  // Enviar al Backend
  // - Si el frontend está servido por el mismo backend (Render): usar ruta relativa.
  // - Si el frontend está en Vercel u otro host: usar el backend de Render.
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const isVercel = window.location.hostname.endsWith('vercel.app');
  const API_URL = isLocal
    ? 'http://localhost:3000/api/posts'
    : (isVercel ? 'https://testing-ivmx.onrender.com/api/posts' : '/api/posts');

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Necesitas iniciar sesión para publicar. Ve a "Más" e inicia sesión.');
    if (typeof loadMasSection === 'function') loadMasSection();
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(postData)
  })
    .then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const backendMsg = data?.msg || data?.error || data?.message || '';
        throw new Error(`${res.status} ${res.statusText}${backendMsg ? ` - ${backendMsg}` : ''}`);
      }
      return data;
    })
    .then(newPost => {
      showSuccessMessage();
      document.getElementById('create-post-form').reset();
      gameImageURL = '';
      movieImageURL = '';

      setTimeout(() => {
        // Si existe función para restaurar inicio y refrescar, úsala.
        if (typeof restoreHomeSection === 'function') {
          restoreHomeSection();
        } else {
          const homeBtn = document.querySelector('[title="Inicio"]');
          if (homeBtn) homeBtn.click();
        }
      }, 2000);
    })
    .catch(err => {
      alert('Error publicando: ' + err.message);
      console.error(err);
    });
}

function showSuccessMessage() {
  const message = document.getElementById('success-message');
  if (!message) return;

  message.style.display = 'block';

  setTimeout(() => {
    message.style.display = 'none';
  }, 3000);
}

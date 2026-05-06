// Datos de notificaciones
const allNotifications = [
  {
    id: 1,
    type: 'like',
    user: '@CyberNeon',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNeon',
    action: 'le gustó tu post',
    content: '🎮 Cyberpunk 2077',
    preview: 'Acabo de terminar Cyberpunk 2077... ¡increíble!',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
    timestamp: 'Hace 2 minutos',
    read: false
  },
  {
    id: 2,
    type: 'comment',
    user: '@GamingLegend',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GamingLegend',
    action: 'comentó tu post',
    content: '🎮 Red Dead Redemption 2',
    preview: '¡Excelente análisis del juego! Totalmente de acuerdo contigo.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
    timestamp: 'Hace 15 minutos',
    read: false
  },
  {
    id: 3,
    type: 'follow',
    user: '@CinemaLover',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CinemaLover',
    action: 'empezó a seguirte',
    content: null,
    preview: 'Te siguieron, ahora ves todas sus publicaciones',
    image: null,
    timestamp: 'Hace 1 hora',
    read: true
  },
  {
    id: 4,
    type: 'like',
    user: '@PixelMaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelMaster',
    action: 'le gustó tu post',
    content: '🎮 Hades',
    preview: 'Hades es adictivo. He jugado 200 horas y sigo queriendo más.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg',
    timestamp: 'Hace 2 horas',
    read: true
  },
  {
    id: 5,
    type: 'comment',
    user: '@ActionJunkie',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ActionJunkie',
    action: 'comentó tu post',
    content: '🎮 GTA VI',
    preview: '¡Totalmente! GTA VI será increíble, no puedo esperar.',
    image: 'https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg',
    timestamp: 'Hace 3 horas',
    read: true
  },
  {
    id: 6,
    type: 'like',
    user: '@StreamerPro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=StreamerPro',
    action: 'le gustó tu comentario',
    content: '🎬 Blade Runner 2049',
    preview: 'Mi comentario sobre la cinematografía',
    image: 'https://img.youtube.com/vi/gCcx85zbxz4/maxresdefault.jpg',
    timestamp: 'Ayer',
    read: true
  },
  {
    id: 7,
    type: 'follow',
    user: '@NeonGhost',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonGhost',
    action: 'empezó a seguirte',
    content: null,
    preview: 'Nuevo seguidor de tu perfil',
    image: null,
    timestamp: 'Hace 2 días',
    read: true
  },
  {
    id: 8,
    type: 'comment',
    user: '@VideoGameMania',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VideoGameMania',
    action: 'comentó tu post',
    content: '🎮 Portal',
    preview: 'Portal es un clásico que todos deberían jugar.',
    image: 'https://steamcdn-a.akamaihd.net/steam/apps/400/header.jpg',
    timestamp: 'Hace 3 días',
    read: true
  }
];

let currentFilter = 'all';

// Renderizar notificaciones
function renderNotifications(filter = 'all') {
  const list = document.getElementById('notifications-list');
  if (!list) return;

  let filtered = allNotifications;
  if (filter !== 'all') {
    filtered = allNotifications.filter(n => n.type === filter);
  }

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <p class="empty-state-text">No hay notificaciones de este tipo</p>
      </div>
    `;
    return;
  }

  list.innerHTML = '';
  filtered.forEach(notification => {
    const item = document.createElement('div');
    item.className = 'notification-item ' + notification.type + (notification.read ? '' : ' unread');
    
    const icon = notification.type === 'like' ? '❤️' : notification.type === 'comment' ? '💬' : '👤';
    
    item.innerHTML = `
      <img src="${notification.avatar}" alt="${notification.user}" class="notification-avatar" onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=default'" />
      <div class="notification-content">
        <div class="notification-title">
          <span class="notification-icon">${icon}</span>
          <span class="notification-user">${notification.user}</span>
          <span class="notification-action">${notification.action}</span>
        </div>
        ${notification.content ? `<p class="notification-message">${notification.content}</p>` : ''}
        <div class="notification-preview">${notification.preview}</div>
        <div class="notification-timestamp">${notification.timestamp}</div>
      </div>
      ${notification.image ? `<img src="${notification.image}" alt="Preview" class="notification-image" onerror="this.src='https://via.placeholder.com/50x50/111122/00ffff'" />` : ''}
    `;
    
    item.addEventListener('click', () => {
      item.classList.remove('unread');
      allNotifications[allNotifications.indexOf(notification)].read = true;
    });
    
    list.appendChild(item);
  });
}

// Cambiar filtro
function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderNotifications(currentFilter);
    });
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  setupFilters();
  renderNotifications();
});

// Datos de conversaciones
const conversations = [
  {
    id: 1,
    name: '@CyberNeon',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNeon',
    lastMessage: 'Me encantó tu recomendación de Cyberpunk',
    timestamp: 'Hace 5 min',
    messages: [
      { sent: false, text: 'Hola! ¿Qué tal?', timestamp: '14:30' },
      { sent: true, text: 'Muy bien, ¿y tú?', timestamp: '14:31' },
      { sent: false, text: 'Me encantó tu recomendación de Cyberpunk', timestamp: '14:32' },
      { sent: true, text: 'Verdad? Es increíble el juego', timestamp: '14:33' },
    ]
  },
  {
    id: 2,
    name: '@GamingLegend',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GamingLegend',
    lastMessage: 'Te recomiendo Red Dead 2',
    timestamp: 'Hace 1h',
    messages: [
      { sent: false, text: 'Te recomiendo Red Dead 2', timestamp: '13:15' },
      { sent: true, text: 'Ya lo estoy jugando!', timestamp: '13:16' },
      { sent: false, text: 'Qué bueno, es lo mejor', timestamp: '13:17' },
    ]
  },
  {
    id: 3,
    name: '@CinemaLover',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CinemaLover',
    lastMessage: 'Blade Runner 2049 es una obra maestra',
    timestamp: 'Hace 3h',
    messages: [
      { sent: false, text: 'Blade Runner 2049 es una obra maestra', timestamp: '11:45' },
      { sent: true, text: 'Totalmente de acuerdo', timestamp: '11:46' },
    ]
  },
  {
    id: 4,
    name: '@PixelMaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelMaster',
    lastMessage: 'Hades es adictivo',
    timestamp: 'Ayer',
    messages: [
      { sent: false, text: 'Hades es adictivo', timestamp: '22:30' },
    ]
  },
  {
    id: 5,
    name: '@ActionJunkie',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ActionJunkie',
    lastMessage: 'GTA VI será increíble',
    timestamp: 'Ayer',
    messages: [
      { sent: false, text: 'GTA VI será increíble', timestamp: '20:15' },
    ]
  }
];

let currentChat = null;

// Renderizar lista de conversaciones
function renderConversations(filter = '') {
  const list = document.getElementById('conversations-list');
  if (!list) return;

  list.innerHTML = '';
  const filtered = conversations.filter(c => 
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(conversation => {
    const item = document.createElement('div');
    item.className = 'conversation-item' + (currentChat && currentChat.id === conversation.id ? ' active' : '');
    item.onclick = () => openChat(conversation);
    item.innerHTML = `
      <img src="${conversation.avatar}" alt="${conversation.name}" class="conversation-avatar" onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=default'" />
      <div class="conversation-info">
        <p class="conversation-name">${conversation.name}</p>
        <p class="conversation-preview">${conversation.lastMessage}</p>
      </div>
    `;
    list.appendChild(item);
  });
}

// Abrir chat
function openChat(conversation) {
  currentChat = conversation;
  renderConversations();
  
  // Actualizar header
  const header = document.getElementById('chat-header');
  header.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <img src="${conversation.avatar}" alt="${conversation.name}" class="conversation-avatar" style="width: 40px; height: 40px;" onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=default'" />
      <h3 style="margin: 0; color: var(--accent1);">${conversation.name}</h3>
    </div>
  `;

  // Mostrar mensajes
  renderMessages();

  // Mostrar área de input
  document.getElementById('message-input-area').style.display = 'flex';
}

// Renderizar mensajes
function renderMessages() {
  const container = document.getElementById('messages-container');
  container.innerHTML = '';

  currentChat.messages.forEach(msg => {
    const msgEl = document.createElement('div');
    msgEl.className = 'message ' + (msg.sent ? 'sent' : 'received');
    msgEl.innerHTML = `
      <div>
        <div class="message-bubble">${msg.text}</div>
        <div class="message-timestamp">${msg.timestamp}</div>
      </div>
    `;
    container.appendChild(msgEl);
  });

  // Scroll al final
  container.scrollTop = container.scrollHeight;
}

// Enviar mensaje
function sendMessage() {
  const input = document.getElementById('message-input');
  const text = input.value.trim();
  
  if (!text || !currentChat) return;

  const now = new Date();
  const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

  currentChat.messages.push({
    sent: true,
    text: text,
    timestamp: time
  });

  input.value = '';
  renderMessages();

  // Simular respuesta después de 1 segundo
  setTimeout(() => {
    currentChat.messages.push({
      sent: false,
      text: '¡Qué interesante! Me alegra tu comentario 😊',
      timestamp: time
    });
    renderMessages();
  }, 1000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-conversations');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderConversations(e.target.value);
    });
  }

  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  const messageInput = document.getElementById('message-input');
  if (messageInput) {
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  // Renderizar conversaciones iniciales
  renderConversations();
});

-- Tipos personalizados (opcional, pero recomendado para status)
-- CREATE TYPE user_role AS ENUM ('user', 'admin');

-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Guardaremos contraseñas hasheadas (bcrypt)
    avatar_url TEXT DEFAULT 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default',
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Posts (Recomendaciones)
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    
    -- Lado A: Videojuego
    front_title VARCHAR(100) NOT NULL,
    front_desc TEXT,
    front_img TEXT, -- URL de la imagen
    
    -- Lado B: Película / Serie
    back_title VARCHAR(100) NOT NULL,
    back_desc TEXT,
    back_img TEXT, -- URL de la imagen
    
    -- Metadatos
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Likes (para evitar likes duplicados por usuario)
CREATE TABLE IF NOT EXISTS post_likes (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id) -- Un usuario solo puede dar like una vez a un post
);

-- Índices para mejorar rendimiento de búsquedas
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

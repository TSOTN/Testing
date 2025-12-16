const { Pool } = require('pg');

// Detectar si es Supabase (pooler o conexión directa)
const isSupabase = process.env.DB_HOST && (
  process.env.DB_HOST.includes('supabase.co') || 
  process.env.DB_HOST.includes('pooler.supabase.com')
);

// Configuración de conexión
const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
};

// SSL es requerido para Supabase
if (isSupabase) {
  poolConfig.ssl = { rejectUnauthorized: false };
  console.log('✅ SSL configurado para Supabase');
}

const pool = new Pool(poolConfig);

// Log de configuración (sin mostrar contraseña)
console.log('📊 Configuración de DB:');
console.log('Host:', poolConfig.host);
console.log('Port:', poolConfig.port);
console.log('User:', poolConfig.user);
console.log('Database:', poolConfig.database);
console.log('SSL:', poolConfig.ssl ? 'Habilitado' : 'Deshabilitado');

module.exports = pool;

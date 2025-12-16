const { Pool } = require('pg');

// Supabase requiere SSL y puede usar Connection Pooling para IPv4
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // SSL es requerido para Supabase (tanto conexión directa como pooling)
  ssl: process.env.DB_HOST && (process.env.DB_HOST.includes('supabase.co') || process.env.DB_HOST.includes('pooler.supabase.com'))
    ? { rejectUnauthorized: false } 
    : false
});

module.exports = pool;

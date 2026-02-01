const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret Key para firmar tokens (En producción esto debería estar en .env)
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro_temporal';

// REGISTER: Crear nuevo usuario
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Validar si el usuario ya existe
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario o email ya existen' });
    }

    // 2. Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Insertar en DB
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, avatar_url',
      [username, email, passwordHash]
    );

    // 4. Generar Token JWT
    const token = jwt.sign({ id: newUser.rows[0].id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: newUser.rows[0] });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// LOGIN: Iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar usuario
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // 2. Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // 3. Generar token
    const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '7d' });

    // No devolver el hash de la contraseña
    const userData = {
      id: user.rows[0].id,
      username: user.rows[0].username,
      email: user.rows[0].email,
      avatar_url: user.rows[0].avatar_url
    };

    res.json({ token, user: userData });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;

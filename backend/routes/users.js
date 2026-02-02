const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// GET /api/users/me - Obtener perfil del usuario actual (opcional, por si queremos refrescar todo)
router.get('/me', auth, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, email, avatar_url, bio, created_at FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// PUT /api/users/me - Actualizar perfil
router.put('/me', auth, async (req, res) => {
    const { bio, avatar_url } = req.body;

    try {
        const result = await pool.query(
            'UPDATE users SET bio = $1, avatar_url = $2 WHERE id = $3 RETURNING id, username, email, avatar_url, bio',
            [bio, avatar_url, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error actualizando perfil' });
    }
});

module.exports = router;

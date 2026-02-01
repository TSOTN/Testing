const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Obtener todos los posts (Feed)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT 
        p.*, 
        u.username as author, 
        u.avatar_url as avatar,
        EXISTS(SELECT 1 FROM post_likes pl WHERE pl.post_id = p.id AND pl.user_id = $1) as liked
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `, [req.query.user_id || 0]); // user_id opcional para saber si dio like

        // Mapear al formato que espera el frontend
        const posts = result.rows.map(row => ({
            id: row.id,
            author: '@' + row.author,
            avatar: row.avatar,
            timestamp: new Date(row.created_at).toLocaleDateString(), // Simplificado
            frontTitle: row.front_title,
            frontDesc: row.front_desc,
            frontImg: row.front_img,
            backTitle: row.back_title,
            backDesc: row.back_desc,
            backImg: row.back_img,
            likes: row.likes_count,
            comments: row.comments_count,
            liked: row.liked
        }));

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error obteniendo posts' });
    }
});

// Crear nuevo post (Protegido con middleware 'auth')
router.post('/', auth, async (req, res) => {
    // El middleware 'auth' ya verificó el token y puso el usuario en req.user
    const userId = req.user.id;

    // Obtenemos los datos del post del body (ya no esperamos userId aquí)
    const { frontTitle, frontDesc, frontImg, backTitle, backDesc, backImg } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO posts (user_id, front_title, front_desc, front_img, back_title, back_desc, back_img)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
            [userId, frontTitle, frontDesc, frontImg, backTitle, backDesc, backImg]
        );

        // Devolver el post completo con datos del autor (extra query para simplicidad)
        const authorData = await pool.query('SELECT username, avatar_url FROM users WHERE id = $1', [userId]);

        const newPost = {
            ...result.rows[0],
            author: '@' + authorData.rows[0].username,
            avatar: authorData.rows[0].avatar_url,
            timestamp: 'Ahora'
        };

        res.json(newPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error creando post' });
    }
});

module.exports = router;

const jwt = require('jsonwebtoken');

// Secret Key (Debe coincidir con la de auth.js)
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro_temporal';

module.exports = function (req, res, next) {
    // Obtener token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso denegado' });
    }

    // Verificar token
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { id: 1 }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token no es válido' });
    }
};

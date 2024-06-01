const jwt = require('jsonwebtoken');
const secret = 'your-secret-key'; // Remplacez par votre propre clé secrète

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required.');

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token.');
        req.userId = decoded.id;
        next();
    });
}

function isAdmin(req, res, next) {
    // Ajoutez votre logique pour vérifier si l'utilisateur est un administrateur
    next();
}

function isSuperAdmin(req, res, next) {
    // Ajoutez votre logique pour vérifier si l'utilisateur est un super administrateur
    next();
}

module.exports = {
    verifyToken,
    isAdmin,
    isSuperAdmin
};

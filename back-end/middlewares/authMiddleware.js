const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    if (!user) throw new Error('Aucun utilisateur fourni pour générer un token.');
    // La clé secrète devrait être dans vos variables d'environnement pour des raisons de sécurité
    const secretKey = process.env.JWT_SECRET;
    // Vous pouvez ajuster les options du token selon vos besoins (par exemple, durée d'expiration)
    const options = { expiresIn: '1h' };
    // Création du token
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, options);

    return token;
};

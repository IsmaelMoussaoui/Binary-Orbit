const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/authMiddleware');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = await User.createUser(username, email, hashedPassword);

        // Générer un token (JWT ou cookie)
        const token = generateToken(newUser);

        // Renvoyer la réponse
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erreur lors de l'inscription de l'utilisateur." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Trouver l'utilisateur par email
        const user = await User.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Générer un token
        const token = generateToken(user);

        // Renvoyer la réponse
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion de l'utilisateur." });
    }
};

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const machineRoutes = require('./routes/machinesRoutes');
const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Routes pour la gestion des utilisateurs
app.use('/api', userRoutes);
app.use('/api/machines', machineRoutes);

// Choisissez un port pour que votre serveur écoute
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

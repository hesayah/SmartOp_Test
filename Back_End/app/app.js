const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const surgeonsRoutes = require('./routes/surgeonsRoutes');

const app = express();

const DbUrl = 'mongodb+srv://hesayah:test@cluster0.eqf50hj.mongodb.net/SmartOpDb' 
const port = 3000;

mongoose.connect(DbUrl);

app.use(cors());

app.use(bodyParser.json());

app.use('/surgeons', surgeonsRoutes);

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});

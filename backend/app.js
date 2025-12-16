const express = require('express');
const db = require('./db');
const app = express();

const authController = require('./controllers/authController');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor online!');
});

app.post('/registrar', authController.criarUsuario);

app.post('/login', authController.loginUsuario);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


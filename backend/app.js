const express = require('express');
const db = require('./db');
const app = express();

const authController = require('./controllers/authController');
const usuarioController = require('./controllers/usuarioController');
const { autenticarToken } = require('./middlewares/auth');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor online!');
});

//endpoints de autenticação
app.post('/registrar', authController.criarUsuario);
app.post('/login', authController.loginUsuario);

app.get('/usuarios', autenticarToken(['admin']), usuarioController.todosUsuarios);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


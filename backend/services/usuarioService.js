const db = require('../db');

function mostrarUsuarios(req, res) {
    const sql = 'SELECT id, nome_usuario FROM usuarios';
    db.all(sql, [], (erro, usuario) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        res.json({ usuarios: usuario });
    });
}

module.exports = { mostrarUsuarios };
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'hermes.sqlite');

const db = new sqlite3.Database(dbPath, (erro) => {
    if(erro) {
        console.error('Erro ao conectar com o banco de dados: ', erro.message);
    } else {
        console.log('Conectado com o banco de dados');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_usuario TEXT UNIQUE,
        saldo REAL DEFAULT 1000.00,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS apostas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        valor REAL,
        odds REAL,
        texto_saida TEXT, -- 'WIN' ou 'LOSE'
        pagamento REAL,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )`);
});

module.exports = db;
const db = require('../db');

// Transforma a busca do SQLite em uma Promise (para usar await no controller)
const buscarSaldoPorId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT saldo FROM usuarios WHERE id = ?';
        
        db.get(sql, [id], (erro, row) => {
            if (erro) {
                return reject(erro);
            }
            if (!row) {
                return reject(new Error('Usuário não encontrado.'));
            }
            // Resolvemos apenas o VALOR do saldo
            resolve(row.saldo);
        });
    });
};

const listarTodos = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, nome_usuario FROM usuarios';
        db.all(sql, [], (erro, rows) => {
            if (erro) return reject(erro);
            resolve(rows);
        });
    });
};

// Precisamos exportar também o registrarUsuario que fizemos antes?
// Se sim, mantenha ele aqui. Se não, adicione o código antigo aqui.
module.exports = { buscarSaldoPorId, listarTodos };
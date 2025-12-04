const db = require('../db');

const registrarUsuario = async (nome_usuario) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO usuarios (nome_usuario) VALUES (?)`;

        db.run(sql, [nome_usuario], function(erro) {
            if (erro) {
                if (erro.message.includes('UNIQUE')) {
                    return reject(new Error('Este nome de usuário já está em uso.'));
                }
                return reject(erro);
            }

            resolve({
                id: this.lastID, 
                nome_usuario: nome_usuario,
                saldo: 100.00 
            });
        });
    });    
};  

module.exports = { registrarUsuario };
const db = require('../db');
const bcrypt = require('bcryptjs');

const registrarUsuario = async (nome_usuario, senha, role = 'user') => {

    const hashSenha = await bcrypt.hash(senha, 8);

    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO usuarios (nome_usuario, senha, role) VALUES (?, ?, ?)`;

        db.run(sql, [nome_usuario, hashSenha, role], function(erro) {
            if (erro) {
                if (erro.message.includes('UNIQUE')) {
                    return reject(new Error('Este nome de usuário já está em uso.'));
                }
                return reject(erro);
            }

            resolve({
                id: this.lastID, 
                nome_usuario,
                role,
                saldo: 100.00 
            });
        });
    });    
};  

const loginUsuario = async (nome_usuario, senha) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM usuarios WHERE nome_usuario = ?`;
        db.get(sql, [nome_usuario], async (erro, usuario) => {
            if (erro) {
                return reject(erro);
            }  

            if(!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
                return reject(new Error('Nome de usuário ou senha inválidos.'));
            }

            resolve(usuario);
        });
    });
}


module.exports = { registrarUsuario, loginUsuario };
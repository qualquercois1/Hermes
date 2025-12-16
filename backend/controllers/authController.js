const usuarioService = require('../services/authService');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sua_chave_secreta_aqui';

const criarUsuario  = async (req,res) => {
    const { nome_usuario, senha, role } = req.body;

    if(!nome_usuario) {
        return res.status(400).json({ erro: 'Nome de usuario não pode ficar em branco.'});
    }

    try {
        const novo_usuario = await usuarioService.registrarUsuario(nome_usuario, senha, role);
        
        return res.status(201).json({
            mensagem: 'Usuario criado com sucesso!',
            usuario: novo_usuario
        });
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

const loginUsuario = async (req, res) => {
    const { nome_usuario, senha } = req.body;
    if(!nome_usuario || !senha) {
        return res.status(400).json({ erro: 'Nome de usuario e senha são obrigatórios.'});
    }
    try {
        const usuario = await usuarioService.loginUsuario(nome_usuario, senha);
        const token = jwt.sign({ 
            id: usuario.id, 
            nome_usuario: usuario.nome_usuario, 
            role: usuario.role }, 
            SECRET_KEY,
            { expiresIn: '1d' }
        )
        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            auth: true,
            token: token,
            role: usuario.role
        });
    } catch (erro) {
        return res.status(401).json({ erro: erro.message });
    }
}


module.exports = { criarUsuario, loginUsuario };
const usuarioService = require('../services/authService');

const criarUsuario  = async (req,res) => {
    const { nome_usuario } = req.body;

    if(!nome_usuario) {
        return res.status(400).json({ erro: 'Nome de usuario não pode ficar em branco.'});
    }

    try {
        const novo_usuario = await usuarioService.registrarUsuario(nome_usuario);
        
        return res.status(201).json({
            mensagem: 'Usuario criado com sucesso!',
            usuario: novo_usuario
        });
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

module.exports = { criarUsuario };
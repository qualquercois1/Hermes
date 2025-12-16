const usuarioService = require('../services/usuarioService');

const todosUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.listarTodos();
        res.json({ usuarios });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const saldoUsuario = async (req, res) => {
    // Pega o ID que veio na URL (/usuarios/:id/saldo)
    const { id } = req.params; 

    try {
        const saldo = await usuarioService.buscarSaldoPorId(id);
        
        // Responde exatamente o JSON que o MenuLateral espera
        res.json({ saldo: saldo });
        
    } catch (erro) {
        // Se o usuário não existir ou der erro no banco
        res.status(404).json({ erro: erro.message });
    }
};

// Não esqueça de incluir o 'criarUsuario' aqui se ele já existia antes!
module.exports = { todosUsuarios, saldoUsuario };
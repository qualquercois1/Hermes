const usuarioService = require('../services/usuarioService');

function todosUsuarios(req, res) {
    return usuarioService.mostrarUsuarios(req, res);
}

module.exports = { todosUsuarios };
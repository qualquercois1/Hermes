const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sua_chave_secreta_aqui';

const autenticarToken = (rolesPermitidas = ['user', 'admin']) => {
    return (req, res, next) => {
        const tokenHeader = req.headers['authorization'];
        
        const token = tokenHeader && tokenHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ erro: 'Token não fornecido.' });
        }

        jwt.verify(token, SECRET_KEY, (erro, decoded) => {
            if (erro) {
                return res.status(403).json({ erro: 'Token inválido.' });
            }
            if (rolesPermitidas.length && !rolesPermitidas.includes(decoded.role)) {
                return res.status(403).json({ erro: 'Acesso negado.' });
            }

            req.userId = decoded.id;
            req.userRole = decoded.role;
            next();
        }
        );
    };
};
    
module.exports = { autenticarToken };
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MenuLateral.css';

// Importando a imagem
import omegaicon from '../assets/omega.png';

const MenuLateral = () => {
    // --- ESTADOS E LÓGICA (Mantidos) ---
    const [usuario, setUsuario] = useState(null);
    const [saldo, setSaldo] = useState(0);
    const navigate = useNavigate();

    const buscarSaldo = async (id, token) => {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${id}/saldo`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                setSaldo(data.saldo);
            }
        } catch (error) {
            console.error("Erro ao buscar saldo:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('userId');
        const nome = localStorage.getItem('username');

        if (token && id && nome) {
            setUsuario({ id, nome });
            buscarSaldo(id, token);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/Login');
        window.location.reload();
    };

    // --- RENDERIZAÇÃO (Visual Novo) ---
    return (
        <div className="menu-lateral">
            
            {/* NOVO CABEÇALHO COM IMAGEM */}
            <div className='logo-container'>
                <img src={omegaicon} alt="Logo Omega" className="logo-icon" />
                <h2 className="menu-logo-text">Hermes</h2>    
            </div>
            
            <ul className="menu-links">
                <Link to="/" className="link">🏛️ Página Inicial</Link>
                
                {/* Lógica: Se NÃO estiver logado */}
                {!usuario && (
                    <>
                        <Link to="/Login" className="link">🔐 Login</Link>
                        <Link to="/Register" className="link">📝 Registrar</Link>
                    </>
                )}

                {/* Lógica: Se ESTIVER logado */}
                {usuario && (
                    <Link to="/apostar" className="link">🎲 Apostar</Link>
                )}
            </ul>

            {/* FOOTER DINÂMICO: Só aparece se estiver logado */}
            {usuario && (
                <div className="menu-footer">
                    <p className="user-name">{usuario.nome}</p>
                    <p className="user-balance">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo)}
                    </p>
                    
                    <button className="btn-logout" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            )}
        </div>
    );
};

export default MenuLateral;
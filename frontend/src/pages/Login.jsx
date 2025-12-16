import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Vamos criar o estilo abaixo

const Login = () => {
  const [formData, setFormData] = useState({
    nome_usuario: '',
    senha: ''
  });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Hook para redirecionar o usuário

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Não recarrega a página
    setLoading(true);
    setErro('');

    try {
      // Fazendo a chamada para o seu Backend Node
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Salvar o Token no navegador (LocalStorage)
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('username', data.nome_usuario);
        
        // 2. Redirecionar para a Home
        navigate('/');
        window.location.reload();
      } else {
        // Se a senha estiver errada ou usuário não existir
        setErro(data.erro || 'Falha ao entrar no sistema.');
      }

    } catch (error) {
      setErro('Erro de conexão com o servidor (O Oráculo está offline).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Entrar no Hermes</h2>
        <p className="login-subtitle">Acesse sua banca e desafie a sorte.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuário</label>
            <input 
              type="text" 
              name="nome_usuario"
              value={formData.nome_usuario}
              onChange={handleChange}
              placeholder="Ex: Zeus"
              required 
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              name="senha" 
              value={formData.senha}
              onChange={handleChange}
              placeholder="Sua senha secreta"
              required 
            />
          </div>

          {erro && <div className="error-message">⚠️ {erro}</div>}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Consultando os Deuses...' : 'Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <p>Ainda não é um iniciado?</p>
          <Link to="/Register" className="link-register">Criar Conta</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Vamos criar esse CSS abaixo

const Home = () => {
  // Dados fictícios para simular o ambiente de aposta
  const jogosDestaque = [
    { timeA: "Olimpo FC", timeB: "Titãs United", oddA: 1.50, oddB: 2.30, empate: 3.10 },
    { timeA: "Sparta City", timeB: "Athens Real", oddA: 2.10, oddB: 1.80, empate: 2.90 },
    { timeA: "Poseidon Surf", timeB: "Hades Inferno", oddA: 1.20, oddB: 5.00, empate: 4.50 },
  ];

  return (
    <div className="home-container">
      {/* --- Seção Hero (Boas Vindas) --- */}
      <header className="hero-section">
        <h1 className="hero-title">Bem-vindo ao Hermes</h1>
        <p className="hero-subtitle">
          A sorte é lançada, mas a matemática é quem manda.
          <br /> Entenda como a "Casa" sempre vence no longo prazo.
        </p>
        
        <div className="hero-buttons">
          <Link to="/Login">
            <button className="btn-primary">Entrar no Olimpo</button>
          </Link>
          <Link to="/Register">
            <button className="btn-secondary">Criar Conta</button>
          </Link>
        </div>
      </header>

      {/* --- Seção de "Odds" (O Visual da Banca) --- */}
      <section className="live-odds-section">
        <h2 className="section-title">🔥 Jogos em Destaque</h2>
        <div className="cards-grid">
          {jogosDestaque.map((jogo, index) => (
            <div key={index} className="bet-card">
              <div className="match-names">
                <span>{jogo.timeA}</span>
                <span className="vs">vs</span>
                <span>{jogo.timeB}</span>
              </div>
              <div className="odds-buttons">
                <button className="odd-btn">{jogo.oddA.toFixed(2)}</button>
                <button className="odd-btn draw">X {jogo.empate.toFixed(2)}</button>
                <button className="odd-btn">{jogo.oddB.toFixed(2)}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
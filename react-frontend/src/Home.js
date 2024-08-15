import React from 'react';
import blockchainImage from './hyperledger.png';
import './Home.css'; // Certifique-se de incluir o CSS atualizado

const Home = () => {
  return (
    <div className="home-container">
      <main className="home-main">
        <section className="hero-section">
          <img src={blockchainImage} alt="Blockchain" className="hero-image" />
          <p className="hero-text">
            Uma plataforma segura para autenticação de documentos com controle de acesso usando o framework Hyperledger Fabric, uma tecnologia blockchain.
          </p>
        </section>

        <section className="features-section">
          <h2>Recursos Blockchain</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Criação de Documentos</h3>
              <p>Gerencie e autentique seus documentos de forma segura.</p>
            </div>
            <div className="feature-card">
              <h3>Autenticação de Campos</h3>
              <p>Verifique a autenticidade dos campos de dados.</p>
            </div>
            <div className="feature-card">
              <h3>Histórico de Mudanças</h3>
              <p>Acompanhe todas as alterações realizadas em seus documentos.</p>
            </div>
            <div className="feature-card">
              <h3>Listagem de Versões</h3>
              <p>Veja todas as versões autenticadas dos seus documentos.</p>
            </div>
          </div>
        </section>


        <section className="tech-section">
        <h2>Tecnologias Utilizadas</h2>
        <p>
          Nosso sistema é organizado da seguinte forma: 
          <ul><strong>Frontend:</strong> Desenvolvido em React, proporcionando uma interface de usuário dinâmica e responsiva.</ul>
          <ul><strong>Gateway:</strong> Implementado em TypeScript, garantindo comunicação segura e eficiente entre os componentes. </ul>
          <ul><strong>Backend:</strong> Baseado no Hyperledger Fabric, fornecendo a estrutura blockchain para autenticação e gerenciamento de documentos.</ul>
        </p>
        </section>

      </main>

      <footer className="home-footer">
        <p>&copy; 2024 Autenticador Blockchain. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;

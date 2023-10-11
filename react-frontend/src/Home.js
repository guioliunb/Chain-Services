import React from 'react';
import { Link } from 'react-router-dom';
import blockchainImage from './hyperledger.png'; // Importe uma imagem relacionada à blockchain

const Home = () => {
  return (
    <div>
      <h1>Bem-vindo ao Autenticador Blockchain</h1>
      <p>Uma plataforma segura para autenticação de documento com controle de acesso usando o framework Hyperledger Fabric uma tecnologia blockchain.</p>
      
      <img src={blockchainImage} alt="Blockchain" width="200" />
      
      <div>
        <h2>Recursos Blockchain</h2>
        <ul>
          <li>Criação de documentos</li>
          <li>Autenticação de campos</li>
          <li>Histórico de mudanças dos documentos</li>
          <li>Listagem de versões autenticadas</li>
        </ul>
      </div>
      
      <div>
        <h2>Tecnologias Utilizadas</h2>
        <p>Nossa plataforma é baseada em tecnologias blockchain líderes, incluindo Ethereum e Hyperledger Fabric.</p>
      </div>
    </div>
  );
}

export default Home;
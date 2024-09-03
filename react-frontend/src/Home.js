import React, { useEffect, useState } from 'react';
import blockchainImage from './p2p-blue.jpg';
import './Home.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2qsHbyS6ocXja1nnymwSGHcqi5sXWDus",
  authDomain: "hyperledger-authentication.firebaseapp.com",
  databaseURL: "https://hyperledger-authentication-default-rtdb.firebaseio.com",
  projectId: "hyperledger-authentication",
  storageBucket: "hyperledger-authentication.appspot.com",
  messagingSenderId: "892365053620",
  appId: "1:892365053620:web:00f774eed60cf96e1c01e1",
  measurementId: "G-L7ZENW7M09"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para formatar o timestamp
const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('pt-BR'); // Formatar a data no estilo DD/MM/YYYY
  }
  return 'Data não disponível';
};

const Home = () => {
  const [documents, setDocuments] = useState([]);

  // Função para buscar documentos do Firebase
  const fetchDocuments = async () => {
    try {
      const q = query(collection(db, 'document'), orderBy('timestamp', 'desc'), limit(5));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().Title || 'Sem título',
        description: doc.data().Soutien || 'Sem descrição',
        multimedia: doc.data().Multimedia || 'Sem mídia disponível',
        timestamp: formatTimestamp(doc.data().timestamp), // Formatar a data
        authors: doc.data().Authors || 'Autores não disponíveis' // Adicionar autores
      }));
      console.log(docs);
      setDocuments(docs);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="home-container">
      <main className="home-main">
        <section className="hero-section">
          <img src={blockchainImage} alt="Blockchain" className="hero-image" />
          <p className="hero-text">
            Uma plataforma segura para autenticação de documentos com controle de acesso usando o framework Hyperledger Fabric, uma tecnologia blockchain.
          </p>
        </section>

        <section className="latest-documents-section">
          <h2 className="latest-documents-title">Últimos Documentos</h2>
          <div className="latest-documents-grid">
            {documents.length > 0 ? (
              documents.map((doc) => (
                <div key={doc.id} className="latest-document-card">
                  {doc.multimedia !== 'Sem mídia disponível' ? (
                    <img src={doc.multimedia} alt="Documento" className="latest-document-image" />
                  ) : (
                    <p>{doc.multimedia}</p>
                  )}
                  <h3 className="latest-document-title">{doc.title}</h3>
                  <p className="latest-document-date">{doc.timestamp}</p> {/* Exibindo o timestamp formatado */}
                  <p className="latest-document-authors">{doc.authors}</p> {/* Exibindo autores */}
                  <p>{doc.description}</p>
                </div>
              ))
            ) : (
              <p>Não há documentos para exibir.</p>
            )}
          </div>
        </section>

        <section className="tech-section">
          <h2>Tecnologias Utilizadas</h2>
          <p><strong>Nosso sistema é organizado da seguinte forma:</strong>
            <ul><strong>Frontend:</strong> Desenvolvido em React, proporcionando uma interface de usuário dinâmica e responsiva.</ul>
            <ul><strong>Gateway:</strong> Implementado em TypeScript, garantindo comunicação segura e eficiente entre os componentes.</ul>
            <ul><strong>Backend:</strong> Baseado no Hyperledger Fabric, fornecendo a estrutura blockchain para autenticação e gerenciamento de documentos.</ul>
          </p>
        </section>
      </main>

      <footer className="home-footer">
        © 2024 Autenticador Blockchain
      </footer>
    </div>
  );
}

export default Home;

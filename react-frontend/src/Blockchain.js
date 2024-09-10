import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blockchain.css';
import defaultImage from './default-image.jpg'; // Imagem padrão

const Blockchain = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null); // Mantém o documento selecionado

  const [formData, setFormData] = useState({
    Title: '',
    Soutien: '',
    Authors: '',
    Editors: '',
    Multimedia: '',
    Keywords: ''
  });

  // Função para buscar os últimos documentos
  const getDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:9090/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  // Função para selecionar um documento para edição
  const handleSelectDocument = (document) => {
    setSelectedDocument(document); // Seleciona o documento inteiro
    setFormData({
      Title: document.Title,
      Soutien: document.Soutien,
      Authors: document.Authors,
      Editors: document.Editors,
      Multimedia: document.Multimedia,
      Keywords: document.Keywords
    });
  };

  // Função para lidar com as mudanças no formulário
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para salvar as atualizações no documento
  const handleSaveChanges = async () => {
    if (!selectedDocument) return;

    try {
      const response = await axios.put(
        `http://localhost:9090/documents/${selectedDocument.ID}`, // Usando o ID correto
        formData
      );
      console.log(response.data);
      getDocuments(); // Atualiza a lista de documentos após a edição
      setSelectedDocument(null); // Fecha o formulário de edição
    } catch (error) {
      console.error('Erro ao atualizar documento:', error);
    }
  };

  // Função para cancelar a edição
  const handleCancel = () => {
    setSelectedDocument(null); // Fecha o formulário sem salvar
  };

  useEffect(() => {
    getDocuments();
  }, []);

  // Função para verificar se o link da imagem é válido
  const isValidUrl = (url) => {
    return url && (url.startsWith('http://') || url.startsWith('https://'));
  };

  return (
    <section className="latest-documents-section">
      <h2 className="latest-documents-title">Últimos Documentos</h2>
      <div className="latest-documents-grid">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div
              key={doc.ID} // Usando o campo ID corretamente
              className="latest-document-card"
              onClick={() => handleSelectDocument(doc)} // Faz com que o item seja clicável e abra o formulário
            >
              <img
                src={isValidUrl(doc.Multimedia) ? doc.Multimedia : defaultImage}
                alt="Documento"
                className="latest-document-image"
              />
              <h3 className="latest-document-title">{doc.Title}</h3>
              <p className="latest-document-authors"><strong>Autores:</strong> {doc.Authors}</p>
              <p className="latest-document-editors"><strong>Editores:</strong> {doc.Editors}</p>
              <p className="latest-document-id"><strong>ID:</strong> {doc.ID}</p> {/* Corrigido para doc.ID */}
              <p className="latest-document-keywords"><strong>Palavras-chave:</strong> {doc.Keywords}</p>
              <p className="latest-document-soutien"><strong>Apoio:</strong> {doc.Soutien}</p>
            </div>
          ))
        ) : (
          <p>Não há documentos para exibir.</p>
        )}
      </div>

      {/* Formulário de edição de documento */}
      {selectedDocument && (
        <div className="document-edit-form">
          <h3>Editar Documento: {selectedDocument.Title}</h3>
          <input
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleInputChange}
            placeholder="Título"
          />
          <input
            type="text"
            name="Authors"
            value={formData.Authors}
            onChange={handleInputChange}
            placeholder="Autores"
          />
          <input
            type="text"
            name="Editors"
            value={formData.Editors}
            onChange={handleInputChange}
            placeholder="Editores"
          />
          <input
            type="text"
            name="Keywords"
            value={formData.Keywords}
            onChange={handleInputChange}
            placeholder="Palavras-chave"
          />
          <input
            type="text"
            name="Multimedia"
            value={formData.Multimedia}
            onChange={handleInputChange}
            placeholder="Multimedia"
          />
          <input
            type="text"
            name="Soutien"
            value={formData.Soutien}
            onChange={handleInputChange}
            placeholder="Apoio"
          />
          <div className="button-container">
            <button onClick={handleSaveChanges}>Salvar Alterações</button>
            <button onClick={handleCancel} className="cancel-button">Cancelar</button> {/* Botão para cancelar as alterações */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Blockchain;

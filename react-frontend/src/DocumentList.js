import React, { useState } from 'react';
import { Container, TextField, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getFirestore, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { initializeApp } from 'firebase/app';
import './DocumentList.css'; // Importar o CSS

// Configurar as credenciais do Firebase
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

const FieldAuthentication = ({ label, name, value, onChange }) => (
  <div>
    <TextField
      label={label}
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
      sx={{ marginBottom: '10px' }}
    />
  </div>
);

function DocumentList() {
  const [searchHistoric, setSearchHistoric] = useState([]);
  const [documentData, setDocumentData] = useState({ ID: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDocumentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFetch = async () => {
    try {
      const q = query(collection(db, "document"), where("ID", "==", documentData.ID), orderBy("timestamp"));
      const querySnapshot = await getDocs(q);
      
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setSearchHistoric(results);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  return (
    <Container maxWidth="xs" className="document-list-container">
      <Typography variant="h4" className="document-list-header">
        Listar histórico do documento 
      </Typography>

      <div className="document-list-controls">
        <TextField
          label="ID"
          fullWidth
          name="ID"
          value={documentData.ID}
          onChange={handleChange}
          className="document-list-textfield"
        />

        <Button
          variant="contained"
          onClick={handleFetch}
          fullWidth
          sx={{ 
            backgroundColor: '#779fd8', 
            color: '#fff', 
            '&:hover': { backgroundColor: '#5f6b9d' },
            marginBottom: '16px' // Adiciona margem abaixo do botão
          }}
        >
          Buscar histórico do documento
        </Button>
      </div>

      <List className="document-list">
        {searchHistoric.map((document, index) => {
          // Converter o timestamp em um objeto de data
          const timestamp = document.timestamp.toDate();

          // Formatar o objeto de data para o formato desejado (exemplo: 'dd/MM/yyyy HH:mm:ss')
          const formattedTimestamp = format(timestamp, 'dd/MM/yyyy HH:mm:ss');

          return (
            <React.Fragment key={index}>
              <ListItem className="document-list-item">
                <ListItemText primary={`ID: ${document.ID}`} secondary={`Timestamp: ${formattedTimestamp}`} />
              </ListItem>
              <Divider className="document-list-divider" />
              <ListItem className="document-list-item">
                {document.Multimedia && (
                  <div className="image-container">
                    <img 
                      src={document.Multimedia} 
                      alt="Multimídia" 
                      className="document-image"
                    />
                  </div>
                )}
              </ListItem>
              <ListItem className="document-list-item">
                <FieldAuthentication
                  label="Título"
                  name="Title"
                  value={document.Title}
                  onChange={() => {}}
                />
              </ListItem>
              <ListItem className="document-list-item">
                <FieldAuthentication
                  label="Soutien"
                  name="Soutien"
                  value={document.Soutien}
                  onChange={() => {}}
                />
              </ListItem>
              <ListItem className="document-list-item">
                <FieldAuthentication
                  label="Autores"
                  name="Authors"
                  value={document.Authors}
                  onChange={() => {}}
                />
              </ListItem>
              <ListItem className="document-list-item">
                <FieldAuthentication
                  label="Editores"
                  name="Editors"
                  value={document.Editors}
                  onChange={() => {}}
                />
              </ListItem>
              <ListItem className="document-list-item">
                <FieldAuthentication
                  label="Multimídia"
                  name="Multimedia"
                  value={document.Multimedia}
                  onChange={() => {}}
                />
              </ListItem>
              <ListItem className="document-list-item">
                <FieldAuthentication
                  label="Palavras-chave"
                  name="Keywords"
                  value={document.Keywords}
                  onChange={() => {}}
                />
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
    </Container>
  );
}

export default DocumentList;

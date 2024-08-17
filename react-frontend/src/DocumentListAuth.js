import React, { useState } from 'react';
import { Container, TextField, Typography, Button } from '@mui/material';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import axios from 'axios';
import './DocumentListAuth.css'; // Importar o CSS

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

const FieldAuthentication = ({ label, value }) => (
  <div className="document-list-auth-item">
    <Typography variant="h6" className="document-list-auth-label">
      {label} 
    </Typography>
    <div className="document-list-auth-status">
      {value === "true" ? 'Autenticado ✅' : 'Não Autenticado ❌'}
    </div>
  </div>
);

function DocumentListAuth() {
  const [searchResults, setSearchResults] = useState([]);
  const [documentData, setDocumentData] = useState({ ID: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDocumentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "documentStatus"),
        where("ID", "==", documentData.ID),
        where("Title", "==", "true"),
        where("Soutien", "==", "true"),
        where("Authors", "==", "true"),
        where("Editors", "==", "true"),
        where("Multimedia", "==", "true"),
        where("Keywords", "==", "true"),
        orderBy("timestamp")
      );
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setSearchResults(results);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  const handleCreation = (documentData) => {
    const url = 'http://localhost:9090/documents';
  
    axios
      .post(url, documentData, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSendToProduction = async (document) => {
    try {
      // Garantir que o ID é uma string
      const documentID = String(document.ID);

      // Criar uma consulta para buscar o documento mais recente
      const q = query(
        collection(db, "document"),
        where("ID", "==", documentID),
        orderBy("timestamp", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      let documentData = null;

      querySnapshot.forEach((doc) => {
        documentData = doc.data(); // Pegue o dado do primeiro (e único) documento
        console.log(doc.data());
      });

      if (documentData) {
        handleCreation(documentData); // Passar os dados do documento para o handleCreation
      } else {
        console.log("Documento não encontrado.");
      }
    } catch (error) {
      console.error('Erro ao buscar o documento:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="document-list-auth-container">
      <Typography variant="h4" className="document-list-auth-header">
        Listar versão autenticada
      </Typography>

      <div className="document-list-auth-controls">
        <TextField
          label="ID"
          fullWidth
          name="ID"
          value={documentData.ID}
          onChange={handleChange}
          className="document-list-auth-textfield"
        />

        <Button variant="contained" onClick={handleSearch} className="document-list-auth-button">
          Buscar versões autenticadas
        </Button>
      </div>

      <List>
        {searchResults.map((document, index) => {
          // Converter o timestamp em um objeto de data
          const timestamp = document.timestamp.toDate();

          // Formatar o objeto de data para o formato desejado (exemplo: 'dd/MM/yyyy HH:mm:ss')
          const formattedTimestamp = format(timestamp, 'dd/MM/yyyy HH:mm:ss');

          return (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={`ID: ${document.ID}`} secondary={`Timestamp: ${formattedTimestamp}`} />
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleSendToProduction(document)}
                  className="document-list-auth-send-button"
                >
                  Enviar para produção
                </Button>
              </ListItem>
              <Divider />
              <ListItem>
                <FieldAuthentication
                  label="Título"
                  value={document.Title}
                />
              </ListItem>
              <ListItem>
                <FieldAuthentication
                  label="Soutien"
                  value={document.Soutien}
                />
              </ListItem>
              <ListItem>
                <FieldAuthentication
                  label="Autores"
                  value={document.Authors}
                />
              </ListItem>
              <ListItem>
                <FieldAuthentication
                  label="Editores"
                  value={document.Editors}
                />
              </ListItem>
              <ListItem>
                <FieldAuthentication
                  label="Multimídia"
                  value={document.Multimedia}
                />
              </ListItem>
              <ListItem>
                <FieldAuthentication
                  label="Palavras-chave"
                  value={document.Keywords}
                />
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
    </Container>
  );
}

export default DocumentListAuth;

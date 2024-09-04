import React, { useState } from 'react';
import { Container, TextField, Typography, Button } from '@mui/material';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { format } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
      {value ? 'Autenticado ✅' : 'Não Autenticado ❌'}
    </div>
  </div>
);

function DocumentListAuth() {
  const [searchResults, setSearchResults] = useState([]);
  const [documentData, setDocumentData] = useState({ ID: '' });
  const [customFields, setCustomFields] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDocumentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCustomFieldChange = (index, field) => (event) => {
    const { name, value } = event.target;
    const updatedFields = [...customFields];
    updatedFields[index] = { ...updatedFields[index], [name]: value };
    setCustomFields(updatedFields);
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

      navigate('/');
  };

  const handleSendToProduction = async (document) => {
    try {
      const documentID = String(document.ID);

      const q = query(
        collection(db, "document"),
        where("ID", "==", documentID),
        where("timestamp", "<=", document.timestamp),
        orderBy("timestamp", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      let documentData = null;

      querySnapshot.forEach((doc) => {
        documentData = doc.data();
      });

      if (documentData) {
        // Extraindo campos customizados
        const extractedCustomFields = customFields.reduce((acc, field) => {
          if (documentData.hasOwnProperty(field.name)) {
            acc[field.name] = documentData[field.name];
          }
          return acc;
        }, {});

        // Atualizando documentData com campos customizados
        documentData = { ...documentData, ...extractedCustomFields };

        handleCreation(documentData);
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

        <Button
            variant="contained"
            onClick={handleSearch}
            fullWidth
            sx={{ 
              backgroundColor: '#779fd8', 
              color: '#fff', 
              '&:hover': { backgroundColor: '#5f6b9d' },
              marginBottom: '16px' // Adiciona margem abaixo do botão
            }}
          >
          Buscar versões autenticadas
        </Button>

      </div>

      <List>
        {searchResults.map((document, index) => {
          const timestamp = document.timestamp.toDate();
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
              {Object.keys(document).map((key) => (
                key !== 'ID' && key !== 'timestamp' && key !== 'customFields' && (
                  <ListItem key={key}>
                    <FieldAuthentication
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={document[key]}
                    />
                  </ListItem>
                )
              ))}
              {document.customFields && Object.keys(document.customFields).map((key) => (
                <ListItem key={key}>
                  <FieldAuthentication
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={document.customFields[key]}
                  />
                </ListItem>
              ))}
            </React.Fragment>
          );
        })}
      </List>
    </Container>
  );
}

export default DocumentListAuth;

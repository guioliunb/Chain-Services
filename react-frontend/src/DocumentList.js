import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography, Button } from '@mui/material';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { getFirestore, collection, addDoc, serverTimestamp, query, where, orderBy, getDocs  } from 'firebase/firestore';
import { format } from 'date-fns';
import { initializeApp } from 'firebase/app';

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

function DocumentList({ documents }) {

  const [searchHistoric, setSearchHistoric] = useState([]);
  const [documentData, setDocumentData] = useState([]);

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
      console.log(results);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  return (
  
  <Container maxWidth="xs" sx={{ marginTop: '100px' }}>

    <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Listar histórico do documento 
    </Typography>

    <TextField
        label="ID"
        fullWidth
        name="ID"
        value={documentData.ID}
        onChange={handleChange}
        sx={{ marginBottom: '10px' }}
      />

     <Button variant="contained" onClick={handleFetch} fullWidth>
        Buscar histórico do documento
      </Button>

    <List>
      {searchHistoric.map((document, index) => {
        // Converter o timestamp em um objeto de data
        const timestamp = document.timestamp.toDate();

        // Formatar o objeto de data para o formato desejado (exemplo: 'dd/MM/yyyy HH:mm:ss')
        const formattedTimestamp = format(timestamp, 'dd/MM/yyyy HH:mm:ss');

        return (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText primary={`ID: ${document.ID}`} secondary={`Timestamp: ${formattedTimestamp}`} />
            </ListItem>
            <Divider />
            <ListItem>
              <FieldAuthentication
                label="Título"
                name="Title"
                value={document.Title}
                onChange={() => {}}
              />
            </ListItem>
            <ListItem>
              <FieldAuthentication
                label="Soutien"
                name="Soutien"
                value={document.Soutien}
                onChange={() => {}}
              />
            </ListItem>
            <ListItem>
              <FieldAuthentication
                label="Autores"
                name="Authors"
                value={document.Authors}
                onChange={() => {}}
              />
            </ListItem>
            <ListItem>
              <FieldAuthentication
                label="Editores"
                name="Editors"
                value={document.Editors}
                onChange={() => {}}
              />
            </ListItem>
            <ListItem>
              <FieldAuthentication
                label="Multimídia"
                name="Multimedia"
                value={document.Multimedia}
                onChange={() => {}}
              />
            </ListItem>
            <ListItem>
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

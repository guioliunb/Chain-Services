import React, { useState } from 'react';
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, query, where, orderBy, getDocs } from 'firebase/firestore';

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

function AutenticadorTexto() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistoric, setSearchHistoric] = useState([]);

  const [documentData, setDocumentData] = useState({
    ID: '',
    Title: 'false',
    Soutien: 'false',
    Authors: 'false',
    Editors: 'false',
    Multimedia: 'false',
    Keywords: 'false',
    timestamp: serverTimestamp()
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDocumentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, "documentStatus"), documentData);
      console.log('Documento adicionado com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar documento:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const q = query(collection(db, "documentStatus"), 
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
    <Container maxWidth="xs" sx={{ marginTop: '100px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#333' }}>
        Autenticação de Documentos
      </Typography>
      <TextField
        label="ID"
        fullWidth
        name="ID"
        value={documentData.ID}
        onChange={handleChange}
        sx={{ marginBottom: '15px' }}
        InputProps={{
          style: { borderRadius: '8px' }
        }}
      />
      <FormControl fullWidth sx={{ marginBottom: '15px' }}>
        <InputLabel>Título:</InputLabel>
        <Select
          name="Title"
          value={documentData.Title}
          onChange={handleChange}
          sx={{ borderRadius: '8px' }}
        >
          <MenuItem value="false">Não autenticado</MenuItem>
          <MenuItem value="true">Autenticado</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '15px' }}>
        <InputLabel>Soutien:</InputLabel>
        <Select
          name="Soutien"
          value={documentData.Soutien}
          onChange={handleChange}
          sx={{ borderRadius: '8px' }}
        >
          <MenuItem value="false">Não autenticado</MenuItem>
          <MenuItem value="true">Autenticado</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '15px' }}>
        <InputLabel>Autores:</InputLabel>
        <Select
          name="Authors"
          value={documentData.Authors}
          onChange={handleChange}
          sx={{ borderRadius: '8px' }}
        >
          <MenuItem value="false">Não autenticado</MenuItem>
          <MenuItem value="true">Autenticado</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '15px' }}>
        <InputLabel>Editores:</InputLabel>
        <Select
          name="Editors"
          value={documentData.Editors}
          onChange={handleChange}
          sx={{ borderRadius: '8px' }}
        >
          <MenuItem value="false">Não autenticado</MenuItem>
          <MenuItem value="true">Autenticado</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '15px' }}>
        <InputLabel>Multimídia:</InputLabel>
        <Select
          name="Multimedia"
          value={documentData.Multimedia}
          onChange={handleChange}
          sx={{ borderRadius: '8px' }}
        >
          <MenuItem value="false">Não autenticado</MenuItem>
          <MenuItem value="true">Autenticado</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '15px' }}>
        <InputLabel>Palavras-chave:</InputLabel>
        <Select
          name="Keywords"
          value={documentData.Keywords}
          onChange={handleChange}
          sx={{ borderRadius: '8px' }}
        >
          <MenuItem value="false">Não autenticado</MenuItem>
          <MenuItem value="true">Autenticado</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSave} fullWidth className="submit-button">
        Salvar no Firestore
      </Button>
    </Container>
  );
}

export default AutenticadorTexto;

  import React, { useState } from 'react';
  import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
  import axios from 'axios';
  import { Container, TextField, Button, Typography } from '@mui/material';
  import { initializeApp } from 'firebase/app';

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

  function CriacaoDocumento() {
    const [documentData, setDocumentData] = useState({
      ID: '1',
      Title: 'default',
      Soutien: 'default',
      Authors: 'default',
      Editors: 'default',
      Multimedia: 'default',
      Keywords: 'default',
      timestamp: serverTimestamp()
    });

    const handleCreation = () => {
      const url = 'http://localhost:9090/documents';
      console.log('Dados recebidos pelo frontend:',documentData)
      const documentDataFormatted = {
        ID: String(documentData.ID),
        Title: String(documentData.Title),
        Soutien: String(documentData.Soutien),
        Authors: String(documentData.Authors),
        Editors: String(documentData.Editors),
        Multimedia: String(documentData.Multimedia),
        Keywords: String(documentData.Keywords),
        timestamp: new Date().toISOString() // Converter timestamp para ISO
      };
  
      console.log('Dados enviados ao backend:', documentDataFormatted);
      axios
        .post(url, documentDataFormatted, {  
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

      handleSave();
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setDocumentData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };

    const handleSave = async () => {
      try {
        // Adicionar o documento na coleção 'documents'
        const docRef = await addDoc(collection(db, "document"), documentData);
        console.log('Documento adicionado com ID:', docRef.id);
    
        // Criar o documento correspondente na coleção 'documentStatus'
        const initialStatus = {
          ID: documentData.ID,
          Title: false,
          Soutien: false,
          Authors: false,
          Editors: false,
          Multimedia: false,
          Keywords: false,
          timestamp: new Date() // Adicionar um timestamp para o status inicial
        };
    
        await addDoc(collection(db, "documentStatus"), initialStatus);
        console.log('Documento de status inicial adicionado com ID:', docRef.id);
      } catch (error) {
        console.error('Erro ao adicionar documento:', error);
      }
    };
    

    return (
      <Container maxWidth="xs" sx={{ marginTop: '100px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', color: '#333' }}>
          Criação de Documentos
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
        <TextField
          label="Título"
          fullWidth
          name="Title"
          value={documentData.Title}
          onChange={handleChange}
          sx={{ marginBottom: '15px' }}
          InputProps={{
            style: { borderRadius: '8px' }
          }}
        />
        <TextField
          label="Soutien"
          fullWidth
          name="Soutien"
          value={documentData.Soutien}
          onChange={handleChange}
          sx={{ marginBottom: '15px' }}
          InputProps={{
            style: { borderRadius: '8px' }
          }}
        />
        <TextField
          label="Autores"
          fullWidth
          name="Authors"
          value={documentData.Authors}
          onChange={handleChange}
          sx={{ marginBottom: '15px' }}
          InputProps={{
            style: { borderRadius: '8px' }
          }}
        />
        <TextField
          label="Editores"
          fullWidth
          name="Editors"
          value={documentData.Editors}
          onChange={handleChange}
          sx={{ marginBottom: '15px' }}
          InputProps={{
            style: { borderRadius: '8px' }
          }}
        />
        <TextField
          label="Multimídia"
          fullWidth
          name="Multimedia"
          value={documentData.Multimedia}
          onChange={handleChange}
          sx={{ marginBottom: '15px' }}
          InputProps={{
            style: { borderRadius: '8px' }
          }}
        />
        <TextField
          label="Palavras-chave"
          fullWidth
          name="Keywords"
          value={documentData.Keywords}
          onChange={handleChange}
          sx={{ marginBottom: '20px' }}
          InputProps={{
            style: { borderRadius: '8px' }
          }}
        />
        <Button variant="contained" onClick={handleCreation} fullWidth className="submit-button">
          Criar Documento
        </Button>
      </Container>
    );
  }

  export default CriacaoDocumento;

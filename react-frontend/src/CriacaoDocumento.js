import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { Container, TextField, Button, Typography, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
const storage = getStorage(app);

function CriacaoDocumento() {
  const navigate = useNavigate();

  const [documentData, setDocumentData] = useState({
    ID: '1',
    Title: 'IMAGE',
    Soutien: 'IMAGE',
    Authors: 'IMAGE',
    Editors: 'IMAGE',
    Multimedia: 'IMAGE',
    Keywords: 'IMAGE',
    timestamp: serverTimestamp()
  });

  const [imageFile, setImageFile] = useState(null);

  const handleCreation = () => {
    if (imageFile) {
      const storageRef = ref(storage, `images/${imageFile.name}`);
      uploadBytes(storageRef, imageFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setDocumentData((prevData) => ({
            ...prevData,
            Multimedia: url
          }));

          saveDocument(url); // Enviar o documento após o upload da imagem
        });
      }).catch((error) => {
        console.error("Erro ao fazer upload da imagem:", error);
      });
    } else {
      saveDocument(); // Enviar o documento sem imagem
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDocumentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const saveDocument = (imageUrl = '') => {
    const url = 'http://localhost:9090/documents';
    const documentDataFormatted = {
      ...documentData,
      Multimedia: imageUrl || documentData.Multimedia,
      timestamp: new Date().toISOString()
    };

    // axios
    //   .post(url, documentDataFormatted, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*'
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    handleSave(imageUrl);
  };

  const handleSave = async (imageUrl) => {
    try {
      const docRef = await addDoc(collection(db, "document"), {
        ...documentData,
        Multimedia: imageUrl || documentData.Multimedia,
      });
      console.log('Documento adicionado com ID:', docRef.id);

      const initialStatus = {
        ID: documentData.ID,
        Title: false,
        Soutien: false,
        Authors: false,
        Editors: false,
        Multimedia: false,
        Keywords: false,
        timestamp: new Date()
      };

      await addDoc(collection(db, "documentStatus"), initialStatus);
      console.log('Documento de status inicial adicionado com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar documento:', error);
    }

    navigate('/');
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
        }}submit-button
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
        label="Palavras-chave"
        fullWidth
        name="Keywords"
        value={documentData.Keywords}
        onChange={handleChange}
        sx={{ marginBottom: '15px' }}
        InputProps={{
          style: { borderRadius: '8px' }
        }}
      />
      <Input
        type="file"
        onChange={handleFileChange}
        sx={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        onClick={handleCreation}
        fullWidth
        sx={{ backgroundColor: '#779fd8', color: '#fff', '&:hover': { backgroundColor: '#5f6b9d' } }}
      >
        Criar Documento
      </Button>

      
    </Container>
  );
}

export default CriacaoDocumento;

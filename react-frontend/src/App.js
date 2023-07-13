import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [documentData, setDocumentData] = useState({
    ID: '2',
    Title: 'Frontend calls',
    Soutien: 'Version 1 is coming',
    Authors: 'Gui',
    Editors: 'Oli',
    Multimedia: 'Web Browser',
    Keywords: 'Working'
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDocumentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLogin = () => {
    const url = 'http://localhost:8080/documents';

    axios
      .post(url, documentData, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      })
      .then((response) => {
        // Lógica para lidar com a resposta da requisição de login bem-sucedida
        console.log(response.data);
      })
      .catch((error) => {
        // Lógica para lidar com erros na requisição de login
        console.error(error);
      });
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Tela de Login Blockchain
      </Typography>
      <TextField
        label="Título"
        fullWidth
        name="Title"
        value={documentData.Title}
        onChange={handleChange}
        sx={{ marginBottom: '10px' }}
      />
      <TextField
        label="Soutien"
        fullWidth
        name="Soutien"
        value={documentData.Soutien}
        onChange={handleChange}
        sx={{ marginBottom: '10px' }}
      />
      <TextField
        label="Autores"
        fullWidth
        name="Authors"
        value={documentData.Authors}
        onChange={handleChange}
        sx={{ marginBottom: '10px' }}
      />
      <TextField
        label="Editores"
        fullWidth
        name="Editors"
        value={documentData.Editors}
        onChange={handleChange}
        sx={{ marginBottom: '10px' }}
      />
      <TextField
        label="Multimídia"
        fullWidth
        name="Multimedia"
        value={documentData.Multimedia}
        onChange={handleChange}
        sx={{ marginBottom: '10px' }}
      />
      <TextField
        label="Palavras-chave"
        fullWidth
        name="Keywords"
        value={documentData.Keywords}
        onChange={handleChange}
        sx={{ marginBottom: '20px' }}
      />
      <Button variant="contained" onClick={handleLogin} fullWidth>
        Entrar
      </Button>
    </Container>
  );
}

export default App;

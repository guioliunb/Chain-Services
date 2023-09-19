import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@mui/material';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { format } from 'date-fns';


function CriacaoDocumento({ documents }) {

    const [documentData, setDocumentData] = useState({
        ID: '1',
        Title: 'Frontend calls',
        Soutien: 'Version 1 is coming',
        Authors: 'Gui',
        Editors: 'Oli',
        Multimedia: 'Web Browser',
        Keywords: 'Working',
        timestamp: serverTimestamp()
      });

      const handleCreation = () => {
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
    
          handleSave();
    
      };
    
      const handleSave = async () => {
        try {
          const docRef = await addDoc(collection(db, "document"), documentData);
          console.log('Documento adicionado com ID:', docRef.id);
        } catch (error) {
          console.error('Erro ao adicionar documento:', error);
        }
      };


    return (
    <Container maxWidth="xs" sx={{ marginTop: '100px' }}>
    
    <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Criação de Documentos
    </Typography>
    <TextField
        label="ID"
        fullWidth
        name="ID"
        value={documentData.ID}
        onChange={handleChange}
        sx={{ marginBottom: '10px' }}
    />
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
    <Button variant="contained" onClick={handleCreation} fullWidth>
        Entrar
    </Button>
    </Container>
  );
}

export default DocumentList;

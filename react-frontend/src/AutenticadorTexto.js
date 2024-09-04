    import React, { useState } from 'react';
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, query, where, orderBy, getDocs } from 'firebase/firestore';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';

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

  const [customFields, setCustomFields] = useState([]);
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDocumentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCustomFieldChange = (index, event) => {
    const { name, value } = event.target;
    const newCustomFields = [...customFields];
    newCustomFields[index][name] = value;
    setCustomFields(newCustomFields);
  };

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { name: '', value: 'false' }]);
  };

  const handleRemoveCustomField = (index) => {
    const newCustomFields = customFields.filter((_, i) => i !== index);
    setCustomFields(newCustomFields);
  };

  const handleSave = async () => {
    try {
      const fullDocumentData = {
        ...documentData,
        customFields: customFields.reduce((acc, field) => {
          acc[field.name] = field.value;
          return acc;
        }, {}),
        timestamp: serverTimestamp()
      };
      const docRef = await addDoc(collection(db, "documentStatus"), fullDocumentData);
      console.log('Documento adicionado com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar documento:', error);
    }

    navigate('/');
  };

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "documentStatus"),
        where("ID", "==", documentData.ID),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const lastDoc = querySnapshot.docs[0].data();
        const customFieldsFromDoc = Object.entries(lastDoc.customFields || {}).map(([name, value]) => ({ name, value }));
        setDocumentData((prevData) => ({
          ...prevData,
          ...lastDoc,
        }));
        setCustomFields(customFieldsFromDoc);
        setIsDocumentLoaded(true);
      } else {
        // Se não encontrar o documento, inicializar campos com valores vazios
        setDocumentData({
          ID: documentData.ID,
          Title: 'false',
          Soutien: 'false',
          Authors: 'false',
          Editors: 'false',
          Multimedia: 'false',
          Keywords: 'false',
          timestamp: serverTimestamp()
        });
        setCustomFields([]);
        setIsDocumentLoaded(false);
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: '100px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#333' }}>
        Autenticação de Documentos
      </Typography>
      
      {/* Campo de Busca */}
      <TextField
        label="ID"
        fullWidth
        name="ID"
        value={documentData.ID}
        onChange={handleChange}
        autoComplete="off"
        sx={{ marginBottom: '15px' }}
        InputProps={{
          style: { borderRadius: '8px' }
        }}
      />

      {/* Botão de Buscar Documento */}
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
        Buscar Documento
      </Button>

      {isDocumentLoaded && (
        <>
          {/* Campos de Seleção Padrão */}
          {Object.entries(documentData).map(([key, value]) => (
            key !== 'ID' && key !== 'timestamp' && key !== 'customFields' && (
              <FormControl fullWidth sx={{ marginBottom: '15px' }} key={key}>
                <InputLabel>{key}:</InputLabel>
                <Select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="false">Não autenticado</MenuItem>
                  <MenuItem value="true">Autenticado</MenuItem>
                </Select>
              </FormControl>
            )
          ))}

          {/* Campos Customizados */}
          {customFields.map((field, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <TextField
                label="Nome do Campo"
                name="name"
                value={field.name}
                onChange={(e) => handleCustomFieldChange(index, e)}
                sx={{ marginRight: '10px', flex: 1 }}
              />
              <Select
                name="value"
                value={field.value}
                onChange={(e) => handleCustomFieldChange(index, e)}
                autoComplete="off"
                sx={{ flex: 1 }}
              >
                <MenuItem value="false">Não autenticado</MenuItem>
                <MenuItem value="true">Autenticado</MenuItem>
              </Select>
              <IconButton onClick={() => handleRemoveCustomField(index)} color="secondary" aria-label="remover campo">
                <RemoveIcon />
              </IconButton>
            </div>
          ))}

          <Button variant="outlined" onClick={handleAddCustomField} fullWidth sx={{ marginBottom: '20px' }}>
            Adicionar Campo
          </Button>
          
          {/* Botão de Salvar Documento */}
          <Button
            variant="contained"
            onClick={handleSave}
            fullWidth
            sx={{ backgroundColor: '#779fd8', color: '#fff', '&:hover': { backgroundColor: '#5f6b9d' } }}
          >
            Salvar no Firestore
          </Button>
        </>
      )}
    </Container>
  );
}

export default AutenticadorTexto;
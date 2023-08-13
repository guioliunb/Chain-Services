import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@mui/material';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { format } from 'date-fns';

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
    <div>
      {value === "true" ? 'Autenticado ✅' : 'Não Autenticado ❌'}
    </div>
  </div>
);

function DocumentListAuth({ documents }) {
  return (
    <List>
      {documents.map((document, index) => {
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
  );
}

export default DocumentListAuth;

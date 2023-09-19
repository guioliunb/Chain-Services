import React, { useState } from 'react';
import axios from 'axios';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Container, TextField, Button } from '@mui/material';
import AutenticadorTexto from './AutenticadorTexto';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';


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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function App() {
  const [documentData, setDocumentData] = useState({
    ID: '1',
    Title: 'Frontend calls',
    Soutien: 'Version 1 is coming',
    Authors: 'Gui',
    Editors: 'Oli',
    Multimedia: 'Web Browser',
    Keywords: 'Working',
    timestamp: serverTimestamp(),
  });

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const [loginEmail, setLoginEmail] = useState(''); // Novo estado para email de login
  const [loginPassword, setLoginPassword] = useState(''); // Novo estado para senha de login

  const handleLogin = () => {
    // Use os estados de loginEmail e loginPassword para fazer o login
    console.log(loginEmail);
    console.log(loginPassword);
  
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário logado:', user);
        setLoginSuccess(true);
        setLoginError(null);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao fazer login:', errorCode, errorMessage);
        setLoginSuccess(false);
        setLoginError(errorMessage);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuário deslogado');
        setLoginSuccess(false);
      })
      .catch((error) => {
        console.error('Erro ao deslogar:', error);
      });
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: '100px' }}>
      {loginSuccess ? (
        <AutenticadorTexto />
      ) : (
        <div>
          <h2>Faça login com o Firebase</h2>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)} // Atualize o estado de loginEmail
            fullWidth
            margin="normal"
          />
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)} // Atualize o estado de loginPassword
            fullWidth
            margin="normal"
          />
          {loginError && <p>{loginError}</p>}
          <Button variant="contained" onClick={handleLogin}>
            Fazer Login
          </Button>
        </div>
      )}
    </Container>
  );
}

export default App;
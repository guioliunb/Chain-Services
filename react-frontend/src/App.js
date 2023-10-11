import React, { useState } from 'react';
import axios from 'axios';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Container, TextField, Button } from '@mui/material';
import AutenticadorTexto from './AutenticadorTexto';
import CriacaoDocumento from './CriacaoDocumento'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sobre from './Sobre';
import Home from './Home'
import DocumentList from './DocumentList';
import { styled } from '@mui/system';
import './App.css'; 


import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import DocumentListAuth from './DocumentListAuth';


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

  function Apresentacao() {
    return (
      <div style={{ padding: 20 }}>
        <h2>Home View</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      </div>
    );
  }

  function Logout() {
    return (
      <div style={{ padding: 20 }}>
        <Button variant="contained" onClick={handleLogout}>
            Fazer Logout
          </Button>
      </div>
    );
  }
  
  function NoMatch() {
    return (
      <div style={{ padding: 20 }}>
        <h2>404: Page Not Found</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      </div>
    );
  }

  const CustomLink = styled(Link)({
    padding: 5,
    textDecoration: 'none',
    color: (theme) => theme.palette.primary.main,
  });

  return (
    <Container maxWidth="xs" sx={{ marginTop: '100px' }}>
      {loginSuccess ? (
        <Router>
         <nav style={{ margin: 10 }}>
            <Link to="/" className="customLink">
              Home
            </Link>
            <Link to="/criacao" className="customLink">
              Criacao
            </Link>
            <Link to="/autenticacao" className="customLink">
              Autenticacao
            </Link>
            <Link to="/historico" className="customLink">
              Historico
            </Link>
            <Link to="/versaoAutenticada" className="customLink">
              Versões
            </Link>
            <Link to="/logout" className="customLink">
              Logout
            </Link>
          </nav>
        <Routes>
          <Route path="/"                   element={<Home />} />
          <Route path="/criacao"            element={<CriacaoDocumento />} />
          <Route path="/autenticacao"       element={<AutenticadorTexto />} />
          <Route path="/historico"          element={<DocumentList />} />
          <Route path="/versaoAutenticada"  element={<DocumentListAuth />} />
          <Route path="/logout"             element={<Logout />} />
          <Route path="*"                   element={<NoMatch />} />
        </Routes>
      </Router>
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
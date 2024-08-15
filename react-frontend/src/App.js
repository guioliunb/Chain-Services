import React, { useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { TextField, Button } from '@mui/material';
import AutenticadorTexto from './AutenticadorTexto';
import CriacaoDocumento from './CriacaoDocumento';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import DocumentList from './DocumentList';
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

function Navigation({ handleLogout }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="nav-links">
      <Link className={isActive('/')} to="/">Home</Link>
      <Link className={isActive('/criacao')} to="/criacao">Criação</Link>
      <Link className={isActive('/autenticacao')} to="/autenticacao">Autenticação</Link>
      <Link className={isActive('/historico')} to="/historico">Histórico</Link>
      <Link className={isActive('/versaoAutenticada')} to="/versaoAutenticada">Versões</Link>
      <Link className={isActive('/logout')} to="/logout" onClick={handleLogout}>Logout</Link>
    </nav>
  );
}

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoginSuccess(true);
        setLoginError(null);
      })
      .catch((error) => {
        setLoginSuccess(false);
        setLoginError(error.message);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoginSuccess(false);
      })
      .catch((error) => {
        console.error('Erro ao deslogar:', error);
      });
  };

  return (
    <div className="App">
      {loginSuccess ? (
        <Router>
          <Navigation handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/criacao" element={<CriacaoDocumento />} />
            <Route path="/autenticacao" element={<AutenticadorTexto />} />
            <Route path="/historico" element={<DocumentList />} />
            <Route path="/versaoAutenticada" element={<DocumentListAuth />} />
            <Route path="/logout" element={<div>Você saiu</div>} />
            <Route path="*" element={<div>404: Página não encontrada</div>} />
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
            onChange={(e) => setLoginEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          {loginError && <p>{loginError}</p>}
          <Button variant="contained" onClick={handleLogin} className="login-button">
            Fazer Login
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;

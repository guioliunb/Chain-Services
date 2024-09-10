import React, { useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { TextField, Button } from '@mui/material';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import AutenticadorTexto from './AutenticadorTexto';
import CriacaoDocumento from './CriacaoDocumento';
import Home from './Home';
import DocumentList from './DocumentList';
import DocumentListAuth from './DocumentListAuth';
import Blockchain from './Blockchain';
import './App.css'; 
import blockchainImage from './hyperledger.png';
import NotFound from './NotFound'; // Importe o novo componente

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
      <Link className={isActive('/blockchain')} to="/blockchain">Blockchain</Link>
      <Link className={isActive('/logout')} to="/logout" onClick={handleLogout}>Logout</Link>
    </nav>
  );
}

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const navigate = useNavigate(); // Adiciona o useNavigate

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        setLoginSuccess(true);
        setLoginError(null);
        navigate('/'); // Redireciona para a homepage após o login
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
        navigate('/'); // Redireciona para a página inicial após o logout
      })
      .catch((error) => {
        console.error('Erro ao deslogar:', error);
      });
  };

  return (
    <div className="App">
      {loginSuccess ? (
        <>
          <Navigation handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/criacao" element={<CriacaoDocumento />} />
            <Route path="/autenticacao" element={<AutenticadorTexto />} />
            <Route path="/historico" element={<DocumentList />} />
            <Route path="/versaoAutenticada" element={<DocumentListAuth />} />
            <Route path="/blockchain" element={<Blockchain />} />
            <Route path="/logout" element={<div>Você saiu</div>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </>
      ) : (
        <div className="login-container">
          <img src={blockchainImage} alt="Hyperledger Logo" className="logo" />
          <h2 className="login-title">Bem-vindo ao sistema de autenticação</h2>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            fullWidth
            margin="normal"
            className="login-textfield"
          />
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            fullWidth
            margin="normal"
            className="login-textfield"
          />
          {loginError && <p className="login-error">{loginError}</p>}
          <Button variant="contained" onClick={handleLogin} className="login-button">
            Fazer Login
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;

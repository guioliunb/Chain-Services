import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import './Login.css'; // Adicionei o arquivo CSS para estilos específicos do login

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário logado:', user);
        setLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao fazer login:', errorCode, errorMessage);
      });
  };

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        console.log('Usuário deslogado');
        setLoggedIn(false);
      })
      .catch((error) => {
        console.error('Erro ao deslogar:', error);
      });
  };

  return (
    <div className="login-container">
      <img src="/hyperledger.png" alt="Hyperledger Logo" className="login-logo" />
      <h2>Bem-vindo ao sistema de autenticação</h2>
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Senha"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {loggedIn ? (
        <Button variant="contained" onClick={handleLogout} className="login-button">
          Fazer Logout
        </Button>
      ) : (
        <Button variant="contained" onClick={handleLogin} className="login-button">
          Fazer Login
        </Button>
      )}
    </div>
  );
}

export default Login;

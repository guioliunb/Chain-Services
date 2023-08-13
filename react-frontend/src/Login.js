import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export const signInUser = (userData) => {

    //const { email, senha } = userData;
    const email = "guilherme@unb.com.br"
    const senha = "123456"

    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            
            console.log('User signed in!');
            console.log(auth.currentUser);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}

export const signOutUser = () => {
    signOut(auth)
        .then(() => {
            console.log('User signed out!')
        })
        .catch(error => {
            console.log('Something went wrong with sign out: ', error);
        }
        )
}

export const currentUser = () => {
    return auth.currentUser;
}

export const isLogged = () => {
    const user = currentUser();
    if (user) {
        return true;
    } else {
        return false;
    }
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
  
    const handleLogin = () => {
      const auth = getAuth();
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Sucesso no login
          const user = userCredential.user;
          console.log('Usuário logado:', user);
          setLoggedIn(true);
        })
        .catch((error) => {
          // Erro no login
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Erro ao fazer login:', errorCode, errorMessage);
        });
    };
  
    const handleLogout = () => {
      const auth = getAuth();
  
      signOut(auth)
        .then(() => {
          // Sucesso no logout
          console.log('Usuário deslogado');
          setLoggedIn(false);
        })
        .catch((error) => {
          // Erro no logout
          console.error('Erro ao deslogar:', error);
        });
    };
  
    return (
      <div>
        <h2>Faça login com o Firebase</h2>
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
          <Button variant="contained" onClick={handleLogout}>
            Fazer Logout
          </Button>
        ) : (
          <Button variant="contained" onClick={handleLogin}>
            Fazer Login
          </Button>
        )}
      </div>
    );
  }
  
  export default Login;
  
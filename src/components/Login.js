// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' ||error.code === ' auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else {
        setError('Something went wrong. Please try again.');
      }
      alert(error.message)
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
      <TextField label="Email" type="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary">Login</Button>
    </Box>
  );
};

export default Login;

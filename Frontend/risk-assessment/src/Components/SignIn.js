import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import axios from 'axios';

import background from '../Assets/finance-background.jpg';

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Send login request with credentials
      const response = await axios.post(
        'http://localhost:9192/login',
        {
          userName: username,
          password: password,
        },
        {
          withCredentials: true, 
        }
      );
      setSuccess('Login successful!');
      navigate('/adminHome');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          marginLeft: 'auto',
          marginRight: '2rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: 350 }}>
          <Typography variant="h4" gutterBottom align="center">
            Sign In
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}

export default SignIn;

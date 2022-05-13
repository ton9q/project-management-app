import { useEffect, useState } from 'react';
import { Box, Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { createUser } from '../../services/SignInUpService';
import { config } from '../../config';
import './SignUp.css';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [helperTextEmail, setHelperTextEmail] = useState('');
  const [helperTextPassword, setHelperTextPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (isCreating) {
      onCreating();
    }
  }, [isCreating]);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if ((event.target as HTMLInputElement).name === 'email') {
      setEmail((event.target as HTMLInputElement).value);
    } else if ((event.target as HTMLInputElement).name === 'name') {
      setName((event.target as HTMLInputElement).value);
    } else {
      setPassword((event.target as HTMLInputElement).value);
    }
  };

  const onCreating = () => {
    createUser({
      name: name,
      login: email,
      password: password,
    }).then((data) => {
      setIsCreating(false);
    });
  };

  const btnModalSubmit = { margin: '12px 0', height: '40px' };
  const inputModal = { marginBottom: '10px' };

  return (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <Grid className="login-modal">
        <Paper elevation={24} className="paper-style">
          <Grid>
            <h2 className="title-modal">Sign Up</h2>
          </Grid>
          <TextField
            style={inputModal}
            name="name"
            value={name}
            label="name"
            placeholder="Enter username"
            helperText={helperTextEmail}
            fullWidth
            required
            onChange={onValueChange}
          />
          <TextField
            style={inputModal}
            name="email"
            value={email}
            label="email"
            placeholder="Enter email"
            helperText={helperTextEmail}
            fullWidth
            required
            onChange={onValueChange}
          />
          <TextField
            style={inputModal}
            name="password"
            value={password}
            label="Password"
            placeholder="Enter password"
            helperText={helperTextPassword}
            type="password"
            fullWidth
            required
            onChange={onValueChange}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnModalSubmit}
            fullWidth
            onClick={() => setIsCreating(true)}
          >
            Sign Up
          </Button>
          <Typography>
            Do you have an account?&nbsp;
            <Link to={config.urls.public.signIn}>Sign In</Link>
          </Typography>
        </Paper>
      </Grid>
    </Box>
  );
}

import { useEffect, useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Box, Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { createUser } from '../../services/SignInUpService';
import { config } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  onChangeName,
  onChangeEmail,
  onChangePassword,
  clearCurrentUser,
} from './Reducer/FormSignUpSlice';
import './SignUp.css';

export function SignUp() {
  const dispatch = useAppDispatch();
  const { name, email, password } = useAppSelector((state) => state.formSignUpReducer.currentUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name,
      email: email,
      password: password,
    },
  });

  const [isCreating, setIsCreating] = useState(false);
  const [userError, setUserError] = useState<string | undefined>('');

  useEffect(() => {
    if (isCreating) {
      onCreating();
    }
  }, [isCreating]);

  const onSubmit = () => {
    setIsCreating(true);
  };

  const renderValidationMessage = useCallback(
    (message: string | undefined) => (
      <span className={'span-not-invalid'}>{message || 'this field is required'}</span>
    ),
    []
  );

  const renderUserCreatingError = useCallback(
    (userError: string) => <span className={'span-not-invalid'}>{userError}</span>,
    []
  );

  const onCreating = () => {
    createUser({
      name: name,
      login: email,
      password: password,
    })
      .then(() => {
        setIsCreating(false);
        dispatch(clearCurrentUser());
        reset();
        setUserError('');
      })
      .catch((error: AxiosError) => {
        setIsCreating(false);
        setUserError((error.response?.data as { statusCode: number; message: string }).message);
      });
  };

  const btnModalSubmit = { marginBottom: '12px', height: '40px' };
  const inputModal = { marginBottom: '30px' };

  return (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <Grid className="login-modal">
        <Paper elevation={24} className="paper-style">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="title-modal">Sign Up</h2>
            <div className="container-input-message">
              <TextField
                {...register('name', {
                  required: true,
                  pattern: { value: /^[A-Za-z]+$/i, message: 'only letters of the Latin alphabet' },
                  minLength: { value: 2, message: 'min length 2 letters' },
                })}
                style={inputModal}
                name="name"
                value={name}
                label="name"
                placeholder="Enter username"
                fullWidth
                required
                onChange={(e) => dispatch(onChangeName((e.target as HTMLInputElement).value))}
              />
              {errors.name && renderValidationMessage(errors.name?.message)}
            </div>
            <div className="container-input-message">
              <TextField
                {...register('email', {
                  required: true,
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
                    message: 'email is not correct',
                  },
                })}
                style={inputModal}
                name="email"
                value={email}
                label="email"
                placeholder="Enter email"
                fullWidth
                required
                onChange={(e) => dispatch(onChangeEmail((e.target as HTMLInputElement).value))}
              />
              {errors.email && renderValidationMessage(errors.email?.message)}
            </div>
            <div className="container-input-message">
              <TextField
                {...register('password', {
                  required: true,
                  pattern: { value: /^[0-9]+$/g, message: 'only numbers' },
                  minLength: { value: 3, message: 'min length 3 numbers' },
                })}
                style={inputModal}
                name="password"
                value={password}
                label="Password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                onChange={(e) => dispatch(onChangePassword((e.target as HTMLInputElement).value))}
              />
              {errors.password && renderValidationMessage(errors.password?.message)}
              {userError && renderUserCreatingError(userError)}
            </div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnModalSubmit}
              fullWidth
            >
              Sign Up
            </Button>
            <Typography>
              Do you have an account?&nbsp;
              <Link to={config.urls.public.signIn}>Sign In</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
}

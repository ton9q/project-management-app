import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Box, Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { loginUser } from '../../services/SignInUpService';
import { config } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Spinner from '../../components/Spinner/Spinner';
import { onChangeLogin, onChangePassword, clearCurrentUser } from './Reducer/FormSignInSlice';

interface IUserInfo {
  login: string;
  token: string;
}

export function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { login, password } = useAppSelector((state) => state.formSignInReducer.currentUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: login,
      password: password,
    },
  });

  const [isLogin, setIsLogin] = useState(false);
  const [userError, setUserError] = useState<string | undefined>('');

  useEffect(() => {
    if (isLogin) {
      onLogin();
    }
  }, [isLogin]);

  const onSubmit = () => {
    setIsLogin(true);
  };

  const renderValidationMessage = useCallback(
    (message: string | undefined) => (
      <span className={'span-not-invalid'}>{message || 'this field is required'}</span>
    ),
    []
  );

  const renderUserSignInError = useCallback(
    (userError: string) => <span className={'span-not-invalid'}>{userError}</span>,
    []
  );

  const setLocalStorage = (userInfo: IUserInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  const onLogin = () => {
    loginUser({ login: login, password: password })
      .then((response) => {
        setLocalStorage({ login: login, token: response.data.token });
        setIsLogin(false);
        dispatch(clearCurrentUser());
        reset();
        setUserError('');
        navigate('/main');
      })
      .catch((error: AxiosError) => {
        setIsLogin(false);
        setUserError((error.response?.data as { statusCode: number; message: string }).message);
      });
  };

  const btnModalSubmit = { marginBottom: '12px', height: '40px' };
  const inputModal = { marginBottom: '30px' };

  return isLogin ? (
    <Spinner />
  ) : (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <Grid className="login-modal">
        <Paper elevation={24} className="paper-style">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="title-modal">Sign In</h2>
            <div className="container-input-message">
              <TextField
                {...register('login', {
                  required: true,
                  pattern: { value: /^[A-Za-z]+$/i, message: 'only letters of the Latin alphabet' },
                  minLength: { value: 3, message: 'min length 3 letters' },
                })}
                style={inputModal}
                name="login"
                value={login}
                label="login"
                placeholder="Enter login"
                fullWidth
                required
                onChange={(e) => dispatch(onChangeLogin((e.target as HTMLInputElement).value))}
              />
              {errors.login && renderValidationMessage(errors.login?.message)}
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
              {userError && renderUserSignInError(userError)}
            </div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnModalSubmit}
              fullWidth
            >
              Sign In
            </Button>
            <Typography>
              Do you have an account?&nbsp;
              <Link to={config.urls.public.signUp}>Sign Up</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
}

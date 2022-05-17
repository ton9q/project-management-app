import { useEffect, useState, useCallback, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Box, Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { loginUser } from '../../services/SignInUpService';
import { config } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loading } from '../../components/Loading';
import { onChangeLogin, onChangePassword, clearCurrentUser } from './Reducer/FormSignInSlice';
import '../../App.css';

interface IUserInfo {
  login: string;
  token: string;
}

export function SignIn() {
  const { t } = useTranslation(['common', 'pages_registration']);
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
      <span className={'form-span-not-invalid'}>{message || 'this field is required'}</span>
    ),
    []
  );

  const renderUserSignInError = useCallback(
    (userError: string) => <span className={'form-span-not-invalid'}>{userError}</span>,
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

  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Box
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
      >
        <Grid className="login-modal">
          <Paper elevation={24} className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="form-title">{t('common:navbar.sign_in')}</h2>
              <div className="form-container-input-message">
                <TextField
                  {...register('login', {
                    required: true,
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: t('pages_registration:messages.only_letters'),
                    },
                    minLength: { value: 3, message: t('pages_registration:messages.min_length3') },
                  })}
                  style={inputModal}
                  name="login"
                  value={login}
                  label={t('pages_registration:user.login')}
                  placeholder={t('pages_registration:placeholder.login')}
                  fullWidth
                  onChange={(e) => dispatch(onChangeLogin((e.target as HTMLInputElement).value))}
                />
                {errors.login && renderValidationMessage(errors.login?.message)}
              </div>
              <div className="form-container-input-message">
                <TextField
                  {...register('password', {
                    required: true,
                    pattern: {
                      value: /^[0-9]+$/g,
                      message: t('pages_registration:messages.only_numbers'),
                    },
                    minLength: { value: 3, message: t('pages_registration:messages.min_length3') },
                  })}
                  style={inputModal}
                  name="password"
                  value={password}
                  label={t('pages_registration:user.password')}
                  placeholder={t('pages_registration:placeholder.password')}
                  type="password"
                  fullWidth
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
                {t('common:navbar.sign_in')}
              </Button>
              <Typography>
                {t('pages_registration:account')}
                <Link to={config.urls.public.signUp}>{t('common:navbar.sign_up')}</Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Box>
    </Suspense>
  );
}

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { loginUser } from '../../services/api';
import { config } from '../../config';
import { LocalStorage } from '../../utils/localStorage';
import { useAppDispatch, useAppSelector } from '../../appStore';
import { Loading } from '../../components/Loading';
import { onChangeLogin, onChangePassword, clearCurrentUser } from './formSignInReducer';

const USER_INFO = 'userInfo';

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

  const onLogin = useCallback(
    () =>
      loginUser({ login: login, password: password })
        .then((response) => {
          LocalStorage.setItem(USER_INFO, { login: login, token: response.data.token });
          setIsLogin(false);
          dispatch(clearCurrentUser());
          reset();
          setUserError('');
          navigate('/main');
        })
        .catch((error: AxiosError) => {
          setIsLogin(false);
          setUserError((error.response?.data as { statusCode: number; message: string }).message);
        }),
    [dispatch, login, password, navigate, reset]
  );

  useEffect(() => {
    if (isLogin) {
      onLogin();
    }
  }, [isLogin, onLogin]);

  const onSubmit = () => {
    setIsLogin(true);
  };

  const renderValidationMessage = useCallback(
    (message: string | undefined) => (
      <span
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          top: '60px',
          color: '#fd3939',
          fontSize: '14px',
        }}
      >
        {message || 'this field is required'}
      </span>
    ),
    []
  );

  const renderUserSignInError = useCallback(
    (userError: string) => (
      <span
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          top: '60px',
          color: '#fd3939',
          fontSize: '14px',
        }}
      >
        {userError}
      </span>
    ),
    []
  );

  const btnModalSubmit = { marginBottom: '12px', height: '40px' };
  const inputModal = { marginBottom: '30px' };

  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Box
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
      >
        <Grid className="login-modal">
          <Paper
            elevation={24}
            sx={{ padding: '20px', height: '400px', width: '350px', margin: '20px' }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 style={{ textAlign: 'center' }}>{t('common:navbar.sign_in')}</h2>
              <Box sx={{ position: 'relative' }}>
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
              </Box>
              <Box sx={{ position: 'relative' }}>
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
              </Box>
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

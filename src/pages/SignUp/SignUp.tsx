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
import { createUser } from '../../services/api';
import { config } from '../../config';
import { useAppDispatch, useAppSelector } from '../../appStore';
import { Loading } from '../../components/Loading';
import {
  onChangeName,
  onChangeLogin,
  onChangePassword,
  clearCurrentUser,
} from './formSignUpReducer';

export function SignUp() {
  const { t } = useTranslation(['common', 'pages_registration', 'form_message']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, login, password } = useAppSelector((state) => state.formSignUpReducer.currentUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name,
      login: login,
      password: password,
    },
  });

  const [isCreating, setIsCreating] = useState(false);
  const [userError, setUserError] = useState<string | undefined>('');

  const onCreating = useCallback(
    () =>
      createUser({
        name: name,
        login: login,
        password: password,
      })
        .then(() => {
          setIsCreating(false);
          dispatch(clearCurrentUser());
          reset();
          setUserError('');
          navigate('/sign-in');
        })
        .catch((error: AxiosError) => {
          setIsCreating(false);
          setUserError((error.response?.data as { statusCode: number; message: string }).message);
        }),
    [dispatch, name, login, password, navigate, reset]
  );

  useEffect(() => {
    if (isCreating) {
      onCreating();
    }
  }, [isCreating, onCreating]);

  const onSubmit = () => {
    setIsCreating(true);
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

  const renderUserCreatingError = useCallback(
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
              <h2 style={{ textAlign: 'center' }}>{t('common:navbar.sign_up')}</h2>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  {...register('name', {
                    required: true,
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: t('form_message:message.only_letters'),
                    },
                    minLength: {
                      value: 2,
                      message: t('form_message:message.min_length', { num: 2 }),
                    },
                  })}
                  style={inputModal}
                  name="name"
                  value={name}
                  label={t('pages_registration:user.name')}
                  placeholder={t('pages_registration:placeholder.name')}
                  fullWidth
                  onChange={(e) => dispatch(onChangeName((e.target as HTMLInputElement).value))}
                />
                {errors.name && renderValidationMessage(errors.name?.message)}
              </Box>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  {...register('login', {
                    required: true,
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: t('form_message:message.only_letters'),
                    },
                    minLength: {
                      value: 3,
                      message: t('form_message:message.min_length', { num: 3 }),
                    },
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
                      message: t('form_message:message.only_numbers'),
                    },
                    minLength: {
                      value: 3,
                      message: t('form_message:message.min_length', { num: 3 }),
                    },
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
                {userError && renderUserCreatingError(userError)}
              </Box>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnModalSubmit}
                fullWidth
              >
                {t('common:navbar.sign_up')}
              </Button>
              <Typography>
                {t('pages_registration:account')}
                <Link to={config.urls.public.signIn}>{t('common:navbar.sign_in')}</Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Box>
    </Suspense>
  );
}

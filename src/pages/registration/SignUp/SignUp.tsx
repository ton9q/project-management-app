import { Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AxiosError, AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createUser } from '../../../services/api';
import { config } from '../../../config';
import { useAppDispatch, useAppSelector } from '../../../store';
import { Loading } from '../../../components/Loading';
import {
  onChangeName,
  onChangeLogin,
  onChangePassword,
  clearCurrentUser,
} from './formSignUpReducer';
import { startCreating, creatingError, creatingSuccess } from '../../../services/apiReducer';
import { MessageError, StyledTitle } from '../SignUpInStyle';

export function SignUp() {
  const { t } = useTranslation(['common', 'pages_registration', 'form_message']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, login, password } = useAppSelector((state) => state.formSignUpReducer);
  const { isCreating, errorCreating } = useAppSelector((state) => state.apiReducer);
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

  const onCreating = () => {
    dispatch(startCreating());
    createUser({
      name: name,
      login: login,
      password: password,
    })
      .then((response: AxiosResponse) => {
        dispatch(creatingSuccess(response.data));
        dispatch(clearCurrentUser());
        reset();
        navigate(config.urls.public.signIn);
      })
      .catch((error: AxiosError) => {
        dispatch(
          creatingError((error.response?.data as { statusCode: number; message: string }).message)
        );
      });
  };

  const btnModalSubmit = { marginBottom: '12px', height: '40px' };
  const inputModal = { marginBottom: '30px' };

  return (
    <Suspense fallback={<Loading fullScreen />}>
      {!isCreating ? (
        <Box
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
        >
          <Grid className="login-modal">
            <Paper
              elevation={24}
              sx={{ padding: '20px', height: '400px', width: '350px', margin: '20px' }}
            >
              <form onSubmit={handleSubmit(onCreating)}>
                <StyledTitle>{t('common:navbar.sign_up')}</StyledTitle>
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
                  {errors.name && (
                    <MessageError>{errors.name?.message || 'this field is required'}</MessageError>
                  )}
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
                  {errors.login && (
                    <MessageError>{errors.login?.message || 'this field is required'}</MessageError>
                  )}
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
                    onChange={(e) =>
                      dispatch(onChangePassword((e.target as HTMLInputElement).value))
                    }
                  />
                  {errors.password && (
                    <MessageError>
                      {errors.password?.message || 'this field is required'}
                    </MessageError>
                  )}
                  {errorCreating && <MessageError>{errorCreating}</MessageError>}
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
      ) : (
        <Loading fullScreen />
      )}
    </Suspense>
  );
}

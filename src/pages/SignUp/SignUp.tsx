import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Box, Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { createUser } from '../../services/SignInUpService';
import { config } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Spinner from '../../components/Spinner/Spinner';
import {
  onChangeName,
  onChangeLogin,
  onChangePassword,
  clearCurrentUser,
} from './Reducer/FormSignUpSlice';
import '../../App.css';

export function SignUp() {
  const { t } = useTranslation(['common', 'page_registration']);
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
      <span className={'form-span-not-invalid'}>{message || 'this field is required'}</span>
    ),
    []
  );

  const renderUserCreatingError = useCallback(
    (userError: string) => <span className={'form-span-not-invalid'}>{userError}</span>,
    []
  );

  const onCreating = () => {
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
      });
  };

  const btnModalSubmit = { marginBottom: '12px', height: '40px' };
  const inputModal = { marginBottom: '30px' };

  return isCreating ? (
    <Spinner />
  ) : (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <Grid className="login-modal">
        <Paper elevation={24} className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-title">{t('common:navbar.sign_up')}</h2>
            <div className="form-container-input-message">
              <TextField
                {...register('name', {
                  required: true,
                  pattern: { value: /^[A-Za-z]+$/i, message: 'only letters of the Latin alphabet' },
                  minLength: { value: 2, message: 'min length 2 letters' },
                })}
                style={inputModal}
                name="name"
                value={name}
                label={t('page_registration:user.name')}
                placeholder={t('page_registration:placeholder.name')}
                fullWidth
                onChange={(e) => dispatch(onChangeName((e.target as HTMLInputElement).value))}
              />
              {errors.name && renderValidationMessage(errors.name?.message)}
            </div>
            <div className="form-container-input-message">
              <TextField
                {...register('login', {
                  required: true,
                  pattern: { value: /^[A-Za-z]+$/i, message: 'only letters of the Latin alphabet' },
                  minLength: { value: 3, message: 'min length 3 letters' },
                })}
                style={inputModal}
                name="login"
                value={login}
                label={t('page_registration:user.login')}
                placeholder={t('page_registration:placeholder.login')}
                fullWidth
                onChange={(e) => dispatch(onChangeLogin((e.target as HTMLInputElement).value))}
              />
              {errors.login && renderValidationMessage(errors.login?.message)}
            </div>
            <div className="form-container-input-message">
              <TextField
                {...register('password', {
                  required: true,
                  pattern: { value: /^[0-9]+$/g, message: 'only numbers' },
                  minLength: { value: 3, message: 'min length 3 numbers' },
                })}
                style={inputModal}
                name="password"
                value={password}
                label={t('page_registration:user.password')}
                placeholder={t('page_registration:placeholder.password')}
                type="password"
                fullWidth
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
              {t('common:navbar.sign_up')}
            </Button>
            <Typography>
              Do you have an account?&nbsp;
              <Link to={config.urls.public.signIn}>{t('common:navbar.sign_in')}</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
}
